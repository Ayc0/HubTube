import express from 'express';
import http from 'http';
import sockerIo from 'socket.io';

const app = express();
const server = http.createServer(app);

/* Configuration */
app.use(express.static(`${__dirname}/build`));
app.get('*', (req, res) => {
  res.sendFile('build/index.html');
});

app.set('port', 8000);

if (process.env.NODE_ENV === 'development') {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

const activeDownloadTab = {};

/* Socket.io Communication */
const io = sockerIo.listen(server);
io.sockets.on('connection', (socket) => {
  console.log(`${socket.id} s'est connecté.`);

  socket.emit('connexion', { id: socket.id, message: 'Vous êtes connectés !' });

  // Quand le serveur reçoit un signal de type "message" du client
  socket.on('askForDownload', (message) => {
    socket.join(message.room);
    socket.in(message.room).broadcast.emit('askForDownload', message);
  });

  socket.on('replyForDownload', (message) => {
    console.log(`${message.id} est sur la tab dans la room ${message.room}`);
    if (message.onDownload) {
      activeDownloadTab[message.room] = message.id;
    }
    io.to(message.to).emit('replyForDownload', message);
  });

  socket.on('handleDownloadState', (message) => {
    console.log(`${message.id} a ${message.canChangeTab ? 'libéré' : 'pris'} la tab dans la room ${message.room}`);
    if (!message.canChangeTab) {
      activeDownloadTab[message.room] = message.id;
    } else {
      activeDownloadTab[message.room] = null;
    }
    socket.in(message.room).broadcast.emit('handleDownloadState', message);
  });

  socket.on('sendVideo', (message) => {
    console.log(`La vidéo ${message.video.id.videoId} a été envoyée dans la room ${message.room}`);
    io.to(activeDownloadTab[message.room]).emit('sendVideo', message);
  });

  socket.on('receiveVideo', (message) => {
    console.log(`La vidéo a été reçue dans la room ${message.room}`);
    io.to(message.id).emit('receiveVideo', message);
  });

  socket.on('addVideoToPlaylist', (message) => {
    console.log(`La vidéo ${message.video.id.videoId} a été ajoutée à la playlist dans la room ${message.room}`);
    io.to(activeDownloadTab[message.room]).emit('addVideoToPlaylist', message);
  });

  socket.on('receiveVideoForPlaylist', (message) => {
    console.log(`La vidéo a été ajoutée à la playlist dans la room ${message.room}`);
    io.to(message.id).emit('receiveVideoForPlaylist', message);
  });
});

/* Start server */
server.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

export default app;

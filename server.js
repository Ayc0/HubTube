import express from 'express';
import http from 'http';
import sockerIo from 'socket.io';

// var socket = require('./routes/socket.js');

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

let activeDownloadTab = 0;

/* Socket.io Communication */
const io = sockerIo.listen(server);
io.sockets.on('connection', (socket) => {
  console.log(`${socket.id} s'est connecté.`);

  socket.emit('connexion', { id: socket.id, message: 'Vous êtes connectés !' });

  // Quand le serveur reçoit un signal de type "message" du client
  socket.on('sendId', (message) => {
    console.log(`Bouton appuyé : ${message.id}`);
    socket.broadcast.emit('updateId', { id: message.id });
  });

  socket.on('askForDownload', (message) => {
    socket.broadcast.emit('askForDownload', message);
  });

  socket.on('replyForDownload', (message) => {
    console.log(`${message.id} est sur la tab`);
    if (message.onDownload) {
      activeDownloadTab = message.id;
    }
    io.to(message.to).emit('replyForDownload', message);
  });

  socket.on('handleDownloadState', (message) => {
    console.log(`${message.id} a ${message.canChangeTab ? 'libéré' : 'pris'} la tab`);
    if (!message.canChangeTab) {
      activeDownloadTab = message.id;
    } else {
      activeDownloadTab = -1;
    }
    socket.broadcast.emit('handleDownloadState', message);
  });

  socket.on('sendVideo', (message) => {
    console.log(`La vidéo ${message.video.id.videoId} a été envoyée`);
    io.to(activeDownloadTab).emit('sendVideo', message);
  });

  socket.on('receiveVideo', (message) => {
    console.log('La vidéo a été reçue');
    io.to(message.id).emit('receiveVideo', message);
  });
});

/* Start server */
server.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

export default app;

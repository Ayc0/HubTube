import express from 'express';
import http from 'http';
import sockerIo from 'socket.io';

// var socket = require('./routes/socket.js');

const app = express();
const server = http.createServer(app);

/* Configuration */
app.use(express.static(`${__dirname}/build`));
app.set('port', 8000);

if (process.env.NODE_ENV === 'development') {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

/* Socket.io Communication */
const io = sockerIo.listen(server);
io.sockets.on('connection', (socket) => {
  socket.emit('message', 'Vous êtes bien connecté !');

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
    socket.broadcast.emit('replyForDownload', message);
  });

  socket.on('handleDownloadState', (message) => {
    console.log(`${message.id} a ${message.canChangeTab ? 'libéré' : 'pris'} la tab`);
    socket.broadcast.emit('handleDownloadState', message);
  });

  socket.on('sendVideoId', (message) => {
    console.log(`La vidéo ${message.videoId} a été envoyée`);
    io.sockets.emit('sendVideoId', message);
  });
});

/* Start server */
server.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

export default app;

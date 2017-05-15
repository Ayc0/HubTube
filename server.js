import express from 'express';
import http from 'http';
import sockerIo from 'socket.io';

const app = express();
const server = http.createServer(app);

/* Configuration */

app.use(express.static(`${__dirname}/build`));
// app.get('/browserconfig.xml', (_, res) => {
//   res.sendFile(`${__dirname}/build/browserconfig.xml`);
// });
app.use((req, res) => {
  res.sendFile(`${__dirname}/build/index.html`);
});

app.set('port', 8000);

if (process.env.NODE_ENV === 'development') {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

const activeDownloadTab = {};

/* Socket.io Communication */
const io = sockerIo.listen(server);
io.sockets.on('connection', socket => {
  console.log(`${socket.id} s'est connecté.`);

  // Envoie un message de bienvenue et donne l'id aux clients
  socket.emit('connexion', { id: socket.id, message: 'Vous êtes connectés !' });

  socket.on('initializeOnTab', message => {
    socket.join(message.room);
    if (typeof activeDownloadTab[message.room] === 'undefined') {
      console.log(`${message.id} a pris l'onglet dans la room ${message.room}`);
      activeDownloadTab[message.room] = message.id;
      socket.in(message.room).broadcast.emit('handleDownloadState', message);
    } else {
      socket.emit('forceExitTab', {
        id: message.id,
        room: message.room,
        mustChangeTab: true,
      });
    }
  });

  // Demande aux autres de la room si quelqu'un est sur l'onglet
  socket.on('askForDownload', message => {
    socket.join(message.room);
    if (typeof activeDownloadTab[message.room] !== 'undefined') {
      console.log(
        `${message.id} est sur l'onglet dans la room ${message.room}`
      );
      socket.emit('replyForDownload', {
        canChangeTab: false,
        room: message.room,
      });
    }
  });

  socket.on('handleDownloadState', message => {
    if (message.canChangeTab) {
      if (message.id === activeDownloadTab[message.room]) {
        console.log(
          `${message.id} a libéré l'onglet dans la room ${message.room}`
        );
        delete activeDownloadTab[message.room];
        socket.in(message.room).broadcast.emit('handleDownloadState', message);
      }
    } else if (typeof activeDownloadTab[message.room] === 'undefined') {
      console.log(`${message.id} a pris l'onglet dans la room ${message.room}`);
      activeDownloadTab[message.room] = message.id;
      socket.in(message.room).broadcast.emit('handleDownloadState', message);
    }
  });

  socket.on('sendVideo', message => {
    console.log(
      `La vidéo ${message.video.id.videoId} a été envoyée dans la room ${message.room}`
    );
    io.to(activeDownloadTab[message.room]).emit('sendVideo', message);
  });

  socket.on('receiveVideo', message => {
    console.log(`La vidéo a été reçue dans la room ${message.room}`);
    io.to(message.to).emit('receiveVideo', message);
  });

  socket.on('addVideoToPlaylist', message => {
    console.log(
      `La vidéo ${message.video.id.videoId} a été ajoutée à la playlist dans la room ${message.room}`
    );
    io.to(activeDownloadTab[message.room]).emit('addVideoToPlaylist', message);
  });

  socket.on('receiveVideoForPlaylist', message => {
    console.log(
      `La vidéo a été ajoutée à la playlist dans la room ${message.room}`
    );
    io.to(message.to).emit('receiveVideoForPlaylist', message);
  });

  socket.on('videoData', message => {
    socket.in(message.room).broadcast.emit('videoData', message);
  });

  socket.on('togglePlayPause', message => {
    io.to(activeDownloadTab[message.room]).emit('togglePlayPause', message);
  });

  socket.on('sendNext', message => {
    io.to(activeDownloadTab[message.room]).emit('sendNext', message);
  });

  socket.on('toggleMute', message => {
    io.to(activeDownloadTab[message.room]).emit('toggleMute', message);
  });

  socket.on('sendVolume', message => {
    io.to(activeDownloadTab[message.room]).emit('sendVolume', message);
  });

  socket.on('sendTime', message => {
    console.log(message);
    io.to(activeDownloadTab[message.room]).emit('sendTime', message);
  });

  socket.on('disconnect', () => {
    Object.keys(activeDownloadTab).forEach(room => {
      if (activeDownloadTab[room] === socket.id) {
        console.log(`${socket.id} s'est déconnecté dans la room ${room}`);
        delete activeDownloadTab[room];
        socket.in(room).broadcast.emit('handleDownloadState', {
          id: socket.id,
          canChangeTab: true,
          room,
        });
      }
    });
  });
});

/* Start server */
server.listen(app.get('port'), () => {
  console.log(
    'Express server listening on port %d in %s mode',
    app.get('port'),
    app.get('env')
  );
});

export default app;

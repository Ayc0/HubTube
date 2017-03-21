import React from 'react';
import YouTube from 'react-youtube';
import { Card, CardMedia, CardHeader } from 'material-ui/Card';

const opts = {
  width: '100%',
  playerVars: { // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const YoutubePlayer = props => (
  <Card style={{ width: '100%', maxWidth: '640px' }}>
    <CardMedia>
      <YouTube
        videoId={props.videoId}
        opts={opts}
        onEnd={props.onEnd}
        onPlay={props.onReady}
      />
    </CardMedia>
    <CardHeader
      title={props.title}
      subtitle={props.subtitle}
      avatar={props.avatar}
    />
  </Card>
);

export default YoutubePlayer;

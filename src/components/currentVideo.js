import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';

import YoutubePlayer from './youtubePlayer';

class CurrentVideo extends Component {
  constructor(props) {
    super(props);

    this.state = { video: {} };
    this.receiveVideo = this.receiveVideo.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('sendVideo', this.receiveVideo);
  }

  receiveVideo(message) {
    this.setState({ video: message.video });
    this.props.socket.emit('receiveVideo', { id: message.id, received: true });
  }

  render() {
    if (typeof this.state.video.etag === 'undefined') {
      return <div />;
    }
    return (
      <YoutubePlayer
        videoId={this.state.video.id.videoId}
        title={this.state.video.snippet.title}
        subtitle={this.state.video.snippet.channelTitle}
        avatar={this.state.video.snippet.thumbnails.high.url}
      />
    );
  }
}

export default socketConnect(CurrentVideo);

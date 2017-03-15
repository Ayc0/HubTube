import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';

import YoutubePlayer from '../components/youtubePlayer';

class CurrentVideo extends Component {
  constructor(props) {
    super(props);

    this.state = { video: {}, videoQueue: [] };
    this.receiveVideo = this.receiveVideo.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.addToPlaylist = this.addToPlaylist.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('sendVideo', this.receiveVideo);
    this.props.socket.on('addVideoToPlaylist', this.addToPlaylist);
  }

  receiveVideo(message) {
    this.setState({ video: message.video });
    this.props.socket.emit('receiveVideo', {
      id: message.id,
      received: true,
      room: document.location.pathname,
    });
    this.props.updateRelated(message.video.id.videoId);
  }

  addToPlaylist(message) {
    this.setState({ videoQueue: [...this.state.videoQueue, message.video] });
    this.props.socket.emit('receiveVideoForPlaylist', {
      id: message.id,
      received: true,
      room: document.location.pathname,
    });
  }

  onEnd() {
    let nextVideo = this.state.videoQueue[0];
    if (typeof nextVideo === 'undefined') {
      nextVideo = this.props.relatedVideosList[0];
    } else {
      this.setState({ videoQueue: this.state.videoQueue.slice(1) });
    }
    this.setState({ video: nextVideo });
    this.props.updateRelated(nextVideo.id.videoId);
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
        onEnd={this.onEnd}
      />
    );
  }
}

export default socketConnect(CurrentVideo);

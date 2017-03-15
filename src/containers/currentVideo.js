import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';

import YoutubePlayer from '../components/youtubePlayer';

class CurrentVideo extends Component {
  constructor(props) {
    super(props);

    this.state = { video: {}, videoQueue: [], target: {}, targetId: 0 };
    this.receiveVideo = this.receiveVideo.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onReady = this.onReady.bind(this);
    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.video !== nextState.video) {
      this.forceUpdate();
    }
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

  onReady(event) {
    const target = event.target;
    if (this.state.video.id.videoId !== this.state.targetId) {
      this.setState({ target, targetId: this.state.video.id.videoId });
      clearInterval(this.interval);
      this.interval = setInterval(this.getData, 2000);
    }
  }

  getData() {
    const duration = this.state.target.getDuration();
    const time = this.state.target.getCurrentTime() / duration;
    const volume = this.state.target.getVolume() / 100;
    const isMuted = this.state.target.isMuted();
    this.props.socket.emit('videoData', {
      id: this.props.socket.id,
      duration,
      time,
      volume,
      isMuted,
      room: document.location.pathname,
    });
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
        onReady={this.onReady}
      />
    );
  }
}

export default socketConnect(CurrentVideo);

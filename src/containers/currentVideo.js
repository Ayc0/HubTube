import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';
import { styled } from 'styletron-react';

import YoutubePlayer from '../components/youtubePlayer';
import PanelListVideos from '../components/panelListVideos';

const VideoContainer = styled('div', () => ({
  '@media (min-width: 480px)': {
    flexDirection: 'row',
  },
  '@media (max-width: 480px)': {
    flexDirection: 'column',
  },
  display: 'flex',
  alignItems: 'stretch',
  marginTop: '1em',
}));

class CurrentVideo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      video: {},
      videoQueue: [],
      target: {},
      targetId: 0,
    };
    this.receiveVideo = this.receiveVideo.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onReady = this.onReady.bind(this);
    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.getData = this.getData.bind(this);
    this.togglePlayPause = this.togglePlayPause.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.setTime = this.setTime.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('sendVideo', this.receiveVideo);
    this.props.socket.on('addVideoToPlaylist', this.addToPlaylist);
    this.props.socket.on('togglePlayPause', this.togglePlayPause);
    this.props.socket.on('sendNext', this.onEnd);
    this.props.socket.on('toggleMute', this.toggleMute);
    this.props.socket.on('sendVolume', this.setVolume);
    this.props.socket.on('sendTime', this.setTime);
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
    this.setState(prevState => ({
      videoQueue: [...prevState.videoQueue, message.video],
    }));
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
      this.setState(prevState => ({
        videoQueue: prevState.videoQueue.slice(1),
      }));
    }
    this.setState({ video: nextVideo });
    this.props.updateRelated(nextVideo.id.videoId);
  }

  onReady(event) {
    const target = event.target;
    if (this.state.video.id.videoId !== this.state.targetId) {
      this.setState(prevState => ({
        target,
        targetId: prevState.video.id.videoId,
      }));
      clearInterval(this.interval);
      this.interval = setInterval(this.getData, 500);
    }
  }

  getData() {
    const duration = this.state.target.getDuration();
    const time = this.state.target.getCurrentTime() / duration;
    const volume = this.state.target.getVolume() / 100;
    const isMuted = this.state.target.isMuted();
    const play = this.state.target.getPlayerState() === 1;
    this.props.socket.emit('videoData', {
      id: this.props.socket.id,
      duration,
      time,
      volume,
      isMuted,
      play,
      title: this.state.video.snippet.title,
      room: document.location.pathname,
    });
  }

  togglePlayPause(message) {
    if (message.play) {
      this.state.target.playVideo();
    } else {
      this.state.target.pauseVideo();
    }
  }

  toggleMute(message) {
    if (message.mute) {
      this.state.target.mute();
    } else {
      this.state.target.unMute();
    }
  }

  setVolume(message) {
    this.state.target.setVolume(message.volume * 100);
  }

  setTime(message) {
    this.state.target.seekTo(message.time);
  }

  render() {
    if (typeof this.state.video.etag === 'undefined') {
      return <div />;
    }
    return (
      <VideoContainer>
        <YoutubePlayer
          videoId={this.state.video.id.videoId}
          title={this.state.video.snippet.title}
          subtitle={this.state.video.snippet.channelTitle}
          avatar={this.state.video.snippet.thumbnails.high.url}
          onEnd={this.onEnd}
          onReady={this.onReady}
        />
        <PanelListVideos
          queueList={this.state.videoQueue}
          relatedList={this.props.relatedVideosList}
        />
      </VideoContainer>
    );
  }
}

export default socketConnect(CurrentVideo);

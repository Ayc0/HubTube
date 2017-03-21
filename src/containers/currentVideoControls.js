import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Slider from 'material-ui/Slider';
import Play from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import Next from 'material-ui/svg-icons/av/skip-next';
import Volume from 'material-ui/svg-icons/av/volume-up';
import Mute from 'material-ui/svg-icons/av/volume-off';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { socketConnect } from 'socket.io-react';
import { styled } from 'styletron-react';

const VolumeBar = styled('div', () => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: 48,
  marginRight: '0.75em',
}));

class CurrentVideoControls extends Component {
  constructor(props) {
    super(props);

    this.color = '#e8e8e8';
    this.backgroundColor = 'rgba(0, 0, 0, 0.870588)';

    this.state = {
      onAir: false,
      volume: 1,
      time: 0,
      mute: false,
      duration: 0,
      play: false,
      title: '',
    };

    this.sendNext = this.sendNext.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.getVideoData = this.getVideoData.bind(this);
    this.togglePlayPause = this.togglePlayPause.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.handleChangeVolume = this.handleChangeVolume.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('videoData', this.getVideoData);
    // sendTime : playVideoAt(timeCode)
  }

  togglePlayPause() {
    const play = !this.state.play;
    this.setState({ play });
    this.props.socket.emit('togglePlayPause', {
      id: this.props.socket.id,
      play,
      room: document.location.pathname,
    });
  }

  sendNext() {
    this.props.socket.emit('sendNext', {
      id: this.props.socket.id,
      room: document.location.pathname,
    });
  }

  toggleMute() {
    const mute = !this.state.mute;
    this.setState({ mute });
    this.props.socket.emit('toggleMute', {
      id: this.props.socket.id,
      mute,
      room: document.location.pathname,
    });
  }

  getVideoData(message) {
    if (message.room === document.location.pathname) {
      this.setState({
        duration: message.duration,
        time: message.time,
        volume: message.volume,
        isMuted: message.isMuted,
        play: message.play,
        title: message.title,
      });
    }
  }

  handleChangeVolume(e, volume) {
    this.setState({ volume });
    this.props.socket.emit('sendVolume', {
      id: this.props.socket.id,
      volume,
      room: document.location.pathname,
    });
  }

  handleChangeTime(e, time) {
    this.setState({ time });
    const realTime = time * this.state.duration;
    this.props.socket.emit('sendTime', {
      id: this.props.socket.id,
      time: realTime,
      room: document.location.pathname,
    });
  }

  render() {
    return (
      <div>
        <Toolbar style={{ backgroundColor: this.backgroundColor }}>
          <ToolbarGroup style={{ width: '100%' }}>
            <IconButton touch={true} onTouchTap={this.togglePlayPause}>
             { this.state.play ? <Pause color={this.color} /> : <Play color={this.color} /> }
            </IconButton>
            <IconButton touch={true} onTouchTap={this.sendNext}>
              <Next color={this.color} />
            </IconButton>
            <VolumeBar>
              <IconButton touch={true} onTouchTap={this.toggleMute}>
                {this.state.mute ? <Mute color={this.color} /> : <Volume color={this.color} />}
              </IconButton>
              <Slider
                value={this.state.volume}
                style={{ width: 64, height: 64 }}
                onChange={this.handleChangeVolume}
              />
            </VolumeBar>
            <ToolbarTitle text={this.state.title} style={{
              color: this.color,
              marginLeft: '1em',
              overflowX: 'hidden',
              flexGrow: 1,
              width: 'calc(100% - 208px)',
            }}/>
          </ToolbarGroup>
        </Toolbar>
        <Slider
          style={{ marginTop: -34 }}
          value={this.state.time}
          step={0.001}
          onChange={this.handleChangeTime}
        />
      </div>
    );
  }
}


export default socketConnect(CurrentVideoControls);

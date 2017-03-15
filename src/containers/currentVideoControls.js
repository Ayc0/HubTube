import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Slider from 'material-ui/Slider';
import Clear from 'material-ui/svg-icons/content/clear';
import Done from 'material-ui/svg-icons/action/done';
import Play from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import Next from 'material-ui/svg-icons/av/skip-next';
import Volume from 'material-ui/svg-icons/av/volume-up';
import Mute from 'material-ui/svg-icons/av/volume-off';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { socketConnect } from 'socket.io-react';

class CurrentVideoControls extends Component {
  constructor(props) {
    super(props);

    this.color = '#e8e8e8';
    this.backgroundColor = 'rgba(0, 0, 0, 0.870588)';

    this.state = {
      onAir: false,
      volume: 1,
      time: 0,
      isMuted: false,
      duration: 0,
    };

    this.toggleOnAir = this.toggleOnAir.bind(this);
    this.getVideoData = this.getVideoData.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('handleDownloadState', this.toggleOnAir);
    this.props.socket.on('videoData', this.getVideoData);
    // sendPause
    // sendPlay
    // sendNext
    // sendVolume
    // getData
  }

  getVideoData(message) {
    if (message.room === document.location.pathname) {
      this.setState({
        duration: message.duration,
        time: message.time,
        volume: message.volume,
        isMuted: message.isMuted,
      });
    }
  }

  toggleOnAir(message) {
    if (message.room === document.location.pathname) {
      this.setState({ onAir: !message.canChangeTab });
    }
  }

  render() {
    return (
      <div>
        <Toolbar style={{ backgroundColor: this.backgroundColor }}>
          <ToolbarGroup>
            <IconButton touch={true}>
              <Play color={this.color} />
            </IconButton>
            <IconButton touch={true}>
              <Pause color={this.color} />
            </IconButton>
            <IconButton touch={true}>
              <Next color={this.color} />
            </IconButton>
            <div style= {{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 48, marginRight: '0.75em' }}>
              <IconButton touch={true}>
                {this.state.isMuted ? <Mute color={this.color} /> : <Volume color={this.color} />}
              </IconButton>
              <Slider value={this.state.volume} style={{
                width: 64,
                height: 64,
              }} />
            </div>
          </ToolbarGroup>
          <ToolbarGroup>
            { this.state.onAir ? <Done color={this.color} /> : <Clear color={this.color} /> }
          </ToolbarGroup>
        </Toolbar>
        <Slider style={{ marginTop: -34 }} value={this.state.time} />
      </div>
    );
  }
}


export default socketConnect(CurrentVideoControls);

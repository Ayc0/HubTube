import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';
import Send from 'material-ui/svg-icons/content/send';

import VideosList from './videosList';

class ResultVideosForSend extends Component {
  constructor(props) {
    super(props);

    this.sendVideo = this.sendVideo.bind(this);
  }

  sendVideo(video) {
    console.log(video);
    this.props.socket.emit('sendVideo', { video });
  }
  render() {
    return (
      <div style={{ padding: '1em' }}>
        <VideosList
          list={this.props.list}
          icon={<Send color="white" hoverColor="#d5d5d5"/>}
          send={this.sendVideo}
        />
      </div>
    );
  }
}

export default socketConnect(ResultVideosForSend);

import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';
import Send from 'material-ui/svg-icons/content/send';

import VideosList from './videosList';

class ResultVideosForSend extends Component {
  constructor(props) {
    super(props);

    this.sendVideoId = this.sendVideoId.bind(this);
  }

  sendVideoId(videoId) {
    this.props.socket.emit('sendVideoId', { videoId });
  }
  render() {
    return (
      <div style={{ padding: '1em' }}>
        <VideosList
          list={this.props.list}
          icon={<Send color="white" hoverColor="#d5d5d5"/>}
          send={this.sendVideoId}
        />
      </div>
    );
  }
}

export default socketConnect(ResultVideosForSend);

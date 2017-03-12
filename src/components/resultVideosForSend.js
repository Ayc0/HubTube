import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';
import Send from 'material-ui/svg-icons/content/send';

import VideosList from './videosList';
import ConfirmReceivedVideo from './confirmReceivedVideo';

class ResultVideosForSend extends Component {
  constructor(props) {
    super(props);

    this.sendVideo = this.sendVideo.bind(this);
    this.receiveVideo = this.receiveVideo.bind(this);

    this.state = { showPopup: false };
    this.closePopup = this.closePopup.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('receiveVideo', this.receiveVideo);
  }

  receiveVideo(message) {
    if (message.received) {
      this.setState({ showPopup: true });
    }
  }

  closePopup() {
    this.setState({ showPopup: false });
  }

  sendVideo(video) {
    this.props.socket.emit('sendVideo', { video, id: this.props.socket.id });
  }
  render() {
    return (
      <div style={{ padding: '1em' }}>
        <VideosList
          list={this.props.list}
          icon={<Send color="white" hoverColor="#d5d5d5"/>}
          send={this.sendVideo}
        />
        <ConfirmReceivedVideo showPopup={this.state.showPopup} closePopup={this.closePopup} />
      </div>
    );
  }
}

export default socketConnect(ResultVideosForSend);

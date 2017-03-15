import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';

import VideosList from '../components/videosList';
import Popup from '../components/popup';

class ResultVideosForSend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopupVideo: false,
      showPopupPlaylist: false,
    };
    this.closePopupVideo = this.closePopupVideo.bind(this);
    this.closePopupPlaylist = this.closePopupPlaylist.bind(this);
    this.sendVideo = this.sendVideo.bind(this);
    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.receiveVideo = this.receiveVideo.bind(this);
    this.receiveVideoForPlaylist = this.receiveVideoForPlaylist.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('receiveVideo', this.receiveVideo);
    this.props.socket.on('receiveVideoForPlaylist', this.receiveVideoForPlaylist);
  }

  receiveVideo(message) {
    if (message.received) {
      this.setState({ showPopupVideo: true });
      setTimeout(this.closePopupVideo, 1000);
    }
  }

  receiveVideoForPlaylist(message) {
    if (message.received) {
      this.setState({ showPopupPlaylist: true });
      setTimeout(this.closePopupPlaylist, 1000);
    }
  }

  closePopupVideo() {
    this.setState({ showPopupVideo: false });
  }

  closePopupPlaylist() {
    this.setState({ showPopupPlaylist: false });
  }

  sendVideo(video) {
    this.props.socket.emit('sendVideo', {
      video,
      id: this.props.socket.id,
      room: document.location.pathname,
    });
  }

  addToPlaylist(video) {
    this.props.socket.emit('addVideoToPlaylist', {
      video,
      id: this.props.socket.id,
      room: document.location.pathname,
    });
  }

  render() {
    return (
      <div style={{ padding: this.props.list.length === 0 ? 0 : '1em' }}>
        <VideosList
          list={this.props.list}
          send={this.sendVideo}
          addToPlaylist={this.addToPlaylist}
        />
        <Popup
          showPopup={this.state.showPopupVideo}
          closePopup={this.closePopupVideo}
          title={'Reception'}
          text={'La vidéo a été reçue'}
        />
        <Popup
          showPopup={this.state.showPopupPlaylist}
          closePopup={this.closePopupPlaylist}
          title={'Playlist'}
          text={'La vidéo a bien été ajoutée à la playlist'}
        />
      </div>
    );
  }
}

export default socketConnect(ResultVideosForSend);

import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Download from 'material-ui/svg-icons/file/file-download';
import Upload from 'material-ui/svg-icons/file/file-upload';
import { socketConnect } from 'socket.io-react';

class TabNav extends Component {
  constructor(props) {
    super(props);

    const id = Math.random().toString(36).substring(2, 25);
    this.state = {
      slideIndex: 0,
      id,
      canChangeTab: true,
    };
    this.askForDownload = this.askForDownload.bind(this);
    this.replyForDownload = this.replyForDownload.bind(this);
    this.handleDownloadState = this.handleDownloadState.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('askForDownload', this.askForDownload);
    this.props.socket.on('replyForDownload', this.replyForDownload);
    this.props.socket.on('handleDownloadState', this.handleDownloadState);
    this.props.socket.emit('askForDownload', { id: this.state.id });
  }

  handleChangeTab(value) {
    this.setState({ slideIndex: value });
  }
  askForDownload(message) {
    if (this.state.slideIndex === 1) {
      this.props.socket.emit('replyForDownload', { id: message.id, onDownload: true });
    }
  }
  replyForDownload(message) {
    if (message.onDownload && message.id === this.state.id) {
      this.setState({ canChangeTab: false });
    }
  }
  handleDownloadState(message) {
    this.setState({ canChangeTab: message.canChangeTab });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.slideIndex !== nextState.slideIndex
        && nextState.slideIndex === 1) {
      if (this.state.canChangeTab) {
        this.props.socket.emit('handleDownloadState', { id: this.state.id, canChangeTab: false });
      } else {
        nextState.slideIndex = 0;
      }
    }
    if (this.state.slideIndex !== nextState.slideIndex && nextState.slideIndex === 0) {
      this.props.socket.emit('handleDownloadState', { id: this.state.id, canChangeTab: true });
    }
    if (this.state.id !== nextState.id) {
      nextState.id = this.state.id;
    }
    return true;
  }

  render() {
    return (
      <div>
        <Tabs
          onChange={this.handleChangeTab}
          value={this.state.slideIndex}
        >
          <Tab icon={<Upload />} value={0} onClick={() => this.handleChangeTab(0)} />
          <Tab icon={<Download />} value={1} onClick={() => this.handleChangeTab(1)} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChangeTab}
        >
          {this.props.children}
        </SwipeableViews>
      </div>
    );
  }
}

export default socketConnect(TabNav);

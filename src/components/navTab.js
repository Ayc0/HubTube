import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Download from 'material-ui/svg-icons/file/file-download';
import Upload from 'material-ui/svg-icons/file/file-upload';
import { socketConnect } from 'socket.io-react';

class TabNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slideIndex: 0,
      id: -1,
      canChangeTab: true,
    };

    this.pathname = document.location.pathname;

    this.forceExitTab = this.forceExitTab.bind(this);
    this.askForDownload = this.askForDownload.bind(this);
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.replyForDownload = this.replyForDownload.bind(this);
    this.handleDownloadState = this.handleDownloadState.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('forceExitTab', this.forceExitTab);
    this.props.socket.on('askForDownload', this.askForDownload);
    this.props.socket.on('replyForDownload', this.replyForDownload);
    this.props.socket.on('handleDownloadState', this.handleDownloadState);
    this.props.socket.on('connexion', (msg) => {
      this.setState({ id: msg.id });
      if (this.state.slideIndex === 0) {
        this.props.socket.emit('askForDownload', { id: msg.id, room: this.pathname });
      } else {
        this.props.socket.emit('initializeOnTab', { id: msg.id, canChangeTab: false, room: this.pathname });
      }
    });
  }

  forceExitTab(message) {
    if (message.mustChangeTab) {
      this.setState({ slideIndex: 0, canChangeTab: false });
    }
  }
  handleChangeTab(value) {
    this.setState({ slideIndex: value });
  }
  askForDownload(message) {
    if (this.state.slideIndex === 1) {
      this.props.socket.emit('replyForDownload', {
        id: this.props.socket.id,
        onDownload: true,
        to: message.id,
        room: this.pathname,
      });
    }
  }
  replyForDownload(message) {
    if (message.onDownload && message.room === this.pathname) {
      this.setState({ canChangeTab: false });
    }
  }
  handleDownloadState(message) {
    this.setState({ canChangeTab: message.canChangeTab });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.slideIndex !== nextState.slideIndex && nextState.slideIndex === 1) {
      if (this.state.canChangeTab) {
        this.props.socket.emit('handleDownloadState', { id:
          this.props.socket.id,
          canChangeTab: false,
          room: this.pathname,
        });
      } else {
        nextState.slideIndex = 0;
      }
    }
    if (this.state.slideIndex !== nextState.slideIndex && nextState.slideIndex === 0) {
      this.props.socket.emit('handleDownloadState', {
        id: this.props.socket.id,
        canChangeTab: true,
        room: this.pathname,
      });
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
          <Tab icon={<Upload />} value={0} />
          <Tab icon={<Download />} value={1} />
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

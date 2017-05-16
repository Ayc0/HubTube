import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Send from 'material-ui/svg-icons/content/send';
import PlaylistAdd from 'material-ui/svg-icons/av/playlist-add';

import './videosListItem.css';

export default class VideosListItem extends Component {
  constructor(props) {
    super(props);

    this.state = { translate: '', duration: 0 };

    this.computeDistanceScroll = this.computeDistanceScroll.bind(this);
  }
  componentWillMount() {
    if (typeof this.props.send === 'undefined') {
      this.send = query => query;
    } else {
      this.send = this.props.send;
    }

    if (typeof this.props.addToPlaylist === 'undefined') {
      this.addToPlaylist = query => query;
    } else {
      this.addToPlaylist = this.props.addToPlaylist;
    }
  }

  componentDidMount() {
    this.computeDistanceScroll();
  }

  computeDistanceScroll() {
    const parent = findDOMNode(this.refs.parent);
    const child = findDOMNode(this.refs.child);
    if (parent.offsetWidth > child.offsetWidth) {
      this.setState({ translate: '0%' });
    } else {
      this.setState({
        translate: `-${child.offsetWidth - parent.offsetWidth}px`,
        duration: Math.floor(
          (child.offsetWidth - parent.offsetWidth) / child.offsetWidth * 15 + 2
        ),
      });
    }
  }

  render() {
    return (
      <GridTile
        title={
          <div
            style={{
              position: 'relative',
              height: '18px',
              width: '100%',
            }}
            ref="parent"
          >
            <p
              style={{
                position: 'absolute',
                transform: `translateX(${this.state.translate})`,
                animation: `scroll-left-tiles ${this.state.duration}s cubic-bezier(0.7, 0.01, 0.45, 1) infinite`,
                marginTop: 0,
                marginBottom: 0,
                // animationDelay: '2s',
                // height: '100%',
                top: 0,
              }}
              ref="child"
            >
              {this.props.video.snippet.title}
            </p>
          </div>
        }
        subtitle={this.props.video.snippet.channelTitle}
        actionIcon={
          <div style={{ display: 'flex' }}>
            <IconButton onTouchTap={() => this.addToPlaylist(this.props.video)}>
              <PlaylistAdd color="white" hoverColor="#d5d5d5" />
            </IconButton>
            <IconButton onTouchTap={() => this.send(this.props.video)}>
              <Send color="white" hoverColor="#d5d5d5" />
            </IconButton>
          </div>
        }
      >
        <img
          src={this.props.video.snippet.thumbnails.high.url}
          onTouchTap={() => this.send(this.props.video)}
          className="thumbnails"
          alt={this.props.video.snippet.title}
        />
      </GridTile>
    );
  }
}

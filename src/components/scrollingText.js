import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

export default class ScrollingText extends Component {
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

  componentWillReceiveProps(nextProps) {
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
      <div
        style={{
          position: 'relative',
          height: this.props.lineHeight,
          width: '100%',
        }}
        ref="parent"
      >
        <p
          style={{
            position: 'absolute',
            transform: `translateX(${this.state.translate})`,
            animation: `scroll-left-tiles ${this.state.duration}s cubic-bezier(0.7, 0.01, 0.45, 1) infinite`,
            top: 0,
            marginTop: this.props.top,
            fontSize: this.props.fontSize,
            fontWeight: this.props.bold ? 'bold' : 'normal',
          }}
          ref="child"
        >
          {this.props.text}
        </p>
      </div>
    );
  }
}

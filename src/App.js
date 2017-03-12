import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';

class App extends Component {
  constructor(props) {
    super(props);

    this.onPressBtn = this.onPressBtn.bind(this);
  }
  componentDidMount() {
    this.props.socket.on('updateId', this.updateId);
  }
  updateId(message) {
    console.log(message.id);
  }
  onPressBtn() {
    this.props.socket.emit('sendId', { id: Math.floor(Math.random() * 100) });
  }
  render() {
    console.log(this.state);
    return (
      <button onClick={this.onPressBtn}>
        Send
      </button>
    );
  }
}

export default socketConnect(App);

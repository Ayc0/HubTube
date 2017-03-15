import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';

export default class ConfirmReceivedVideo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.closePopup();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.showPopup !== nextProps.showPopup) {
      this.setState({ open: nextProps.showPopup });
    }
  }

  render() {
    return (
      <Dialog
        title={this.props.title}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        {this.props.text}
      </Dialog>
    );
  }
}

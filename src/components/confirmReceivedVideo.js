import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];
    return (
      <Dialog
        title="Succès"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        La vidéo a bien été reçue par un player
      </Dialog>
    );
  }
}

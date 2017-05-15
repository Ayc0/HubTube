import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Forward from 'material-ui/svg-icons/content/forward';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { room: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    document.location.pathname = this.state.room;
  }

  handleChange(room) {
    this.setState({ room });
  }

  render() {
    return (
      <Paper>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p
            style={{
              marginRight: '0.4em',
              marginLeft: '0.4em',
              color: '#cc181e',
            }}
          >
            hubtube.tk&nbsp;/
          </p>
          <form style={{ flexGrow: 1 }} onSubmit={this.handleSubmit}>
            <TextField
              fullWidth={true}
              underlineShow={false}
              hintText="Hint Text"
              onChange={(e, value) => {
                this.handleChange(value);
              }}
            />
          </form>
          <div
            style={{
              borderLeft: 'solid 1px #cc181e',
              height: '2.8rem',
              width: '1px',
            }}
          />
          <IconButton
            onTouchTap={() => {
              document.location.pathname = this.state.room;
            }}
          >
            <Forward color={'#cc181e'} />
          </IconButton>
        </div>
      </Paper>
    );
  }
}

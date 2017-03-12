import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Search from 'material-ui/svg-icons/action/search';

import './searchBar.css';

const iconStyle = {
  padding: '.6rem 1rem',
  marginBottom: 0,
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: 1.25,
  color: '#464a4c',
  textAlign: 'center',
  border: '1px solid rgba(0,0,0,.15)',
  borderRadius: '.25rem',
  borderLeft: 0,
  borderBottomLeftRadius: 0,
  borderTopLeftRadius: 0,
};

const inputStyle = {
  height: '20px',
  padding: '.75rem .75rem',
  fontSize: '1rem',
  lineHeight: '1.25',
  color: '#464a4c',
  backgroundColor: '#fff',
  backgroundImage: 'none',
  backgroundClip: 'padding-box',
  border: '1px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '.25rem',
  flex: '1 1 auto',
  width: '1%',
  marginBottom: 0,
  borderBottomRightRadius: 0,
  borderTopRightRadius: 0,
};

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { query: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  handleChange(newValue) {
    this.setState({ query: newValue });
  }

  onTextChange(query) {
    if (typeof this.props.onTextChange !== 'undefined') {
      this.props.onTextChange(query);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (typeof this.props.submit !== 'undefined') {
      this.props.submit(this.state.query);
    }
  }

  render() {
    let dataSource;
    if (typeof this.props.dataSource === 'undefined') {
      dataSource = [];
    } else {
      dataSource = this.props.dataSource;
    }
    return (
      <form style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onSubmit={this.handleSubmit}>
        <AutoComplete hintText="Search" underlineShow={false} style={inputStyle}
          onUpdateInput={(newValue) => {
            this.handleChange(newValue);
            this.onTextChange(newValue);
          }}
          dataSource={dataSource}
          value={this.state.query}
          fullWidth={true}
        />
        <Search className="validate_search" style={iconStyle}
          onClick={this.handleSubmit} />
      </form>
    );
  }
}

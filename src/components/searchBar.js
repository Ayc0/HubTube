import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Search from 'material-ui/svg-icons/action/search';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { query: '', value: 3 };
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
      <form onSubmit={this.handleSubmit}>
        <Toolbar>
          <ToolbarGroup style={{ width: '98%' }}>
            <AutoComplete hintText="Search" underlineShow={false}
              onUpdateInput={(newValue) => {
                this.handleChange(newValue);
                this.onTextChange(newValue);
              }}
              dataSource={dataSource}
              value={this.state.query}
              fullWidth={true}
            />
          </ToolbarGroup>
          <ToolbarGroup>
            <IconButton>
              <Search className="validate_search"
                onClick={this.handleSubmit} />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
      </form>
    );
  }
}

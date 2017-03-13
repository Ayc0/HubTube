import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

import { searchVideos, searchVideosSuggestions } from '../actions/youtubeAPI';

import SearchBar from '../components/searchBar';
import ResultVideosForSend from '../components/resultVideosForSend';

class Upload extends Component {
  render() {
    return (
      <div style={{ margin: '2em' }}>
        <Paper style={{ padding: '1rem' }}>
          <SearchBar submit={this.props.searchVideos}
            onTextChange={this.props.searchVideosSuggestions}
            dataSource={this.props.searchVideosSuggestionsList}
          />
          <ResultVideosForSend list={this.props.searchVideosList} />
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchVideosList: state.searchVideosList,
    searchVideosSuggestionsList: state.searchVideosSuggestionsList,
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchVideos, searchVideosSuggestions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Card } from 'material-ui/Card';

import { searchVideos, searchVideosSuggestions } from '../actions/youtubeAPI';

import SearchBar from '../components/searchBar';
import ResultVideosForSend from '../components/resultVideosForSend';

class Upload extends Component {
  render() {
    return (
      <div style={{ margin: '2em' }}>
        <Card style={{ padding: '1rem' }}>
          <SearchBar submit={this.props.searchVideos}
            onTextChange={console.log /* this.props.searchVideosSuggestions */}
          />
          <ResultVideosForSend list={this.props.searchVideosList} />
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchVideosList: state.searchVideosList,
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchVideos, searchVideosSuggestions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);

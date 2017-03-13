import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

import { searchVideos, searchVideosSuggestions, searchVideosRelatedToVideoId } from '../actions/youtubeAPI';

import SearchBar from '../components/searchBar';
import CurrentVideo from '../components/currentVideo';

class Download extends Component {
  render() {
    return (
      <div style={{ margin: '2em' }}>
        <Paper style={{ padding: '1rem' }}>
          <SearchBar submit={this.props.searchVideos}
            onTextChange={this.props.searchVideosSuggestions}
            dataSource={this.props.searchVideosSuggestionsList}
          />
          <CurrentVideo
            updateRelated={this.props.searchVideosRelatedToVideoId}
            relatedVideosList={this.props.searchVideosRelatedList}
          />
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchVideosList: state.searchVideosList,
    searchVideosSuggestionsList: state.searchVideosSuggestionsList,
    searchVideosRelatedList: state.searchVideosRelatedList,
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    searchVideos,
    searchVideosSuggestions,
    searchVideosRelatedToVideoId,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Download);

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { styled } from 'styletron-react';

import { searchVideos, searchVideosSuggestions } from '../actions/youtubeAPI';

import SearchBar from '../components/searchBar';
import ResultVideosForSend from './resultVideosForSend';
import CurrentVideoControls from './currentVideoControls';

const Container = styled(Paper, () => ({
  '@media (min-width: 480px)': {
    margin: '2em',
  },
  padding: '1rem',
}));

class Upload extends Component {
  render() {
    return (
      <Container>
        <SearchBar
          submit={this.props.searchVideos}
          onTextChange={this.props.searchVideosSuggestions}
          dataSource={this.props.searchVideosSuggestionsList}
        />
        <br />
        <CurrentVideoControls />
        <ResultVideosForSend list={this.props.searchVideosList} />
      </Container>
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
  return bindActionCreators(
    { searchVideos, searchVideosSuggestions },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);

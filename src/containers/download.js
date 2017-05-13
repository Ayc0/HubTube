import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { styled } from 'styletron-react';

import {
  searchVideos,
  searchVideosSuggestions,
  searchVideosRelatedToVideoId,
} from '../actions/youtubeAPI';

import SearchBar from '../components/searchBar';
import CurrentVideo from './currentVideo';
import ResultVideosForSend from './resultVideosForSend';

const Container = styled(Paper, () => ({
  '@media (min-width: 480px)': {
    margin: '2em',
  },
  padding: '1rem',
}));

// const CurrentVideoStyled = styled(CurrentVideo, () => ({
//   '@media (min-width: 480px)': {
//     maxWidth: '640px',
//     width: '70%',
//   },
//   '@media (max-width: 480px)': {
//     width: '100%',
//   },
// }));

// const VideoContainer = styled('div', () => ({
//   '@media (min-width: 480px)': {
//     flexDirection: 'row',
//   },
//   '@media (max-width: 480px)': {
//     flexDirection: 'column',
//   },
//   display: 'flex',
//   alignItems: 'stretch',
//   marginTop: '1em',
// }));

class Download extends Component {
  render() {
    return (
      <Container>
        <SearchBar
          submit={this.props.searchVideos}
          onTextChange={this.props.searchVideosSuggestions}
          dataSource={this.props.searchVideosSuggestionsList}
        />
        <div style={{ height: '3em' }} />
        <ResultVideosForSend list={this.props.searchVideosList} />
        <CurrentVideo
          updateRelated={this.props.searchVideosRelatedToVideoId}
          relatedVideosList={this.props.searchVideosRelatedList}
        />
      </Container>
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
  return bindActionCreators(
    {
      searchVideos,
      searchVideosSuggestions,
      searchVideosRelatedToVideoId,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Download);

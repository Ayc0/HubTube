import { combineReducers } from 'redux';

import searchVideosList from './searchVideos';
import searchVideosSuggestionsList from './searchVideosSuggestions';
import searchVideosRelatedList from './searchVideosRelated';

const rootReducer = combineReducers({
  searchVideosList,
  searchVideosSuggestionsList,
  searchVideosRelatedList,
});

export default rootReducer;

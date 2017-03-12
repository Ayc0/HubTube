import { combineReducers } from 'redux';

import searchVideosList from './searchVideos';
import searchVideosSuggestionsList from './searchVideosSuggestions';

const rootReducer = combineReducers({
  searchVideosList,
  searchVideosSuggestionsList,
});

export default rootReducer;

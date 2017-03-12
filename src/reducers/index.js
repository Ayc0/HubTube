import { combineReducers } from 'redux';

import searchVideosList from './searchVideos';
import searchVideosSuggestions from './searchVideosSuggestions';

const rootReducer = combineReducers({
  searchVideosList,
  searchVideosSuggestions,
});

export default rootReducer;

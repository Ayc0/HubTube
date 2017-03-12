import { SEARCH_VIDEOS_SUGGESTIONS } from '../actions/youtubeAPI';

export default function (state = [], action) {
  switch (action.type) {
    case SEARCH_VIDEOS_SUGGESTIONS:
      console.log(state.payload);
      return [];
    default:
      return state;
  }
}

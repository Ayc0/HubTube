import { SEARCH_VIDEOS_SUGGESTIONS } from '../actions/youtubeAPI';

export default function (state = [], action) {
  switch (action.type) {
    case SEARCH_VIDEOS_SUGGESTIONS:
      if (typeof action.payload[1] === 'undefined' || action.payload[1].length === 0) {
        return [];
      }
      return action.payload[1].map(e => e[0]);
    default:
      return state;
  }
}

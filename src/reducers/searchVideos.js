import { SEARCH_VIDEOS } from '../actions/youtubeAPI';

export default function (state = [], action) {
  switch (action.type) {
    case SEARCH_VIDEOS:
      return action.payload.data.items;
    default:
      return state;
  }
}

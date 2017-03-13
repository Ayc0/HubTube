import { SEARCH_VIDEOS_RELATED } from '../actions/youtubeAPI';

export default function (state = [], action) {
  switch (action.type) {
    case SEARCH_VIDEOS_RELATED:
      return action.payload.items;
    default:
      return state;
  }
}

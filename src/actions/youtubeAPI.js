import axios from 'axios';

export const SEARCH_VIDEOS = 'SEARCH_VIDEOS';
export const SEARCH_VIDEOS_SUGGESTIONS = 'SEARCH_VIDEOS_SUGGESTIONS';

const APIKey = 'AIzaSyCpo1M37RpPuQ04agbQwOF-x7ngJh3EfTM';
const APIUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${APIKey}&type=video`;

export const searchVideos = (query, maxResults = 12) => {
  const fullUrl = `${APIUrl}&q=${query}&maxResults=${maxResults}`;
  return {
    type: SEARCH_VIDEOS,
    payload: axios.get(fullUrl),
  };
};

export const searchVideosSuggestions = (query) => {
  const params = {
    params: {
      hl: 'en',
      ds: 'yt',
      client: 'youtube',
      hjson: 't',
      cp: 1,
      q: query,
      key: APIKey,
      format: 5,
      alt: 'json',
      callback: '?',
    },
  };
  return {
    type: SEARCH_VIDEOS_SUGGESTIONS,
    payload: axios.get('http://suggestqueries.google.com/complete/search', params),
  };
};

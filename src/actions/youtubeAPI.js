import axios from 'axios';

const get = url => axios.get(url).then(({ data }) => data);

export const SEARCH_VIDEOS = 'SEARCH_VIDEOS';
export const SEARCH_VIDEOS_SUGGESTIONS = 'SEARCH_VIDEOS_SUGGESTIONS';
export const SEARCH_VIDEOS_RELATED = 'SEARCH_VIDEOS_RELATED';

const APIKey = 'AIzaSyB0ZPSjedbRIuVKkTWAucTNmoL7Ki4txR0';
const APIUrl = `https://www.googleapis.com/youtube/v3/search?key=${APIKey}&part=snippet&type=video`;

export const searchVideos = (query, maxResults = 20) => {
  const fullUrl = `${APIUrl}&q=${query}&maxResults=${maxResults}`;
  return {
    type: SEARCH_VIDEOS,
    payload: get(fullUrl),
  };
};

export const searchVideosRelatedToVideoId = (videoId, maxResults = 20) => {
  const fullUrl = `${APIUrl}&relatedToVideoId=${videoId}&maxResults=${maxResults}`;
  return {
    type: SEARCH_VIDEOS_RELATED,
    payload: get(fullUrl),
  };
};

export const searchVideosSuggestions = query => {
  if (query.length === 0) {
    return {
      type: SEARCH_VIDEOS_SUGGESTIONS,
      payload: [],
    };
  }
  const fullUrl = `https://suggestqueries.google.com/complete/search?hl=fr&ds=yt&client=youtube&hjson=t&cp=1&q=${query}`;
  return {
    type: SEARCH_VIDEOS_SUGGESTIONS,
    payload: get(fullUrl),
  };
};

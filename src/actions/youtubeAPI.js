import fetchJsonp from 'fetch-jsonp';

const get = url => fetchJsonp(url).then(res => res.json());

export const SEARCH_VIDEOS = 'SEARCH_VIDEOS';
export const SEARCH_VIDEOS_SUGGESTIONS = 'SEARCH_VIDEOS_SUGGESTIONS';
export const SEARCH_VIDEOS_RELATED = 'SEARCH_VIDEOS_RELATED';

const APIKey = 'AIzaSyAo3mg_QRsLrydtaOkINcIlFNrZWr4c4Ak';
const APIUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${APIKey}&type=video`;

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

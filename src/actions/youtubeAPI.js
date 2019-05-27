import jsonp from 'jsonp';

const get = url =>
  new Promise((res, rej) =>
    jsonp(url, null, (err, data) => {
      if (err) {
        rej(err);
        return;
      }
      res(data);
    }),
  );

export const SEARCH_VIDEOS = 'SEARCH_VIDEOS';
export const SEARCH_VIDEOS_SUGGESTIONS = 'SEARCH_VIDEOS_SUGGESTIONS';
export const SEARCH_VIDEOS_RELATED = 'SEARCH_VIDEOS_RELATED';

const APIKey = 'AIzaSyAo3mg_QRsLrydtaOkINcIlFNrZWr4c4Ak';
const APIUrl = `https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.search.list?key=${APIKey}&part=snippet&type=video`;

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

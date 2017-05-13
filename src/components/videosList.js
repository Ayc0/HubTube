import React from 'react';
import { GridList } from 'material-ui/GridList';

import VideosListItem from './videosListItem';

export default function(props) {
  let send;
  if (typeof props.send === 'undefined') {
    send = query => query;
  } else {
    send = props.send;
  }

  let addToPlaylist;
  if (typeof props.addToPlaylist === 'undefined') {
    addToPlaylist = query => query;
  } else {
    addToPlaylist = props.addToPlaylist;
  }

  const listOfVideos = props.list.map(video => (
    <VideosListItem
      key={video.id.videoId}
      video={video}
      send={send}
      addToPlaylist={addToPlaylist}
    />
  ));
  return (
    <GridList
      cols={window.matchMedia('(min-width: 480px)').matches ? 4 : 1}
      cellHeight={180}
    >
      {listOfVideos}
    </GridList>
  );
}

import React from 'react';
import { GridList } from 'material-ui/GridList';

import VideosListItem from './videosListItem';

export default function (props) {
  let icon;
  if (typeof props.icon === 'undefined') {
    icon = '';
  } else {
    icon = props.icon;
  }

  let send;
  if (typeof props.send === 'undefined') {
    send = query => (query);
  } else {
    send = props.send;
  }

  const listOfVideos = props.list.map(video =>
    <VideosListItem
      key={video.id.videoId}
      video={video}
      icon={icon}
      send={send}
    />,
  );
  return (
    <GridList
      cols={window.matchMedia('(min-width: 480px)').matches ? 4 : 1}
      cellHeight={180}
    >
      {listOfVideos}
    </GridList>
  );
}

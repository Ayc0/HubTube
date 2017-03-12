import React from 'react';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';

import './videosListItem.css';

export default (props) => {
  let send;
  if (typeof props.send === 'undefined') {
    send = query => (query);
  } else {
    send = props.send;
  }
  return (
    <GridTile
      title={<b>{props.video.snippet.title}</b>}
      subtitle={props.video.snippet.channelTitle}
      actionIcon={<IconButton onClick={() => send(props.video.id.videoId)}>
          {props.icon}
        </IconButton>}
    >
      <img src={props.video.snippet.thumbnails.high.url}
        onClick={() => send(props.video.id.videoId)}
        className="thumbnails"
      />
    </GridTile>
  );
};

import React from 'react';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Send from 'material-ui/svg-icons/content/send';
import PlaylistAdd from 'material-ui/svg-icons/av/playlist-add';

import ScrollingText from './scrollingText';
import './videosListItem.css';

export default props => {
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

  return (
    <GridTile
      title={(
        <ScrollingText
          text={props.video.snippet.title}
          lineHeight="32px"
          fontSize="16px"
          top="8px"
          bold
        />
)}
      subtitle={props.video.snippet.channelTitle}
      actionIcon={(
        <div style={{ display: 'flex' }}>
          <IconButton onTouchTap={() => addToPlaylist(props.video)}>
            <PlaylistAdd color="white" hoverColor="#d5d5d5" />
          </IconButton>
          <IconButton onTouchTap={() => send(props.video)}>
            <Send color="white" hoverColor="#d5d5d5" />
          </IconButton>
        </div>
)}
    >
      <img
        src={props.video.snippet.thumbnails.high.url}
        onTouchTap={() => send(props.video)}
        className="thumbnails"
        alt={props.video.snippet.title}
      />
    </GridTile>
  );
};

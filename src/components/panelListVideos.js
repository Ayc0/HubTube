import React from 'react';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import PropTypes from 'prop-types';
import { socketConnect } from 'socket.io-react';
import { styled } from 'styletron-react';

const StyledList = styled(List, () => ({
  backgroundColor: '#222222',
  overflowY: 'scroll',
  height: '440px',
  flexGrow: 1,
  boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
}));

const Video = props => {
  const sendVideo = video => {
    props.socket.emit('sendVideo', {
      video,
      id: props.socket.id,
      room: document.location.pathname,
    });
  };

  return (
    <ListItem
      style={{ color: '#e8e8e8' }}
      leftAvatar={
        <Avatar
          src={props.video.snippet.thumbnails.medium.url}
          alt={props.video.snippet.title}
        />
      }
      primaryText={props.video.snippet.title}
      onClick={() => sendVideo(props.video)}
    />
  );
};

const CVideo = socketConnect(Video);

const PanelListVideos = props => (
  <StyledList>
    {props.queueList.length > 0
      ? <Subheader style={{ color: '#e8e8e8' }}>Queue</Subheader>
      : null}
    {props.queueList.map(video => (
      <CVideo key={video.id.videoId} video={video} />
    ))}
    {props.relatedList.length > 0
      ? <Subheader style={{ color: '#e8e8e8' }}>Related videos</Subheader>
      : null}
    {props.relatedList.map(video => (
      <CVideo key={video.id.videoId} video={video} />
    ))}
  </StyledList>
);

PanelListVideos.propTypes = {
  queueList: PropTypes.array,
  relatedList: PropTypes.array,
};

PanelListVideos.defaultProps = {
  queueList: [],
  relatedList: [],
};

export default PanelListVideos;

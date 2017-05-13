import React from 'react';

const resultVideos = props => (
  <div
    style={{
      padding: this.props.list.length === 0 ? 0 : '1em',
      marginTop: '-3em',
    }}
  >
    <VideosList
      list={props.list}
      send={props.setVideo}
      addToPlaylist={props.addToPlaylist}
    />
  </div>
);

export default resultVideos;

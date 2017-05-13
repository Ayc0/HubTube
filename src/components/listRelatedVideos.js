import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import { styled } from 'styletron-react';

const StyledList = styled(List, () => ({
  backgroundColor: '#222222',
  overflowY: 'scroll',
  height: '440px',
  flexGrow: 1,
}));

export default class ListRelatedVideo extends Component {
  render() {
    return (
      <StyledList>
        {this.props.list.map(video => (
          <ListItem
            style={{ color: '#e8e8e8' }}
            leftAvatar={
              <Avatar
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
              />
            }
            primaryText={video.snippet.title}
          />
        ))}
      </StyledList>
    );
  }
}

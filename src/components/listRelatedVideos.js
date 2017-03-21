import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import { styled } from 'styletron-react';

const StyledList = styled(List, () => ({
  backgroundColor: '#222222',
  flexGrow: 1,
  // marginLeft: '0.5em',
  overflowY: 'scroll',
  height: '420px',
}));

export default class ListRelatedVideo extends Component {
  render() {
    return (
      <StyledList>
        <ListItem primaryText="Inbox" />
      </StyledList>
    );
  }
}

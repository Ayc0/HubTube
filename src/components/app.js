import React from 'react';

import NavTab from './navTab';
import Upload from '../containers/upload';
import Download from '../containers/download';

const App = () => (
  <div style={{ padding: 0 }}>
    <NavTab>
      <Upload />
      <Download />
    </NavTab>
  </div>
);

export default App;

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider as ReduxProvider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

import { Client as StyletronClient } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';

import reducers from './reducers';

import App from './components/app';
import Home from './components/home';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const socket = io.connect(process.env.BACKEND_URL);

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#cc181e',
  },
});

const styleSheet = document.createElement('style');
document.head.appendChild(styleSheet);
const instance = new StyletronClient({ hydrate: styleSheet, prefix: '_' });

ReactDOM.render(
  <ReduxProvider store={createStoreWithMiddleware(reducers)}>
    <SocketProvider socket={socket}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <StyletronProvider value={instance}>
          <div style={{ WebkitFontSmoothing: 'antialiased' }}>
            {document.location.pathname === '/' ? <Home /> : <App />}
          </div>
        </StyletronProvider>
      </MuiThemeProvider>
    </SocketProvider>
  </ReduxProvider>,
  document.getElementById('root'),
);

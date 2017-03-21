import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

import Styletron from 'styletron-client';
import { StyletronProvider } from 'styletron-react';

import reducers from './reducers';

import App from './components/app';
import Home from './components/home';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const socket = io.connect('localhost:8000');

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#cc181e',
  },
});
injectTapEventPlugin();

const styleSheet = document.createElement('style');
document.head.appendChild(styleSheet);
const styletron = new Styletron([styleSheet]);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <SocketProvider socket={socket}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <StyletronProvider styletron={styletron}>
          <div style={{ WebkitFontSmoothing: 'antialiased' }}>
            { document.location.pathname === '/' ? <Home /> : <App /> }
          </div>
        </StyletronProvider>
      </MuiThemeProvider>
    </SocketProvider>
  </Provider>,
  document.getElementById('root'),
);

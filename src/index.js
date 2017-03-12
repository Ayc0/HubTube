import React from 'react';
import ReactDOM from 'react-dom';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import reducers from './reducers';

import App from './components/app';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const socket = io.connect('localhost:8000');
socket.on('message', msg => console.log(msg));

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#cc181e',
  },
});

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <SocketProvider socket={socket}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{ lineHeight: '24px', WebkitFontSmoothing: 'antialiased' }}>
          <App />
        </div>
      </MuiThemeProvider>
    </SocketProvider>
  </Provider>,
  document.getElementById('root'),
);

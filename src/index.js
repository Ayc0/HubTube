import React from 'react';
import ReactDOM from 'react-dom';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import injectTapEventPlugin from 'react-tap-event-plugin';

import reducers from './reducers';

import App from './components/app';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const socket = io.connect('10.10.200.31:8000');

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#cc181e',
  },
});

injectTapEventPlugin();

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

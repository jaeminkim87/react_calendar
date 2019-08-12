import React from 'react';
import ReactDOM from 'react-dom';
import "regenerator-runtime/runtime";
import createSagaMiddleware from 'redux-saga';
import WebfontLoader from '@dr-kobros/react-webfont-loader';
import sagas from './sagas';
import './index.scss';

import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux'
import rootReducer from "./reducers/index";

import App from './App';

const sagaMiddleware = createSagaMiddleware();
const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware), devTools);
store.sagaTask = sagaMiddleware.run(sagas);

const config = {
  google: {
    families: ['Noto Sans KR'],
  }
};

const callback = status => {
  // I could hook the webfont status to for example Redux here.
};

ReactDOM.render(
  <Provider store={store}>
    <WebfontLoader config={config} onStatus={callback}>
      <App/>
    </WebfontLoader>
  </Provider>,
  document.getElementById('root')
);
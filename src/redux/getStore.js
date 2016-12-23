import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

import distance from './distance';

let store = null;
export default function getStore() {
  if (!store) {
    const logger = createLogger({
      collapsed: true
    });
    store = createStore(combineReducers({
      distance
    }), applyMiddleware(logger));
  }

  return store;
}

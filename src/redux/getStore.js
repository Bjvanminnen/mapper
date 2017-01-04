import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

import distance from './distance';
import positions from './positions';
import targets from './targets';

let store = null;
export default function getStore() {
  if (!store) {
    const logger = createLogger({
      collapsed: true
    });
    store = createStore(combineReducers({
      distance,
      positions,
      targets
    }), applyMiddleware(logger));
  }

  return store;
}

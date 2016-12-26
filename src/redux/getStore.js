import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

import distance from './distance';
import visitedPositions from './visitedPositions';
import targets from './targets';

let store = null;
export default function getStore() {
  if (!store) {
    const logger = createLogger({
      collapsed: true
    });
    store = createStore(combineReducers({
      distance,
      visitedPositions,
      targets
    }), applyMiddleware(logger));
  }

  return store;
}

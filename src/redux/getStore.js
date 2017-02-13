import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import Immutable from 'immutable';

import distance from './distance';
import positions from './positions';
import targets from './targets';
import orbs from './orbs';
import modal from './modal';
import inventory from './inventory';
import time from './time';

let store = null;
export default function getStore() {
  if (!store) {
    const logger = createLogger({
      collapsed: true,
      stateTransformer: (state) => {
        let newState = {};

        for (var i of Object.keys(state)) {
          if (Immutable.Iterable.isIterable(state[i])) {
            newState[i] = state[i].toJS();
          } else {
            newState[i] = state[i];
          }
        };

        return newState;
      }
    });

    store = createStore(combineReducers({
      distance,
      positions,
      targets,
      orbs,
      modal,
      inventory,
      time
    }), applyMiddleware(logger));
  }

  return store;
}

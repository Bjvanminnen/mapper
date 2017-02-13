/**
 * This file owns starting up various background services, such as updating
 * time and location, and generating new orbs as needed. It does this by
 * dispatching actions to our redux store.
 */
import { bindDistanceFilter } from './redux/distance';
import { getCurrentTime, setTime } from './redux/time';
import { OrbType, getRandomOrbs } from './orb';
import { addOrbBlock } from './redux/orbs';

const TIME_UPDATE_INTERVAL = 10 * 1000; // 30 seconds

export function start(store) {
  bindDistanceFilter();
  updateTimeOnInterval(store);
  updateOrbsOnChange(store);
}

/**
 * Send update time actions to the redux store on a regular basis.
 */
function updateTimeOnInterval(store) {
  store.dispatch(setTime(getCurrentTime()));
  if (process.env.NODE_ENV !== 'test') {
    setInterval(() => {
      store.dispatch(setTime(getCurrentTime()));
    }, TIME_UPDATE_INTERVAL);
  }
}

/**
 *
 */
function updateOrbsOnChange(store) {
  // TODO - eventually update when time/location changes
  let initialized = false;
  store.subscribe(() => {
    const state = store.getState();
    const currentPosition = state.positions.current;
    if (!initialized && currentPosition) {
      initialized = true;

      const orbBlock = getRandomOrbs(currentPosition.latitude,
        currentPosition.longitude, state.time, 40);
      store.dispatch(addOrbBlock(orbBlock));

      // add an orb in current location to make testing easier
      // store.dispatch(addOrb({
      //   latitude: currentPosition.latitude,
      //   longitude: currentPosition.longitude,
      //   startTime: state.time + 1000 * 10,
      //   duration: 1000 * 20,
      //   orbType: OrbType.Red
      // }));
    }
  });
}

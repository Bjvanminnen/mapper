import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter } from 'react-native';

import Location from 'react-native-location';

import { setCurrentPosition } from '../redux/positions';

/**
 * LocationUpdater
 * This module doesnt render anything, but owns the logic for listening for
 * location updates, and communicating these to redux.
 */
class LocationUpdater extends Component {
  componentWillMount() {
    Location.requestAlwaysAuthorization();
    Location.startUpdatingLocation();
  }

  componentDidMount() {
    let lastLocation;
    this.listener = DeviceEventEmitter.addListener('locationUpdated',
      location => {
        const newLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        };

        if (lastLocation && lastLocation.latitude=== newLocation.latitude&&
            lastLocation.long === newLocation.long) {
          return
        }
        lastLocation = newLocation;
        this.props.setCurrentPosition(newLocation, location.coords.course);
      }
    );
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  render() {
    return null;
  }
}

export default connect(state => ({}), dispatch => ({
  setCurrentPosition: ({latitude, longitude}, course) => {
    dispatch(setCurrentPosition({latitude, longitude}, course))
  }
}))(LocationUpdater);

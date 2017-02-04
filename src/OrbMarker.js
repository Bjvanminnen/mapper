import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { isWithin } from './distanceUtils';
import { OrbType } from './redux/orbs';

const styles = {
  marker: {
    fontWeight: 'bold',
    padding: 3,
    textAlign: 'center',
    color: 'white'
  },
  markerBackground: {
    borderWidth: 1,
    borderRadius: 15,
    overflow: 'hidden',
    width: 25,
    height: 25,
  },
  outOfRange: {
    opacity: 0.3
  }
};

const orbColor = {
  [OrbType.Red]: {
    borderColor: '#570807',
    backgroundColor: '#ba141188',
  },
  [OrbType.Blue]: {
    borderColor: '#0000ff',
    backgroundColor: '#0080ff',
  },
  [OrbType.Green]: {
    borderColor: '#0C4D0C',
    backgroundColor: '#189918',
  }
};

export default class OrbMarker extends Component {
  static propTypes = {
    userPosition: PropTypes.object.isRequired,
    markerPosition: PropTypes.object.isRequired,
    type: PropTypes.oneOf(Object.keys(OrbType)).isRequired
  }

  render() {
    const { userPosition, markerPosition, type } = this.props;
    const isClose = isWithin(userPosition, markerPosition, 40);

    const backStyle = orbColor[type];

    return (
      <MapView.Marker
        key="target"
        coordinate={markerPosition}
      >
        <View
          style={[
            styles.markerBackground,
            backStyle,
            !isClose && styles.outOfRange
          ]}>
          <Text style={[styles.marker]}>
            T
          </Text>
        </View>
      </MapView.Marker>
    );
  }
}

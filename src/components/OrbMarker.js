import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { isWithin } from '../distanceUtils';
import { OrbType, OrbShape, orbIsActive } from '../orb';

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
  },
  outOfTime: {
    opacity: 0.1
  }
};

const orbColor = {
  [OrbType.Red]: {
    borderColor: '#570807',
    backgroundColor: '#ba1411',
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

// TODO - markers dont change size as we zoom

export default class OrbMarker extends Component {
  static propTypes = {
    userPosition: PropTypes.object.isRequired,
    currentTime: PropTypes.number.isRequired,
    orb: OrbShape.isRequired,
    closeOrb: PropTypes.func.isRequired
  }

  render() {
    const { userPosition, currentTime, orb, closeOrb } = this.props;

    const isClose = isWithin(userPosition, orb, 80);
    const isActive = orbIsActive(orb, currentTime);

    const backStyle = orbColor[orb.orbType];

    return (
      <MapView.Marker
        key="target"
        coordinate={orb}
        onPress={isClose && isActive && closeOrb || (() => {})}
      >
        <View
          style={[
            styles.markerBackground,
            backStyle,
            !this.isClose && styles.outOfRange,
            !isActive && styles.outOfTime
          ]}>
          <Text style={[styles.marker]}>
            O
          </Text>
        </View>
      </MapView.Marker>
    );
  }
}

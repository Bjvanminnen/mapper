import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { isWithin } from './distanceUtils';
import { OrbType, OrbShape } from './orb';

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

// TODO - markers dont change size as we zoom

export default class OrbMarker extends Component {
  static propTypes = {
    userPosition: PropTypes.object.isRequired,
    orb: OrbShape.isRequired,
    closeOrb: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    console.log(this.props.orb.id);
    if (!this.isClose || !this.inTime) {
      return;
    }

    this.props.closeOrb();
  }

  render() {
    const { userPosition, orb } = this.props;

    this.isClose = isWithin(userPosition, orb, 20);

    const backStyle = orbColor[orb.orbType];

    // TODO - technically we should probably pass in current time from somewhere
    const now = (new Date()).getTime();
    this.inTime = true;
    if (now < orb.startTime || now > orb.startTime + orb.duration) {
      this.inTime = false;
    }

    return (
      <MapView.Marker
        key="target"
        coordinate={orb}
        onPress={this.onPress}
      >
        <View
          style={[
            styles.markerBackground,
            backStyle,
            !this.isClose && styles.outOfRange,
            !this.inTime && styles.outOfTime
          ]}>
          <Text style={[styles.marker]}>
            O
          </Text>
        </View>
      </MapView.Marker>
    );
  }
}

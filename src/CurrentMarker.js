import React, { Component } from 'react';
import { Text } from 'react-native';
import MapView from 'react-native-maps';

const styles = {
  main: {
    fontWeight: 'bold',
    color: 'green',
    fontSize: 20
  }
};

class CurrentMarker extends Component {
  render() {
    const rotation = {
      transform: [
        { rotate: (this.props.heading - 90) + 'deg' }
      ]
    };
    return (
      <MapView.Marker
        key="current"
        coordinate={this.props.pos}
      >
        <Text style={[styles.main, rotation]}>
          >
        </Text>
      </MapView.Marker>
    );
  }
}

export default CurrentMarker

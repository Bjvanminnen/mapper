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
    // TODO - saw this facing the wrong direction while walking. possibly heading
    // is only 180 degrees, or we have a problem with negative or something??
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

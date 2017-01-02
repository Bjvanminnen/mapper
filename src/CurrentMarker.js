import React, { Component } from 'react';
import { Text } from 'react-native';
import MapView from 'react-native-maps';

const styles = {
  marker: {
    fontWeight: 'bold',
  },
  currentMarker: {
    color: 'green'
  }
};

class CurrentMarker extends Component {
  render() {
    return (
      <MapView.Marker
        key="current"
        coordinate={this.props.pos}
      >
        <Text style={[styles.marker, styles.currentMarker]}>
          O
        </Text>
      </MapView.Marker>
    );
  }
}

export default CurrentMarker

import React, { Component } from 'react';
import { DeviceEventEmitter, StyleSheet } from 'react-native';
import { RNLocation as Location } from 'NativeModules';
import MapView from 'react-native-maps';

Location.requestAlwaysAuthorization();
Location.startUpdatingLocation();
Location.setDistanceFilter(1.0);

export default class NativeMapper extends Component {
  state = {
    positions: []
  };

  componentDidMount() {
    this.listener = DeviceEventEmitter.addListener('locationUpdated',
      location => {
        this.setState({
          positions: this.state.positions.concat(location.coords)
        });
      }
    );
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  render() {
    if (this.state.positions.length === 0) {
      return null;
    }

    const initialRegion = {
      latitude: this.state.positions[0].latitude,
      longitude: this.state.positions[0].longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    console.log(initialRegion);
    console.log(this.state.positions.length);

    return (
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
      >
        {this.state.positions.map((pos, index) => (
          <MapView.Marker
            key={index}
            title={index.toString()}
            pinColor={index === this.state.positions.length - 1 ? 'green' : 'blue'}
            coordinate={{
              latitude: pos.latitude,
              longitude: pos.longitude
            }}
          />
        ))}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

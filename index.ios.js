/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps';

export default class mapper extends Component {
  state = {
    initialPosition: null,
    lastPosition: null,
    positions: []
  };

  componentDidMount() {
    const locationOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    };

    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ initialPosition: position });
      },
      error => alert(JSON.stringify(error)),
      locationOptions
    );
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          lastPosition: position,
          positions: this.state.positions.concat(position.coords)
        });
      },
      error => alert(JSON.stringify(error)),
      locationOptions
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    if (!this.state.lastPosition) {
      return null;
    }
    const region = {
      latitude: this.state.lastPosition.coords.latitude,
      longitude: this.state.lastPosition.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    return (
      <MapView
        style={styles.map}
        initialRegion={region}
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

// class GeolocationExample extends React.Component {
//   state = {
//     initialPosition: 'unknown',
//     lastPosition: 'unknown',
//     updates: 0
//   };
//
//   watchID: null;
//
//   componentDidMount() {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         var initialPosition = JSON.stringify(position);
//         this.setState({initialPosition});
//       },
//       (error) => alert(JSON.stringify(error)),
//       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
//     );
//     this.watchID = navigator.geolocation.watchPosition((position) => {
//       var lastPosition = JSON.stringify(position);
//       this.setState({lastPosition, updates: this.state.updates + 1});
//     });
//   }
//
//   componentWillUnmount() {
//     navigator.geolocation.clearWatch(this.watchID);
//   }
//
//   render() {
//     return (
//       <View>
//         <Text style={styles.title}>Initial position: </Text>
//         <Text style={styles.text}>{this.state.initialPosition}</Text>
//         <Text style={styles.title}>Current position: </Text>
//         <Text style={styles.text}>{this.state.lastPosition}</Text>
//         <Text style={styles.title}>{this.state.updates}</Text>
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
    fontSize: 30,
    marginTop: 30
  },
  text: {
    fontSize: 20
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

AppRegistry.registerComponent('mapper', () => mapper);

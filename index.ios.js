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

export default class mapper extends Component {
  render() {
    return (
      <GeolocationExample />
    );
  }
}

class GeolocationExample extends React.Component {
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
    updates: 0
  };

  watchID: null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition, updates: this.state.updates + 1});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View>
        <Text style={styles.title}>Initial position: </Text>
        <Text style={styles.text}>{this.state.initialPosition}</Text>
        <Text style={styles.title}>Current position: </Text>
        <Text style={styles.text}>{this.state.lastPosition}</Text>
        <Text style={styles.title}>{this.state.updates}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
    fontSize: 30,
    marginTop: 30
  },
  text: {
    fontSize: 20
  }
});

AppRegistry.registerComponent('mapper', () => mapper);

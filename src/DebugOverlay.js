import React, { Component } from 'react';
import { View, Text } from 'react-native';

const styles = {
  main: {
    position: 'absolute',
    left: 5,
    top: 5,
    borderWidth: 1,
    borderColor: 'black'
  }

};

export default class Overlay extends Component {
  render() {
    return (
      <View style={styles.main}>
        <Text>TEST</Text>
      </View>
    );
  }
};

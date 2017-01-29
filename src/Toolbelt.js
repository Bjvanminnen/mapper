import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';


const styles = {
  main: {
    backgroundColor: 'brown',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  text: {
    color: 'white',
    fontSize: 34,
    fontFamily: 'Courier',
    paddingLeft: 5,
    paddingRight: 5
  }
};

class Toolbelt extends Component {
  // Currently just one button, but eventually multiple?
  render() {
    return (
      <TouchableHighlight
        style={styles.main}
        onPress={() => console.log('pressed')}
      >
        <Text style={styles.text}>I</Text>
      </TouchableHighlight>
    );
  }
}

export default Toolbelt;

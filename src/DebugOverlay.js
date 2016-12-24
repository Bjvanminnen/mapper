import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getLastPosition } from './redux/positions';
import haversine from 'haversine';

const styles = {
  main: {
    position: 'absolute',
    left: 5,
    top: 5,
    borderWidth: 1,
    borderColor: 'black'
  }

};

class DebugOverlay extends Component {
  static propTypes = {
    // lastPosition: React.PropTypes.shape({
    //   lat: React.PropTypes.number.isRequired,
    //   long: React.PropTypes.number.isRequired
    // }).isRequired
  };
  render() {
    return (
      <View style={styles.main}>
        <Text>{this.props.distance}</Text>
      </View>
    );
  }
};

function distanceBetweenFirstAndLast(positions) {
  const first = positions[0];
  const last = getLastPosition(positions);
  const distance = haversine(first, last, { unit: 'meter' });
  console.log(distance);
  return distance;
}

export default connect(state => ({
  distance: distanceBetweenFirstAndLast(state.positions)
  // lastPosition: JSON.stringify(getLastPosition(state.positions))
}))(DebugOverlay);

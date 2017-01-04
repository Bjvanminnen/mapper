import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { distanceDiff } from './distanceUtils';

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
    distance: React.PropTypes.number.isRequired
  };
  render() {
    return (
      <View style={styles.main}>
        <Text>{this.props.distance}</Text>
        <Text>{this.props.currentHeading}</Text>
      </View>
    );
  }
};

function distanceFromTarget(currentPos, targets) {
  const target = targets[0];
  if (!target) {
    return 0;
  }
  return distanceDiff(currentPos, target);
}

export default connect(state => ({
  distance: distanceFromTarget(state.visitedPositions.current, state.targets),
  currentHeading: state.visitedPositions.heading,
}))(DebugOverlay);

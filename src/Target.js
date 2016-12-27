import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { createTarget } from './redux/targets';
import { getCurrentPosition } from './redux/visitedPositions';
import MapView from 'react-native-maps';
import { isWithin } from './distanceUtils';

const styles = {
  marker: {
    marginLeft: 46,
    marginTop: 33,
    fontWeight: 'bold',
    color: 'black'
  },
  markerInRange: {
    color: 'green'
  }
};

class Target extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const { currentPosition, target, createTarget } = this.props;
    const isClose = isWithin(target, currentPosition, 40);

    if (isClose) {
      createTarget(currentPosition);
    }
  }

  render() {
    if (!this.props.target) {
      return null;
    }
    const isClose = isWithin(this.props.target, this.props.currentPosition, 40);

    return (
      <MapView.Marker
        key="target"
        coordinate={this.props.target}
        onPress={this.onPress}
      >
        <Text style={[styles.marker, isClose && styles.markerInRange]}>
          T
        </Text>
      </MapView.Marker>
    );
  }
}

export default connect(state => ({
  currentPosition: getCurrentPosition(state.visitedPositions),
  target: state.targets[0]
}), dispatch => ({
  createTarget: currentPos => dispatch(createTarget(currentPos))
}))(Target);

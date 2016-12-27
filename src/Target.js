import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { createTarget } from './redux/targets';
import { getCurrentPosition } from './redux/visitedPositions';
import MapView from 'react-native-maps';

const styles = {
  marker: {
    marginLeft: 46,
    marginTop: 33,
    fontWeight: 'bold',
  }
};

class Target extends Component {
  constructor(props) {
    super(props);

    this.createTarget = this.createTarget.bind(this);
  }

  createTarget() {
    const { currentPosition } = this.props;
    this.props.createTarget(currentPosition)
  }

  render() {
    if (!this.props.target) {
      return null;
    }
    return (
      <MapView.Marker
        key="target"
        coordinate={this.props.target}
        onPress={this.createTarget}
      >
        <Text style={styles.marker}>T</Text>
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

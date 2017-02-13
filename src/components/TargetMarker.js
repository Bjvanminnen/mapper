import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { createTarget } from '../redux/targets';
import { isWithin } from '../distanceUtils';
import { setModal } from '../redux/modal';

const styles = {
  marker: {
    fontWeight: 'bold',
    padding: 3,
    color: 'white',
    textAlign: 'center',
  },
  markerBackground: {
    borderWidth: 1,
    borderColor: '#570807',
    borderRadius: 15,
    backgroundColor: '#ba141188',
    overflow: 'hidden',
    width: 25,
    height: 25,
  },
  markerInRange: {
    borderColor: '#084d05',
    backgroundColor: '#0a780688'
  },
};

class TargetMarker extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const { currentPosition, target, createTarget } = this.props;

    this.props.displayModal('target_selected');
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
        <View style={[styles.markerBackground, isClose && styles.markerInRange]}>
          <Text style={[styles.marker]}>
            T
          </Text>
        </View>
      </MapView.Marker>
    );
  }
}

export default connect(state => ({
  currentPosition: state.positions.current,
  target: state.targets[0]
}), dispatch => ({
  createTarget: currentPos => dispatch(createTarget(currentPos)),
  displayModal: text => dispatch(setModal(text))
}))(TargetMarker);

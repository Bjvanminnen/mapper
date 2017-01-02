import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import LabelledInputRow from './LabelledInputRow';
import Location from 'react-native-location';
import { setDistance } from './redux/distance';
import getStore from './redux/getStore';
import { connect } from 'react-redux';
import { createTarget } from './redux/targets';
import { clearPositions } from './redux/visitedPositions';

class DebugScreen extends Component {
  static propTypes = {
    onClear: React.PropTypes.func.isRequired,
    currentPosition: React.PropTypes.object.isRequired,
    oldPositions: React.PropTypes.array.isRequired,
    // redux
    setDistance: React.PropTypes.func.isRequired,
  };

  state = {
    selectedItem: 0
  }

  constructor(props) {
    super(props);

    this.props.setDistance(this.props.distance);
    this.onDistanceChange = this.onDistanceChange.bind(this);
    this.newTarget = this.newTarget.bind(this);
  }

  onDistanceChange(val) {
    const numVal = parseInt(val, 10);

    this.props.setDistance(numVal);
  }

  newTarget() {
    const { currentPosition } = this.props;
    this.props.createTarget(currentPosition);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={{fontSize: 20}}>
          This is the DebugScreen
        </Text>
        <Button
          onPress={this.props.onClear}
          title="Clear Markers"
        />
        <Button
          onPress={this.newTarget}
          title="New Target"
        />
        <LabelledInputRow
          label="distance"
          startVal={this.props.distance.toString()}
          onChange={this.onDistanceChange}
        />
      </View>
    );
  }
}

export default connect(state => ({
  distance: state.distance,
  currentPosition: state.visitedPositions.current,
  oldPositions: state.visitedPositions.historical
}), dispatch => ({
  setDistance: val => dispatch(setDistance(val)),
  onClear: () => dispatch(clearPositions()),
  createTarget: currentPosition => dispatch(createTarget(currentPosition))
}))(DebugScreen);

import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import LabelledInputRow from './LabelledInputRow';
import { RNLocation as Location } from 'NativeModules';
import { setDistance } from './redux/distance';
import getStore from './redux/getStore';
import { connect } from 'react-redux';
import { createTarget } from './redux/targets';

class DebugScreen extends Component {
  static propTypes = {
    onClear: React.PropTypes.func.isRequired,
    visitedPositions: React.PropTypes.array.isRequired,
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
    this.onCreateTarget = this.onCreateTarget.bind(this);
  }

  onDistanceChange(val) {
    const numVal = parseInt(val, 10);

    this.props.setDistance(numVal);
  }

  onCreateTarget() {
    const { visitedPositions, createTarget } = this.props;

    const currentPosition = visitedPositions[visitedPositions.length - 1];
    createTarget(currentPosition);
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
          onPress={this.onCreateTarget}
          title="Create Target"
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
  visitedPositions: state.visitedPositions
}), dispatch => ({
  setDistance: val => dispatch(setDistance(val)),
  createTarget: currentPosition => dispatch(createTarget(currentPosition))
}))(DebugScreen);

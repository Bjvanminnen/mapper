import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import LabelledInputRow from './LabelledInputRow';
import { RNLocation as Location } from 'NativeModules';
import { setDistance } from './redux/distance';
import getStore from './redux/getStore';
import { connect } from 'react-redux';

class DebugScreen extends Component {
  static propTypes = {
    onClear: React.PropTypes.func.isRequired,
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
  }

  onDistanceChange(val) {
    const numVal = parseInt(val, 10);

    this.props.setDistance(numVal);
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
  distance: state.distance
}), dispatch => ({
  setDistance: val => dispatch(setDistance(val))
}))(DebugScreen);
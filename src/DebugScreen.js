import React, { Component } from 'react';
import { View, Text, Picker, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import LabelledInputRow from './LabelledInputRow';
import { RNLocation as Location } from 'NativeModules';

export default class DebugScreen extends Component {
  state = {
    selectedItem: 0
  }

  constructor(props) {
    super(props);

    this.onDistanceChange = this.onDistanceChange.bind(this);
  }

  onDistanceChange(val) {
    const numVal = parseInt(val, 10);
    Location.setDistanceFilter(numVal);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>
          This is the DebugScreen
        </Text>
        <LabelledInputRow
          label="distance"
          onChange={this.onDistanceChange}
        />
      </View>
    );
  }
}

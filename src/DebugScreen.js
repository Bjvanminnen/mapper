import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import LabelledInputRow from './LabelledInputRow';
import { RNLocation as Location } from 'NativeModules';
import { setDistance } from './redux/distance';
import getStore from './redux/getStore';

export default class DebugScreen extends Component {
  static propTypes = {
    onClear: React.PropTypes.func.isRequired
  };

  state = {
    selectedItem: 0
  }

  constructor(props) {
    super(props);

    this.onDistanceChange = this.onDistanceChange.bind(this);
  }

  onDistanceChange(val) {
    const numVal = parseInt(val, 10);

    // TODO - connect
    getStore().dispatch(setDistance(numVal));
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
          startVal="5"
          onChange={this.onDistanceChange}
        />
      </View>
    );
  }
}

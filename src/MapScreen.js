import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

import NativeMapper from './NativeMapper';
import DebugOverlay from './DebugOverlay';
import DebugScreen from './DebugScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class MapScreen extends Component {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.pressDebug = this.pressDebug.bind(this);
  }

  pressDebug() {
    this.props.navigator.push({
      back: true,
      component: DebugScreen,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <NativeMapper/>
        <Button
          onPress={this.pressDebug}
          title="Debug"
          backgroundColor="blue"
        />
        <DebugOverlay/>
      </View>
    );
  }
}

export default MapScreen;

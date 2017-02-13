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
import LocationUpdater from './LocationUpdater';
import Modal from './Modal';
import Toolbelt from './Toolbelt';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class MapScreen extends Component {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        <LocationUpdater/>
        <NativeMapper/>
        <Toolbelt/>
        <DebugOverlay/>
        <Modal/>
      </View>
    );
  }
}

export default MapScreen;

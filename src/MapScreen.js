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

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const longString = '' +
`This is a long string.

It has multiple paragraphs that go on and on and such.

Lorem ipsum, etcetera etcera.

How do you like them apples?

Actually, I'm allergic to apples, so I don't like them very much at all. Do you
happen to have opinions on apples?
`;

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
        <LocationUpdater/>
        <NativeMapper/>
        <Button
          onPress={this.pressDebug}
          title="Debug"
          backgroundColor="blue"
        />
        <DebugOverlay/>
        <Modal
          text={longString + longString + longString}
        />
      </View>
    );
  }
}

export default MapScreen;

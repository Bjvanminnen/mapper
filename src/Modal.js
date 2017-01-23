import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Button
} from 'react-native';

const styles = {
  main: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  background: {
    backgroundColor: '#00000088',
    flex: 1,
  },
  modal: {
    position: 'absolute',
    top: 40,
    bottom: 70,
    left: 40,
    right: 40,
    padding: 10,
    backgroundColor: 'white'
  }
};

class Modal extends Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);

    this.state = {
      open: true
    }
  }

  onClose() {
    this.setState({open: false});
  }

  render() {
    if (!this.state.open) {
      return null;
    }

    return (
      <View style={styles.main}>
        <View style={styles.background}/>
        <ScrollView style={styles.modal}>
          <Text>
            {this.props.text}
          </Text>
          <Button
            title="Close"
            onPress={this.onClose}
          />
        </ScrollView>
      </View>
    );
  }
}

export default Modal;

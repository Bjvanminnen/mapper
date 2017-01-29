import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import { closeModal } from './redux/modal';
import TargetSelectedModal from './TargetSelectedModal';

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
    data: React.PropTypes.object,
    screenId: React.PropTypes.string.isRequired
  };

  render() {
    const { data, screenId } = this.props;
    if (screenId === '') {
      return null;
    }

    let contents = {};
    if (screenId === 'text') {
      contents = <Text>{data}</Text>;
    } else if (screenId === 'target_selected') {
      contents = <TargetSelectedModal/>;
    } else {
      throw new Error('unknown screenId: ' + screenId);
    }

    return (
      <View style={styles.main}>
        <View style={styles.background}/>
        <ScrollView style={styles.modal}>
          {contents}
          <Button
            title="Close"
            onPress={this.props.closeModal}
          />
        </ScrollView>
      </View>
    );
  }
}

export default connect(state => ({
  data: state.modal.data,
  screenId: state.modal.screenId
}), dispatch => ({
  closeModal() {
    dispatch(closeModal());
  }
}))(Modal);

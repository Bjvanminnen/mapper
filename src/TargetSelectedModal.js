import React, { Component } from 'react';
import { Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { createTarget } from './redux/targets';
import { closeModal } from './redux/modal';

class TargetSelectedModal extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.createTarget(this.props.currentPosition);
    this.props.closeModal();
  }

  render() {
    return (
      <Button
        title="New Target"
        onPress={this.onPress}
      />
    );
  }
}

export default connect(state => ({
  currentPosition: state.positions.current,
}), dispatch => ({
  createTarget: currentPos => dispatch(createTarget(currentPos)),
  closeModal() {
    dispatch(closeModal());
  }
}))(TargetSelectedModal);

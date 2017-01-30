import React, { Component } from 'react';
import {
  TouchableHighlight,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { setModal } from './redux/modal';

const styles = {
  main: {
    backgroundColor: 'brown',
    position: 'absolute',
    bottom: 10,
    // right: 10,
    left: 10
  },
  text: {
    color: 'white',
    fontSize: 34,
    fontFamily: 'Courier',
    paddingLeft: 5,
    paddingRight: 5,
  }
};

class Toolbelt extends Component {
  constructor(props) {
    super(props);

    this.openInventory = this.openInventory.bind(this);
  }

  openInventory() {
    const { dispatch } = this.props;
    dispatch(setModal('inventory'));
  }

  // Currently just one button, but eventually multiple?
  render() {
    return (
      <TouchableHighlight
        style={styles.main}
        onPress={this.openInventory}
      >
        <Text style={styles.text}>I</Text>
      </TouchableHighlight>
    );
  }
}

export default connect(state => ({
}))(Toolbelt);

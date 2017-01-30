import React, { Component, PropTypes } from 'react';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';

const styles = {
  row: {
    flexDirection:'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Courier',
    fontSize: 20,
    paddingLeft: 5,
    paddingRight: 5
  },
  red: {
    backgroundColor: 'red'
  },
  green: {
    backgroundColor: 'green'
  },
  blue: {
    backgroundColor: 'blue'
  }
};

class Inventory extends Component {
  static propTypes = {
    red: PropTypes.number.isRequired,
    green: PropTypes.number.isRequired,
    blue: PropTypes.number.isRequired,
  };

  render() {
    const { red, green, blue } = this.props;
    return (
      <View>
        <View style={styles.row}>
          <Text style={[styles.text, styles.red]}>
            {red}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, styles.green]}>
            {green}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, styles.blue]}>
            {blue}
          </Text>
        </View>
      </View>
    );
  }
}

export default connect(state => ({
  red: state.inventory.red,
  green: state.inventory.green,
  blue: state.inventory.blue
}))(Inventory);


// <Text>{green} Green</Text>
// <Text>{blue} Blue</Text>

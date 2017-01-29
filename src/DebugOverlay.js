import React, { Component } from 'react';
import { View, Text, PanResponder } from 'react-native';
import { connect } from 'react-redux';
import { distanceDiff } from './distanceUtils';

const SHOW_OVERLAY = false;

const styles = {
  main: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'black'
  },
  expanded: {
    width: 200,
    height: 200
  }
};

class DebugOverlay extends Component {
  static propTypes = {
    distance: React.PropTypes.number.isRequired
  };

  state = {
    left: 5,
    top: 20,
    expanded: false
  }

  constructor(props) {
    super(props);

    this.panResponder = this.configurePanning();
  }

  configurePanning() {
    let start = { x: 0, y: 0, time: 0 };
    return PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => {
        const now = new Date();
        if (now - start.time < 300) {
          this.setState({expanded: !this.state.expanded});
          return false;
        }

        start.x = this.state.left;
        start.y = this.state.top;
        start.time = now;
        return true;
      },
      onPanResponderMove: (e, gestureState) => {
        // console.log('onPanResponderMove', gestureState.moveX, gestureState.moveY);
        this.setState({
          left: start.x + gestureState.dx,
          top: start.y + gestureState.dy
        });
      }
    });
  }

  render() {
    if (!SHOW_OVERLAY) {
      return null;
    }
    const style = [
      styles.main,
      {
        left: this.state.left,
        top: this.state.top,
      },
      this.state.expanded && styles.expanded
    ];

    return (
      <View
        style={style}
        {...this.panResponder.panHandlers}
        onClick={() => console.log('click')}
      >
        <Text>{this.props.distance}</Text>
        <Text>{this.props.currentHeading}</Text>
      </View>
    );
  }
};

function distanceFromTarget(currentPos, targets) {
  const target = targets[0];
  if (!target) {
    return 0;
  }
  return distanceDiff(currentPos, target);
}

export default connect(state => ({
  distance: distanceFromTarget(state.positions.current, state.targets),
  currentHeading: state.positions.heading,
}))(DebugOverlay);

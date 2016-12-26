import React, { Component } from 'react';
import {
  DeviceEventEmitter,
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';
import { RNLocation as Location } from 'NativeModules';
import MapView from 'react-native-maps';
import DebugScreen from './DebugScreen';
import DebugOverlay from './DebugOverlay';
import { connect } from 'react-redux';
import { addPosition, clearPositions } from './redux/visitedPositions';
import { createTarget } from './redux/targets';

Location.requestAlwaysAuthorization();
Location.startUpdatingLocation();

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
  modal: {
    marginTop: 100,
    marginLeft: 20
  },
  modalText: {
    padding: 10
  },
  marker: {
    marginLeft: 46,
    marginTop: 33,
    fontWeight: 'bold',
  },
});

const getColor = (visitedPositions, index) => {
  const last = visitedPositions.length - 1;
  if (index === 0) {
    return 'green';
  }
  if (index === last) {
    return 'red';
  }
  return 'blue';
};

const getText = (visitedPositions, index) => {
  const last = visitedPositions.length - 1;
  if (index === 0) {
    return 'S';
  }
  if (index === last) {
    return 'o';
  }
  return '.';
};

const LatLong = React.PropTypes.shape({
  latitude: React.PropTypes.number.isRequired,
  longitude: React.PropTypes.number.isRequired
});

// TODO - would be nice to add linting that lets me know about undocumented prop types
class NativeMapper extends Component {
  static propTypes = {
    visitedPositions: React.PropTypes.arrayOf(LatLong).isRequired,
    targets: React.PropTypes.arrayOf(LatLong),
    navigator: React.PropTypes.object.isRequired,
    addPosition: React.PropTypes.func.isRequired,
    createTarget: React.PropTypes.func.isRequired
  };

  state = {
    visitedPositions: []
  };

  constructor(props) {
    super(props);

    this.pressDebug = this.pressDebug.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
    this.onPressTarget = this.onPressTarget.bind(this);
  }

  componentDidMount() {
    let lastLocation;
    this.listener = DeviceEventEmitter.addListener('locationUpdated',
      location => {
        const newLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        };

        if (lastLocation && lastLocation.latitude=== newLocation.latitude&&
            lastLocation.long === newLocation.long) {
          return
        }
        lastLocation = newLocation;
        this.props.addPosition(newLocation);
      }
    );
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  pressDebug() {
    this.props.navigator.push({
      back: true,
      component: DebugScreen,
      props: {
        onClear: this.clearMarkers
      }
    });
  }

  onPressTarget() {
    const { visitedPositions, createTarget } = this.props;
    const len = visitedPositions.length;
    console.log(visitedPositions[len - 1]);
    createTarget(visitedPositions[len - 1])
  }

  clearMarkers() {
    console.log('clearing markers');
    this.props.clearPositions();
  }

  render() {
    const { visitedPositions } = this.props;
    if (visitedPositions.length === 0) {
      return null;
    }

    const initialRegion = {
      latitude: visitedPositions[0].latitude,
      longitude: visitedPositions[0].longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
    };

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
        >
          {visitedPositions.map((pos, index) => (
            <MapView.Marker
              key={index}
              title={index.toString()}
              coordinate={pos}
            >
              <Text style={[...styles.marker, {color: getColor(visitedPositions, index)}]}>
                {getText(visitedPositions, index)}
              </Text>
            </MapView.Marker>
          ))}
          {this.props.targets.length > 0 &&
            <MapView.Marker
              key="target"
              coordinate={this.props.targets[0]}
              onPress={this.onPressTarget}
            >
              <Text style={styles.marker}>T</Text>
            </MapView.Marker>
          }
        </MapView>
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

export default connect(state => ({
  visitedPositions: state.visitedPositions,
  targets: state.targets
}), dispatch => ({
  addPosition: ({latitude, longitude}) => dispatch(addPosition({latitude, longitude})),
  clearPositions: () => dispatch(clearPositions()),
  createTarget: currentPos => dispatch(createTarget(currentPos))
}))(NativeMapper);

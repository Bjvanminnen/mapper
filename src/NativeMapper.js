import React, { Component } from 'react';
import {
  DeviceEventEmitter,
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';
import MapView from 'react-native-maps';
import DebugScreen from './DebugScreen';
import DebugOverlay from './DebugOverlay';
import { connect } from 'react-redux';
import { setCurrentPosition } from './redux/positions';
import { createTarget } from './redux/targets';
import TargetMarker from './TargetMarker';
import CurrentMarker from './CurrentMarker';
import Location from 'react-native-location';

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
    fontWeight: 'bold',
  },
  oldMarker: {
    color: 'blue'
  },
  currentMarker: {
    color: 'green'
  }
});

const LatLong = React.PropTypes.shape({
  latitude: React.PropTypes.number.isRequired,
  longitude: React.PropTypes.number.isRequired
});

// TODO - would be nice to add linting that lets me know about undocumented prop types
class NativeMapper extends Component {
  static propTypes = {
    currentPosition: LatLong,
    currentHeading: React.PropTypes.number,
    oldPositions: React.PropTypes.arrayOf(LatLong).isRequired,
    targets: React.PropTypes.arrayOf(LatLong),
    navigator: React.PropTypes.object.isRequired,
    setCurrentPosition: React.PropTypes.func.isRequired,
    createTarget: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.pressDebug = this.pressDebug.bind(this);
  }

  componentWillMount() {
    Location.requestAlwaysAuthorization();
    Location.startUpdatingLocation();
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
        this.props.setCurrentPosition(newLocation, location.coords.course);
      }
    );
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  componentDidUpdate() {
    const { currentPosition, targets, createTarget } = this.props;
    if (currentPosition && targets.length === 0) {
      createTarget(currentPosition);
    }
  }

  pressDebug() {
    this.props.navigator.push({
      back: true,
      component: DebugScreen,
    });
  }

  render() {
    const { currentPosition, currentHeading, oldPositions } = this.props;
    if (!currentPosition) {
      return null;
    }

    const initialRegion = {
      latitude: currentPosition.latitude,
      longitude: currentPosition.longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
    };

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          showsPointsOfInterest={false}
          showsBuildings={false}
          showsTraffic={false}
          showsIndoors={false}
          pitchEnabled={false}
        >
          {oldPositions.map((pos, index) => (
            <MapView.Marker
              key={index}
              title={index.toString()}
              coordinate={pos}
            >
              <Text style={[styles.marker, styles.oldMarker]}>
                .
              </Text>
            </MapView.Marker>
          ))}
          <CurrentMarker
            pos={currentPosition}
            heading={currentHeading}
          />
          <TargetMarker/>
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
  currentPosition: state.positions.current,
  currentHeading: state.positions.heading,
  oldPositions: state.positions.historical,
  targets: state.targets
}), dispatch => ({
  setCurrentPosition: ({latitude, longitude}, course) => dispatch(setCurrentPosition({latitude, longitude}, course)),
  createTarget: currentPos => dispatch(createTarget(currentPos))
}))(NativeMapper);

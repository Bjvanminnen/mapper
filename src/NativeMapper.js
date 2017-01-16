import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { createTarget } from './redux/targets';
import TargetMarker from './TargetMarker';
import CurrentMarker from './CurrentMarker';
import createGrid from './createGrid';

const styles = StyleSheet.create({
  map: {
    flex: 1
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
    createTarget: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.onRegionChange = this.onRegionChange.bind(this);
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
  }

  componentDidUpdate() {
    const { currentPosition, targets, createTarget } = this.props;
    if (currentPosition && targets.length === 0) {
      createTarget(currentPosition);
    }
  }

  onRegionChange(newLoc) {
  }

  onRegionChangeComplete(newLoc) {
  }

  render() {
    const { currentPosition, currentHeading, oldPositions } = this.props;
    if (!currentPosition) {
      return null;
    }

    // TODO - overlay image on top of map (perhaps semi opaque?)
    // TODO - fog of war?
    const initialRegion = {
      latitude: currentPosition.latitude,
      longitude: currentPosition.longitude,
      // latitudeDelta will ultimately get set to set something else under the
      // covers
      // TODO - at 0.008 map initially loads with all of USA zoomed for some reason
      latitudeDelta: 0.004,
      longitudeDelta: 0.004 ,
    };

    // TODO - validate "followsUserLocation" at some point (doesnt seem to work like i expect)
    return (
      <MapView
        style={styles.map}
        region={initialRegion}
        followsUserLocation={false}
        showsPointsOfInterest={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
        pitchEnabled={false}
        scrollEnabled={false}
        rotateEnabled={false}
        zoomEnabled={false}
        onRegionChange={this.onRegionChange}
        onRegionChangeComplete={this.onRegionChangeComplete}
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
        {createGrid(currentPosition)}
      </MapView>
    );
  }
}

export default connect(state => ({
  currentPosition: state.positions.current,
  currentHeading: state.positions.heading,
  oldPositions: state.positions.historical,
  targets: state.targets
}), dispatch => ({
  createTarget: currentPos => dispatch(createTarget(currentPos))
}))(NativeMapper);

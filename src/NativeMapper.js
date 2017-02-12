import React, { Component } from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { addOrb, closeOrb } from './redux/orbs';
import { OrbType } from './orb';
import { addItem } from './redux/inventory';
import OrbMarker from './OrbMarker';
import CurrentMarker from './CurrentMarker';
import createGrid from './createGrid';
import { destinationPoint } from './distanceUtils';
import generateOrbs from './generateOrbs';
import { getRandomOrbs } from './orb';

const SHOW_OLD_POSITIONS = false;

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
    orbs: React.PropTypes.array.isRequired, // TODO

    addOrb: React.PropTypes.func.isRequired,
    closeOrb: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    const { currentPosition, addOrb, orbs } = this.props;
    const types = Object.keys(OrbType);
    if (currentPosition && orbs.length === 0) {
      const orbs = getRandomOrbs(currentPosition.latitude, currentPosition.longitude, new Date(), 40);
      // TODO - generate more orbs as we cross boundaries
      // const orbs = generateOrbs(currentPosition.latitude, currentPosition.longitude, 40);
      orbs.forEach(orb => addOrb(orb));
    }
  }

  render() {
    const { currentPosition, currentHeading, oldPositions, orbs, closeOrb } = this.props;
    if (!currentPosition) {
      return null;
    }

    const region = {
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
        region={region}
        followsUserLocation={true}
        showsPointsOfInterest={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
        pitchEnabled={false}
        scrollEnabled={false}
        rotateEnabled={false}
        zoomEnabled={false}
        minCameraDistance={500}
        maxCameraDistance={2000}
      >
        {SHOW_OLD_POSITIONS && oldPositions.map((pos, index) => (
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
        {orbs.map((orb, index) => (
          !orb.visited && <OrbMarker
            key={orb.id}
            userPosition={currentPosition}
            orb={orb}
            closeOrb={closeOrb.bind(this, orb)}
          />
        ))}
        {/*createGrid(currentPosition)*/}
      </MapView>
    );
  }
}

export default connect(state => ({
  currentPosition: state.positions.current,
  currentHeading: state.positions.heading,
  oldPositions: state.positions.historical,
  orbs: state.orbs.toJS()
}), dispatch => ({
  addOrb(lat, long, orbType) {
    dispatch(addOrb(lat, long, orbType));
  },
  closeOrb(orb) {
    dispatch(closeOrb(orb.id));
    dispatch(addItem(orb.orbType.toLowerCase()));
  }
}))(NativeMapper);

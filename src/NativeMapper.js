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

Location.requestAlwaysAuthorization();
Location.startUpdatingLocation();

export default class NativeMapper extends Component {
  state = {
    positions: []
  };

  constructor(props) {
    super(props);

    this.pressDebug = this.pressDebug.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
  }

  componentDidMount() {
    this.listener = DeviceEventEmitter.addListener('locationUpdated',
      location => {
        this.setState({
          positions: this.state.positions.concat(location.coords)
        });
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

  clearMarkers() {
    console.log('clearing markers');
    this.setState({
      positions: [this.state.positions[this.state.positions.length - 1]]
    });
  }

  render() {
    if (this.state.positions.length === 0) {
      return null;
    }

    const initialRegion = {
      latitude: this.state.positions[0].latitude,
      longitude: this.state.positions[0].longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
        >
          {this.state.positions.map((pos, index) => (
            <MapView.Marker
              key={index}
              title={index.toString()}
              pinColor={index === this.state.positions.length - 1 ? 'green' : 'blue'}
              coordinate={{
                latitude: pos.latitude,
                longitude: pos.longitude
              }}
            />
          ))}
        </MapView>
        <Button
          onPress={this.pressDebug}
          title="Debug"
          backgroundColor="blue"
        />
      </View>
    );
  }
}

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
  }
});

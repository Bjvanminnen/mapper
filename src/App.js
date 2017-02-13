import React, { Component } from 'react';
import { Navigator } from 'react-native';
import MapScreen from './MapScreen';
import { NavigatorBar, renderScene } from './navigator';
import getStore from './redux/getStore';
import { Provider } from 'react-redux';
import { bindDistanceFilter } from './redux/distance';
import { bindCurrentTime } from './redux/time';

// Things TODO
// Look at speed (behave differently if we think you're driving, etc)
// Map follows player indicator?
// Write tests

const initialRoute = {
  component: MapScreen,
  props: {}
};

const store = getStore();
bindDistanceFilter();
bindCurrentTime();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={initialRoute}
          renderScene={renderScene}
          configureScene={() => Navigator.SceneConfigs.FadeAndroid}
          style={{marginTop: 20}}
        />
      </Provider>
    );
  }
}

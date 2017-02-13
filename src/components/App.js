import React, { Component } from 'react';
import { Navigator } from 'react-native';
import { Provider } from 'react-redux';
import MapScreen from './MapScreen';
import { NavigatorBar, renderScene } from '../navigator';
import getStore from '../redux/getStore';
import { start as startServices } from '../services';

// Things TODO
// Look at speed (behave differently if we think you're driving, etc)
// Map follows player indicator?
// Write tests

const initialRoute = {
  component: MapScreen,
  props: {}
};

const store = getStore();
startServices(store);

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

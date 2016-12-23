import React, { Component } from 'react';
import { Navigator } from 'react-native';
import NativeMapper from './NativeMapper';
import { NavigatorBar, renderScene } from './navigator';
import getStore from './redux/getStore';
import { Provider } from 'react-redux';
import { bindDistanceFilter } from './redux/distance';

const initialRoute = {
  component: NativeMapper,
  props: {}
};

const store = getStore();
bindDistanceFilter();

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

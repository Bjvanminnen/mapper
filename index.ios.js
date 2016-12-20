/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import Html5Mapper from './src/Html5Mapper';
import NativeMapper from './src/NativeMapper';

export default class mapper extends Component {
  render() {
    // return <Html5Mapper/>;
    return <NativeMapper/>
  }
}

AppRegistry.registerComponent('mapper', () => mapper);

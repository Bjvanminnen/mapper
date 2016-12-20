import React, { Component } from 'react';
import { Navigator, TouchableHighlight, View, Text } from 'react-native';
import NativeMapper from './NativeMapper';

const styles = {
  navBar: {
    paddingTop: 5,
    paddingBottom: 5
  }
};

const NavigationBar = ({route, navigator}) => {
  if (!route.back) {
    return null;
  }

  return (
    <View style={styles.navBar}>
      <TouchableHighlight onPress={() => navigator.pop()}>
        <Text>
          {"< Back"}
        </Text>
      </TouchableHighlight>
    </View>
  );
};

function renderScene(route, navigator) {
  return (
    <View style={{flex: 1}}>
      <NavigationBar route={route} navigator={navigator}/>
      <route.item navigator={navigator}/>
    </View>
  );
}

const initialRoute = {
  item: NativeMapper
};

export default class App extends Component {
  render() {
    return (
      <Navigator
        initialRoute={initialRoute}
        renderScene={renderScene}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        style={{marginTop: 20}}
      />
    );
  }
}

import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';

const styles = {
  navBar: {
    paddingTop: 5,
    paddingBottom: 5
  },
  navText: {
    fontSize: 30
  }
};


export const NavigationBar = ({route, navigator}) => {
  if (!route.back) {
    return null;
  }

  return (
    <View style={styles.navBar}>
      <TouchableHighlight onPress={() => navigator.pop()}>
        <Text style={styles.navText}>
          {"< Back"}
        </Text>
      </TouchableHighlight>
    </View>
  );
};

export function renderScene(route, navigator) {
  return (
    <View style={{flex: 1}}>
      <NavigationBar route={route} navigator={navigator}/>
      <route.component {...route.props} navigator={navigator}/>
    </View>
  );
}

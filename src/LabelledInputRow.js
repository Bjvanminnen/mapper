import React, { Component } from 'react';
import { View, Text, Picker, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';

const styles = {
  input: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    fontSize: 13,
    padding: 4,
    width: 30
  },
  label: {
    width: 115,
    alignItems: 'flex-end',
    marginRight: 10,
    paddingTop: 2
  },
  labelText: {
    fontSize: 20
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 2,
    marginRight: 5
  }
};

export default class LabelledNumberInput extends React.Component {
  static propTypes = {
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func
  };

  constructor(props) {
    super(props);

    this.onEndEditing = this.onEndEditing.bind(this);
  }

  onEndEditing(event) {
    if (this.props.onChange) {
      this.props.onChange(event.nativeEvent.text);
    }
  }

  render() {
    const { label } = this.props;
    return (
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.label}>
            <Text style={styles.labelText}>
              {label}
            </Text>
          </View>
          <TextInput
            onEndEditing={this.onEndEditing}
            defaultValue="1"
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
      </ScrollView>
    );
  }
}

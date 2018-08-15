import React from 'react';
import { StyleSheet , Text, ScrollView,  Button, View, TouchableOpacity, TextInput} from 'react-native';
import ActionButton from 'react-native-action-button';
import { Icon, CheckBox } from 'react-native-elements';


export default class ActionButtonAdd extends React.Component {
  render() {
    return (
        <ActionButton
          buttonColor="#FF6A4A"
          position="right"
          offsetX={101}
          onPress={this.props.onPress}
        >
        </ActionButton>
    );
  }
}

const styles = StyleSheet.create({

});

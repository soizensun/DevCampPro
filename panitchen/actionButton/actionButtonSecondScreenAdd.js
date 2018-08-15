import React from 'react';
import { StyleSheet , Text, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements' // https://react-native-training.github.io/react-native-elements/docs/icon.html
                                            // https://oblador.github.io/react-native-vector-icons/
export default class actionButton extends React.Component {
  render() {
    return (
        <ActionButton
          buttonColor= "#FF6A4A"
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

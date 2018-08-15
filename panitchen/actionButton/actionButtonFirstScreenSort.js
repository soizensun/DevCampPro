import React from 'react';
import { StyleSheet , Text } from 'react-native';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements' // https://react-native-training.github.io/react-native-elements/docs/icon.html
                                            // https://oblador.github.io/react-native-vector-icons/
export default class actionButton extends React.Component {
  render() {
    return (
        <ActionButton buttonColor="#1ABC9C" renderIcon={(active) => (<Icon type='simple-line-icon'
                      type='font-awesome' name='sort' color='white' />)} degrees={0}
        >
          <ActionButton.Item buttonColor='#F4D03F' title="by almost depleted" onPress={() => console.log("New")}>
            <Icon type='font-awesome' name='sort-amount-asc' color='black' />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#F4D03F' title="by category" onPress={() => console.log("Not")}>
            <Icon type='material-community' name='shape' color='black' />
          </ActionButton.Item>

        </ActionButton>
    );
  }
}

const styles = StyleSheet.create({

});

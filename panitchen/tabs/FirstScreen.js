import React from 'react';
import {Text, View, Button, Image, StyleSheet} from 'react-native';
import ActionButtonAdd from '../actionButton/actionButtonFirstScreenAdd';
import ActionButtonSort from '../actionButton/actionButtonFirstScreenSort';
import Stock from './Stock';
import AddStock from './AddStock';
import { createStackNavigator } from 'react-navigation';

export default class FirstScreen extends React.Component{
  static navigationOptions = {
    tabBarLabel:'STOCK',
  }

  render(){
    return (
      <View style={styles.container}>
        <Stock/>
        <ActionButtonAdd onPress={() => this.props.navigation.navigate('AddStock')} />
        <ActionButtonSort/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  }
})

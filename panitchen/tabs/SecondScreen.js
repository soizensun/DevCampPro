import React from 'react';
import {Text, View, Button, Image} from 'react-native';
import Stock from './Stock';
import Menu from './Menu';
import ActionButtonAdd from '../actionButton/actionButtonSecondScreenAdd';
import ActionButtonSort from '../actionButton/actionButtonSecondScreenSort';

export default class SecondScreen extends React.Component{
  static navigationOptions = {
    tabBarLabel:'MENU',
  }
  render(){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',}}>
        <Menu/>
        <ActionButtonAdd onPress={() => this.props.navigation.navigate('AddStock')} />
        <ActionButtonSort/>
      </View>
    );
  }
}

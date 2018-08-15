import React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from "react-navigation";
import FirstScreen from './tabs/FirstScreen' ;
import SecondScreen from './tabs/SecondScreen';
import ThirdScreen from './tabs/ThirdScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddStock from './tabs/AddStock'
import AddMenu from './tabs/AddMenu'

const StackRoot = createStackNavigator({
  First: FirstScreen,
  AddStock: AddStock,
})
const StackRoot1 = createStackNavigator({
  Second: SecondScreen,
  AddStock: AddMenu,
})

var MainScreenNavigator = createBottomTabNavigator({
  STOCK: StackRoot,
  MENU: StackRoot1,
  Tab3: ThirdScreen,

}, {
 tabBarPosition: 'bottom', // Where is the bar set at.
 swipeEnabled: false, // Make it swipeable,
 tabBarOptions: {
   actionTintColor: 'black',
   // actionBackgroundColor: 'orange',
   inactiveTintColor: 'white',
   inactiveBackgroundColor: "#FF6A4A",
   labelStyle: {
     fontSize: 16,
     paddingBottom: 11,
   }
 }
}
);

MainScreenNavigator.navigationOptions = {
  title: "Tab example"
};

export default class App extends React.Component {
  render() {
    return <MainScreenNavigator />
  }
}

import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView, ActivityIndicator, Button  } from 'react-native';
import axios from 'axios';
import { CheckBox, Card } from 'react-native-elements';


export default class Menu extends Component {
  constructor(){
    super();
    this.state = {
      menu_: [],
      ingredient_: [],
      unit_: [],
    };
  }

  componentDidMount() {
    axios.get('http://192.168.1.103:2403/menu')
    .then(response => {this.setState( {menu_: response.data} )})

    axios.get('http://192.168.1.103:2403/ingredient')
    .then(response => { this.setState({ ingredient_: response.data })})

    axios.get('http://192.168.1.103:2403/unit')
    .then(response => { this.setState({ unit_: response.data })})

  }

  createCard = (obj) =>
  {
    return (
      <Card
        title = {obj.nameMenu}
      >
      <View>
        <ScrollView>
          <View style={{ flexDirection: 'row'}}>
            <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
              {this.state.ingredient_.filter( ingd => {
                if (ingd.idMenu === obj.id){
                  return true
                }
              }).map( name => <Text>{name.nameIngredient}</Text>)}
            </View>
            <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
              {this.state.ingredient_.filter( ingd => {
                if (ingd.idMenu === obj.id){
                  return true
                }
              }).map( used => <Text>{used.usedIngredient}</Text>)}
            </View>
          </View>
        </ScrollView>
      </View>


    <Button
    bac kgroundColor='#03A9F4'
    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
    title='DONE' />
  </Card>
    );
  }

    render () {
      return (
        <View style={styles.MainContainer}>
          <ScrollView>
            {this.state.menu_.map( (objM) => this.createCard(objM) )}
          </ScrollView>
        </View>

      );
    }
}
const styles = StyleSheet.create({
  MainContainer:
  {
    flexDirection: 'column',
    width: '100%',
    paddingLeft: 0,
    marginLeft:0,
    flex: 1,
    backgroundColor:'#7FB3D5',
  },

});

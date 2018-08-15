import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

export default class Stock extends Component {
  constructor(){
    super();
    this.state = {
      stocks: [],
      units: [],

      Meats: [],
      Vegts: [],
      Grans: []
    };
  }
  componentDidMount() {
    axios.get('http://192.168.1.103:2403/unit')
    .then(response => {this.setState( {units: response.data} )})

    axios.get('http://192.168.1.103:2403/stock')
    .then(response => { this.setState({ stocks: response.data })})
    .then( (res) =>  {
      const array1 = this.state.stocks.filter(data => {
      if(data.idCategory === "15deaff42b9588c8"){
        return true
      }
    }).map(data => (data.nameStock + '       ' + data.amountStock + '     ' + this.state.units.find( item => (item.id === data.idUnit)).nameUnit))
    this.setState( {Meats: array1} )

    const array2 = this.state.stocks.filter(data => {
      if(data.idCategory === "8e5c9b15a23b6870"){
        return true
      }
    }).map(data => (data.nameStock + '       ' + data.amountStock + '     ' + this.state.units.find( item => (item.id === data.idUnit)).nameUnit))
    this.setState( {Vegts: array2} )

    const array3 = this.state.stocks.filter(data => {
      if(data.idCategory === "db6635c3f18469cd"){
        return true
      }
    }).map(data => (data.nameStock + '       ' + data.amountStock + '     ' + this.state.units.find( item => (item.id === data.idUnit)).nameUnit))
    this.setState( {Grans: array3} )
  }
  )
  }
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            {title: 'เนื้อสัตว์', data: this.state.Meats},
            {title: 'ผัก,ผลไม้', data: this.state.Vegts},
            {title: 'เครื่องปรุง', data: this.state.Grans},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width: '100%',
    paddingTop: 10,
    borderColor: '#1ABC9C',
    borderWidth: 5
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'rgba(26, 188, 156,0.2)',
  },
  item: {
    padding: 10,
    fontSize: 15,
    height: 44,
  },
})

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => SectionListBasics);

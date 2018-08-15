import React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView, ActivityIndicator  } from 'react-native';
import axios from 'axios';
import { CheckBox } from 'react-native-elements';

export default class AppStock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nameStock_: '',
      amountStock_: '',
      idUnit_: '',
      warnStock_: '',
      idCategory_: '',

      checkedUnitGram: false,
      checkedUnitHand: false,
      checkedUnitPiece: false,
      checkedUnitMLite: false,
      checkedCateMeat: false,
      checkedCateVegt: false,
      checkedCateGarn: false,
      ActivityIndicator_Loading: false,
    }
  }

  insertData = () => {
    this.setState({ ActivityIndicator_Loading : true }, () => {
      axios.post( 'http://192.168.1.103:2403/stock',{
        idUser: "17933f3d86f9a8ee",
        nameStock: this.state.nameStock_,
        amountStock: this.state.amountStock_,
        idUnit: this.state.idUnit_,
        warnStock: this.state.warnStock_,
        idCategory: this.state.idCategory_,
      })
      .then( (response) => { alert("SUCCESS");
                             this.setState({ ActivityIndicator_Loading : false });
                           }
           )
      .catch( (error) => { alert("กรุณาใส่ให้ครบทุกช่อง"); console.error(error);
                           this.setState({ ActivityIndicator_Loading : false});
                         }
            )
    });
  };

  render() {
   return (
      <View style={styles.MainContainer}>
      <ScrollView>
       <View style={styles.Container}>
         <Text style={{fontSize:15, color: 'white'}}> ชื่อวัตถุดิบ : </Text>
         <TextInput
           placeholder = "ex: เนื้อหมู, ปลา, นำ้มัน"
           style = {styles.Textinput}
           onChangeText = {(name) => this.setState({ nameStock_: name })}
         />
       </View>

       <View style={styles.Container}>
         <Text style={{fontSize:15, color: 'white'}}> จำนวน : </Text>
         <TextInput
           placeholder = "ex: 3, 5, 19"
           style = {styles.Textinput}
           onChangeText = {(amount) => this.setState({ amountStock_: amount })}
         />
       </View>

       <View style={styles.Choice}>
         <Text style={{fontSize:15, marginLeft: 4, color: 'white'}} >หน่วย :</Text>
         <CheckBox
           center
           textStyle = {{color:'#ff6a4a'}}
           title='กรัม'
           checked={this.state.checkedUnitGram}
           onPress = {() => this.setState({ checkedUnitGram: !this.state.checkedUnitGram,
                                            checkedUnitHand: false,
                                            checkedUnitPiece: false,
                                            checkedUnitMLite: false,
                                            idUnit_: 'e0a16e52b15c2a83'
                                         })}  />
         <CheckBox
           center
           textStyle = {{color:'#ff6a4a'}}
           title='กำมือ'
           checked={this.state.checkedUnitHand}
           onPress = {() => this.setState({ checkedUnitGram: false,
                                            checkedUnitHand: !this.state.checkedUnitHand,
                                            checkedUnitPiece: false,
                                            checkedUnitMLite: false,
                                            idUnit_: '626e7d72f3a1e89b'
                                         })}  />
         <CheckBox
           center
           textStyle = {{color:'#ff6a4a'}}
           title='ชิ้น'
           checked={this.state.checkedUnitPiece}
           onPress = {() => this.setState({ checkedUnitGram: false,
                                            checkedUnitHand: false,
                                            checkedUnitPiece: !this.state.checkedUnitPiece,
                                            checkedUnitMLite: false,
                                            idUnit_: '9c17eb9958befb95'
                                         })}  />
         <CheckBox
           center
           textStyle = {{color:'#ff6a4a'}}
           title='มิลลิลิตร'
           checked={this.state.checkedUnitMLite}
           onPress = {() => this.setState({ checkedUnitGram: false,
                                            checkedUnitHand: false,
                                            checkedUnitPiece: false,
                                            checkedUnitMLite: !this.state.checkedUnitMLite,
                                            idUnit_: '15c415bb641bd867'
                                         })}  />
                                       </View>

       <View style={styles.Container}>
       <Text style={{fontSize:15, color: 'white'}}> เตือนเมื่อเหลือจำนวน : </Text>
         <TextInput
           placeholder = "ex: 50, 300, 2"
           style = {styles.Textinput}
           onChangeText = {(warn) => this.setState({ warnStock_: warn })}
         />
       </View>

       <View style={styles.Choice}>
         <Text style={{fontSize:15, marginLeft: 4, color: 'white'}} >ประเภท :</Text>
         <CheckBox
           center
           textStyle = {{color:'#ff6a4a'}}
           title='เนื้อสัตว์'
           checked={this.state.checkedCateMeat}
           onPress = {() => this.setState({ checkedCateMeat: !this.state.checkedCateMeat,
                                            checkedCateVegt: false,
                                            checkedCateGarn: false,
                                            idCategory_: '15deaff42b9588c8'
                                         })}
         />
         <CheckBox
           center
           textStyle = {{color:'#ff6a4a'}}
           title='ผัก,ผลไม้'
           checked={this.state.checkedCateVegt}
           onPress = {() => this.setState({ checkedCateMeat: false,
                                            checkedCateVegt: !this.state.checkedCateVegt,
                                            checkedCateGarn: false,
                                            idCategory_: '8e5c9b15a23b6870'
                                         })}
         />
         <CheckBox
           center
           textStyle = {{color:'#ff6a4a'}}
           title='เครื่องปรุง'
           checked={this.state.checkedCateGarn}
           onPress = {() => this.setState({ checkedCateMeat: false,
                                            checkedCateVegt: false,
                                            checkedCateGarn: !this.state.checkedCateGarn,
                                            idCategory_: 'db6635c3f18469cd'
                                         })}
         />
       </View>

       {
         this.state.ActivityIndicator_Loading ?
         <ActivityIndicator color='#009688' size='large' style={styles.ActivityIndicatorStyle} /> : null
       }
       </ScrollView>
       <View style={{alignItems: 'center', paddingTop: 7}}>
         <TouchableOpacity
           activeOpacity = { 0.5 }
           style = { styles.TouchableOpacityStyle }
           onPress = { this.insertData }
         >
             <Text style = {styles.TextStyle}>ADD</Text>
         </TouchableOpacity>
       </View>
     </View>
   );
 }
}

const styles = StyleSheet.create({
  MainContainer:
  {
    flexDirection: 'column',
    paddingTop: 0,
    flex: 1,
    backgroundColor:'#79a156',
  },
  Container:
  {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#79a156',
  },
  Choice:
  {
    flexDirection: 'column',
    padding: 5,
    backgroundColor:'#79a156',
  },
  TouchableOpacityStyle:
  {
    borderRadius: 10,
    flexDirection: 'row',
    height: 50,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgb(226, 193, 20)',
    width: '80%'
  },
  TextStyle:
  {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18
  },
  Textinput:
  {
    flexDirection: 'column',
    textAlign: 'center',
    height: 40,
    flex: 1,
    marginRight: 19,
    backgroundColor : "#fff",
    borderWidth: 1,
    borderColor: '#79a156',
    borderRadius: 7 ,
  },
  ActivityIndicatorStyle:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'

  }
});

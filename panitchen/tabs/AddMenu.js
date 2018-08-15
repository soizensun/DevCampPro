import React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView, ActivityIndicator  } from 'react-native';
import axios from 'axios';
import { CheckBox } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';

export default class AppStock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      idUser_: '0afa7318d3d5bb03',
      nameMenu_: '',
      idUnitM_: '',

      idMenu_: '',
      nameIngredient_: '',
      usedIngredient_: '',
      idUnitI_: 'dfdf',
      ingredientArr: [],


      checkedMain: false,
      checkedSweet: false,
      checkedDrink: false,

      ActivityIndicator_Loading: false,

      textInput : [],
      temp: [],
      text: ''

    }
  }
  addTextInput = (key) => {
   let textInput_ = this.state.textInput;
   let data = [{value: 'กรัม'}, {value: 'กำมือ'}, {value: 'ชิ้น'}, {value: 'มิลลิลิตร'}];
   var ingredientObj = {
     nameIngredient : '',
     usedIngredient: '',
     idUnitI : 0,
   };
    textInput_.push(
      <View>
            <View style={styles.Container}>
              <Text style={{fontSize:15, color: 'white'}}> ชื่อวัตถุดิบ : </Text>
              <TextInput
                placeholder = "ex: หมูสับ, กระเทียม"
                style = {styles.Textinput}
                onChangeText = {(name) => {ingredientObj.nameIngredient = name;}}
              />
            </View>
            <View style={styles.Container}>
              <Text style={{fontSize:15, color: 'white'}}> จำนวน : </Text>
              <TextInput
                placeholder = "ex: 3, 7"
                style = {styles.Textinput}
                onChangeText = {(number) => { ingredientObj.usedIngredient = number;}}
              />
            </View>
            <View style = {styles.Dropdown}>
              <Dropdown
                 label='หน่วย'
                 data = {data}
                 baseColor = 'white'
                 onChangeText = {(value, index, data) => {ingredientObj.idUnitI = index;}}
              />
            </View>
      </View>
    );
    this.state.ingredientArr.push(ingredientObj);
    this.setState({ textInput_ });
    this.state.temp.push(this.state.text);
  }

  insertData = () =>
  {
    this.setState({ ActivityIndicator_Loading : true }, () =>
    {
      axios.post( 'http://192.168.1.103:2403/menu',{
        idUser: this.state.idUser_,
        nameMenu: this.state.nameMenu_,
        idUnitM: this.state.idUnitM_,
      })
      .then( (response) =>
      {
        this.setState( {idMenu_: response.data.id} );
        this.state.ingredientArr.map((ingr) => {
          idUnitI_ = "";
          if(ingr.idUnitI == '0')
            idUnitI_ = '1a0848c23195aa5c'
          else if(ingr.idUnitI == '1')
            idUnitI_ = 'd6ddecb866b2d8e8'
          else if(ingr.idUnitI == '2')
            idUnitI_ = 'a29712c94212781a'
          console.log('ingr : '+ingr);
          console.log('idMenu : '+ingr.idMenu);
          console.log('nameIngredient : '+ingr.nameIngredient);
          console.log('usedIngredient : '+ingr.usedIngredient);
          console.log('idUnitI_ : ' +idUnitI_);

          axios.post( 'http://192.168.1.103:2403/ingredient',{
            idMenu: this.state.idMenu_,
            nameIngredient: ingr.nameIngredient ,
            usedIngredient: ingr.usedIngredient,
            idUnitI: idUnitI_,
          })
          .catch( (error) => { alert("FAIL2"); console.error(error);
                               this.setState({ ActivityIndicator_Loading : false});
                             }
                )
        })
        alert("SUCCESS");
        this.setState({ ActivityIndicator_Loading : false });
      })
      .catch( (error) => { alert("FAIL1"); console.error(error);
                           this.setState({ ActivityIndicator_Loading : false});
                         }
            )
    })
  }

  render() {
   return (
      <View style={styles.MainContainer}>
      <ScrollView>
       <View style={styles.Container}>
         <Text style={{fontSize:15, color: 'white'}}> ชื่อเมนูอาหาร : </Text>
         <TextInput
           placeholder = "ชื่อเมนู ex: ผัดกระเพรา ปลานึ่ง"
           style = {styles.Textinput}
           onChangeText = {(name) => this.setState({ nameMenu_: name })}
         />
       </View>


       <View style={styles.Choice}>
         <Text style={{fontSize:15, marginLeft: 4, color: 'white'}} >ประเภทของอาหาร :</Text>
         <CheckBox
           center
           textStyle = {{color:'#ff6a4a'}}
           title='อาหารคาว'
           checked={this.state.checkedMain}
           onPress = {() => this.setState({ checkedMain: !this.state.checkedMain,
                                            checkedSweet: false,
                                            checkedDrink: false,
                                            idUnitM_: '1a0848c23195aa5c',
                                         })}
         />
         <CheckBox
           center
           textStyle = {{color:'#ff6a4a'}}
           title='อาหารหวาน'
           checked={this.state.checkedSweet}
           onPress = {() => this.setState({ checkedMain: false,
                                            checkedSweet: !this.state.checkedSweet,
                                            checkedDrink: false,
                                            idUnitM_: 'd6ddecb866b2d8e8',
                                         })}
         />
         <CheckBox
           center
           textStyle = {{color:'#ff6a4a'}}
           title='เครื่องดื่ม'
           checked={this.state.checkedDrink}
           onPress = {() => this.setState({ checkedMain: false,
                                            checkedSweet: false,
                                            checkedDrink: !this.state.checkedDrink,
                                            idUnitM_: 'a29712c94212781a',
                                         })}
         />
       </View>

       {
        this.state.textInput.map((value, index) => {
         return value
       })}

       <View style = {styles.AddButton}>
         <TouchableOpacity
           activeOpacity = { 0.5 }
           style = { styles.TouchableOpacityStyleAdd }
           onPress={() => this.addTextInput(this.state.textInput.length)}
         >
             <Text style = { styles.TextStyleAdd } >
             +
             </Text>
         </TouchableOpacity>
       </View>

       {
         this.state.ActivityIndicator_Loading ?
         <ActivityIndicator color='#009688' size='large' style={styles.ActivityIndicatorStyle} /> : null
       }
       </ScrollView>
       <View style={{alignItems: 'center'}}>
         <TouchableOpacity
           activeOpacity = { 0.5 }
           style = { styles.TouchableOpacityStyle }
           onPress = { this.insertData }
         >
             <Text style = { styles.TextStyle }>ADD</Text>
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
    backgroundColor:'#35708c',
  },
  Container:
  {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#35708c',
  },
  Choice:
  {
    flexDirection: 'column',
    padding: 5,
    backgroundColor:'#35708c',
  },
  TouchableOpacityStyle:
  {
    flexDirection: 'row',
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'#28b463',
    // width: '40%',
    borderRadius: 10,
    backgroundColor:'rgb(226, 193, 20)',
    width: '80%'
  },
  TouchableOpacityStyleAdd:
  {
    flexDirection: 'column',
    height: 50,
    borderRadius: 30,
    marginBottom: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'pink',
    width: 50

  },
  AddButton:
  {
    backgroundColor: '#35708c',
    alignItems: 'center',

  },
  TextStyle:
  {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  TextStyleAdd:
  {
    color: '#fff',
    textAlign: 'center',
    fontSize: 30,

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
    borderColor: '#35708c',
    borderRadius: 7 ,
  },
  Textinput1:
  {
    flexDirection: 'column',
    textAlign: 'center',
    height: 40,
    flex: 1,
    marginRight: 1,
    backgroundColor : "#fff",
    borderWidth: 1,
    borderColor: '#35708c',
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
  },
  Dropdown:{
    // backgroundColor: '#35708c',
    color: 'white',
    padding: 25,
    paddingTop: 0,
  }
});

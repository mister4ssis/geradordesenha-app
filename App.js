/*
TODO: Alterar Fonte da senha conforme for aumentando o numero de caracteres
TODO: Gerar senha conforme informaçoes selecionadas pelo usuario
TODO: Ajustar barra de força
*/
import Slider from '@react-native-community/slider';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, Touchable, TouchableOpacity, View} from 'react-native';
import {Feather} from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard';


export default function App() {
  const [password, setPassword] = useState('asjbasbjabjsj#jbfjdfj');
  const [strongOfPassword, setStrongOfPassword] = useState(0);
  const [numbersOfChars, setNumbersOfChars] = useState(14);
  const [charsPasswordCheckboxes, setCharsPasswordCheckboxes] = useState([
    { id: 'upperCaseChars', value: false, label: 'Letras Maiusculas (ABC)' },
    { id: 'lowerCaseChars', value: false, label: 'Letras Minusculas (abc)' },
    { id: 'numberChars', value: false, label: 'Numeros (123)' },
    { id: 'specialChars', value: false, label: 'Caracteres Especiais(.+-[]*~_@#:?)' }
  ]);
  const [backgroundColorStrongBar, setBackgroundColorStrongBar] = useState('')
  const allCharsToPassword = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.+-[]*~_@#:?"

    useEffect(() => {
      generatePassword()
    }, [numbersOfChars, charsPasswordCheckboxes])
    useEffect(()=> {
      checkStrongOfPassword()
    }, [password])
    useEffect(() => {
        onChangeBackgroundColor()
    }, [strongOfPassword])
    const generatePassword = () => {
      var finalPassword = ''
      for (let index = 0; index < numbersOfChars; index++) {

        var randomNumber = Math.floor(Math.random() * allCharsToPassword.length);
        finalPassword += allCharsToPassword.substring(randomNumber, randomNumber + 1);
        // console.log(charsToCreatePassword.charAt(Math.floor(Math.random() * charsToCreatePasswordLength)));
        // finalPassword += charsToCreatePassword.charAt(Math.floor(Math.random() * charsToCreatePasswordLength));
    }
        setPassword(finalPassword)
    };
  const checkStrongOfPassword = () => {
    var forca = 0
    if((password.length >= 4) && (password.length <= 7)){
      forca += 15;
    }else if(password.length > 7){
      forca += 30;
    }
  
    if((password.length >= 5) && (password.match(/[a-z]+/))){
      forca += 10;
    }
  
    if((password.length >= 6) && (password.match(/[A-Z]+/))){
      forca += 20;
    }
  
    if((password.length >= 7) && (password.match(/[@#$%&;*]/))){
      forca += 40;
    }
  
    if(password.match(/([1-9]+)\1{1,}/)){
      forca += -25;
    }

    setStrongOfPassword(forca)
  }
  const onChangeBackgroundColor = () => {
    console.log(strongOfPassword);
    if(strongOfPassword < 30 ){
      setBackgroundColorStrongBar('#ff0000')
    }else if((strongOfPassword >= 30) && (strongOfPassword < 50)){
      setBackgroundColorStrongBar('#FFD700')
        }else if((strongOfPassword >= 50) && (strongOfPassword < 70)){
      setBackgroundColorStrongBar('#7FFF00')
        }else if((strongOfPassword >= 70) && (strongOfPassword < 100)){
      setBackgroundColorStrongBar('green')
      }
      console.log(backgroundColorStrongBar);
  }
  const toggleItem = id => {
    setCharsPasswordCheckboxes(previousItems =>
      previousItems.map(item => {
        if (item.id === id) {
          item.value = !item.value
        }
        return item
      }))
  };
  const onChangeCharsNumbers = value => {
     setNumbersOfChars(value) 
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Gerador de Senhas </Text>
      </View>
      <View style={styles.passwordContainer}>
        <View style={styles.textPasswordContainer}>
          <View><Text style={styles.textContainer}>{password}</Text></View>
          
          <View style={{flexDirection:'row', marginVertical:10, marginRight:3, position: 'relative'}}> 
          <TouchableOpacity onPress={() => {generatePassword()}}>
            <Feather name='refresh-ccw' size={25} style={{  marginHorizontal:8}}></Feather>
            
          </TouchableOpacity>          
          <TouchableOpacity onPress={() => {Clipboard.setStringAsync(password)}}>
          <Feather name='copy' size={25} style={{ marginHorizontal:8}}></Feather>
            
          </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.strongPasswordBar, { width: `${strongOfPassword}%` }, { backgroundColor:`${backgroundColorStrongBar}`}]}>

        </View>

      </View>

      <View style={styles.checkboxesContainer}>
        <Text style={styles.checkboxLabel}>Numero de caracteres: {numbersOfChars}</Text>
        <Slider

          style={{ width: 300, height: 40, marginHorizontal: 20 }}
          minimumValue={4}
          value={numbersOfChars}
          maximumValue={50}
          step={1}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#000000"
          onValueChange={(value) => onChangeCharsNumbers(value)}
        />
        {charsPasswordCheckboxes.map(item => (

          <View key={item.id} style={styles.checkboxesItemContainer}>
            <Text style={styles.checkboxLabel}>{item.label}</Text>
            <Switch value={item.value} onValueChange={() => toggleItem(item.id)} ></Switch>
          </View>
        ))}

      </View>


      <StatusBar style="auto" />
      <TouchableOpacity style={styles.buttonContainer} onPress={() => {generatePassword()}} >
        <Text style={styles.textButton}>
          Gerar senha
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center'

  },
  title: {
    fontSize: 30,
    marginHorizontal: 50,
    marginVertical: 30,

    fontWeight: 'bold',

  },

  textContainer: {

    color: "#000",
    fontSize: 25

  },
  passwordContainer: {
    flexDirection: 'column',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  textPasswordContainer: {
    justifyContent:'space-around',
    flexDirection: 'row',
    padding: 20,

  },
  strongPasswordBar: {
    marginBottom: 0,
    height: 5,
    backgroundColor: 'green'
  },
  buttonContainer: {
    padding: 15,
    backgroundColor: "#7402de",
    marginHorizontal: 130,
    marginVertical: 20,
    alignItems: 'center',
    borderRadius: 25
  },
  textButton: {
    color: 'white'
  },
  checkboxesContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxesItemContainer: {
    flexDirection: "row"
  },
  checkboxLabel: {
    margin: 20,
    fontSize: 16,
    fontWeight: 'bold'
  }
});

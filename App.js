/*

TODO: Refatorar o codigo (Componetizar, separar styles, mudar icons)
*/
import Slider from '@react-native-community/slider';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

import styles from './styles';

export default function App() {
  const [password, setPassword] = useState('');
  const [strongOfPassword, setStrongOfPassword] = useState(0);
  const [numbersOfChars, setNumbersOfChars] = useState(6);
  const [charsPasswordCheckboxes, setCharsPasswordCheckboxes] = useState([
    { id: 'upperCaseChars', value: false, label: 'Letras Maiusculas (ABC)', chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
    { id: 'lowerCaseChars', value: false, label: 'Letras Minusculas (abc)', chars: 'abcdefghijklmnopqrstuvwxyz' },
    { id: 'numberChars', value: false, label: 'Numeros (123)', chars: '0123456789' },
    { id: 'specialChars', value: false, label: 'Caracteres Especiais(.+-[]*~_@#:?)', chars: '.+-[]*~_@#:?' }
  ]);
  const [backgroundColorStrongBar, setBackgroundColorStrongBar] = useState('')
  const allCharsToPassword = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.+-[]*~_@#:?"

  useEffect(() => {
    generatePassword()
  }, [numbersOfChars, charsPasswordCheckboxes])
  useEffect(() => {
    checkStrongOfPassword()
  }, [password])
  useEffect(() => {
    onChangeBackgroundColor()
  }, [strongOfPassword])


  const generatePassword = () => {

    var finalPassword = ''

    const isEveryCheckboxFalseOrTrue = charsPasswordCheckboxes.filter(item => item.value == true);

    var charstoGeneratePassword = "";

    if (isEveryCheckboxFalseOrTrue.length > 0 && isEveryCheckboxFalseOrTrue.length < charsPasswordCheckboxes.length) {
      for (var charsCheckboxItems of isEveryCheckboxFalseOrTrue) {
        charstoGeneratePassword += charsCheckboxItems.chars;
      }
    } else charstoGeneratePassword = allCharsToPassword;



    for (let index = 0; index < numbersOfChars; index++) {


      var randomNumber = Math.floor(Math.random() * charstoGeneratePassword.length);
      finalPassword += charstoGeneratePassword.substring(randomNumber, randomNumber + 1);
      // console.log(charsToCreatePassword.charAt(Math.floor(Math.random() * charsToCreatePasswordLength)));
      // finalPassword += charsToCreatePassword.charAt(Math.floor(Math.random() * charsToCreatePasswordLength));
    }
    setPassword(finalPassword)
  };

  const checkStrongOfPassword = () => {
    let score = 0;

    if (!password) return score;

    // award every unique letter until 5 repetitions
    const letters = {};
    for (let i = 0; i < password.length; i++) {
      letters[password[i]] = (letters[password[i]] || 0) + 1;
      score += 5.0 / letters[password[i]];
    }

    // bonus points for mixing it up
    const variations = {
      digits: /\d/.test(password),
      lower: /[a-z]/.test(password),
      upper: /[A-Z]/.test(password),
      nonWords: /\W/.test(password),
    };

    let variationCount = 0;
    for (const check in variations) {
      variationCount += (variations[check] === true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    if (score > 100) score = 100
    setStrongOfPassword(parseInt(score))
  }

  const onChangeBackgroundColor = () => {
    if (strongOfPassword > 80) {
      setBackgroundColorStrongBar('green')
    } else if (strongOfPassword > 60) {
      setBackgroundColorStrongBar('#FFD700')
    } else {
      setBackgroundColorStrongBar('#ff0000')
    }

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

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: withSpring(`${strongOfPassword}%`, { mass: 0.2 }),
    };
  });


  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Gerador de Senhas </Text>
      </View>
      <View style={styles.passwordContainer}>
        <View style={styles.textPasswordContainer}>
          <View><Text style={[styles.textContainer]}>{password}</Text></View>

          <View style={{ flexDirection: 'row', marginVertical: 10, marginRight: 3, position: 'relative' }}>
            <TouchableOpacity onPress={() => { generatePassword() }}>
              <Feather name='refresh-ccw' size={25} style={{ marginHorizontal: 8 }}></Feather>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => { Clipboard.setStringAsync(password); ToastAndroid.show('Senha copiada pra are!!', ToastAndroid.SHORT) }}>
              <Feather name='copy' size={25} style={{ marginHorizontal: 8 }}></Feather>

            </TouchableOpacity>
          </View>
        </View>
        <Animated.View style={[styles.strongPasswordBar, animatedStyles, { backgroundColor: `${backgroundColorStrongBar}` }]} />



      </View>

      <View style={styles.checkboxesContainer}>
        <Text style={styles.checkboxLabel}>Numero de caracteres: {numbersOfChars}</Text>
        <Slider

          style={{ width: 300, height: 40, marginHorizontal: 20 }}
          minimumValue={6}
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

    </View>
  );
}

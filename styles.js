import { StyleSheet } from "react-native";

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
      justifyContent: 'space-around',
      flexDirection: 'row',
      padding: 20,
  
    },
    strongPasswordBar: {
      marginBottom: 0,
      height: 5,
      backgroundColor: 'green',
      borderBottomStartRadius: 10,
      borderBottomEndRadius: 10
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
      margin: 10,
      fontSize: 16,
      fontWeight: 'bold'
    }
  });
  export default styles;
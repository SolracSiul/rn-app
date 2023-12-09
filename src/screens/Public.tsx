import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
  } from "react-native";

const Public = ({navigation}: any)  =>{
    const onPressSignUp = () => {
        navigation.navigate("CreateAcc")
      };
  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.buttonRegister} onPress={() =>onPressSignUp() }>
          <Text style={styles.registerText}>Don't have an account ? <Text>Sign up</Text></Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#38a69d'
    },
    containerHeader:{
      marginTop: '14%',
      marginBottom: '8%',
      paddingStart: '5%',
      backgroundColor: '#38a69d'
  
  },
  message:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
    containerForm:{
      backgroundColor: '#fff',
      flex:1,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingStart: '5%',
      paddingEnd: '5%',
   },
   title:{
    fontSize: 20,
    marginTop: 28,
   },
  input:{
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    
  },
  customBtn:{
    backgroundColor: '#38a69d',
    borderRadius: 10,
    paddingVertical: 8,
    width: '70%',
    alignself: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText:{
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonForgot:{
  
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: 'center',
    
  },
  registerText:{
    color: '#33363F'
  }
})
export default Public;

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
       <TouchableOpacity onPress={() =>onPressSignUp() }>
          <Text style={styles.registerText}>Don't have an account ? <Text>Sign up</Text></Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#38a69d',
    alignItems: 'center',
    justifyContent: 'center'
  },
registerText:{
  color: '#33363F'
}
})
export default Public;

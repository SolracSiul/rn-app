import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

const CreateAcc = ({navigation}: any)  =>{
    const onPressSignUp = () => {
          navigation.navigate("Public")
    };
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() =>onPressSignUp() }>
            <Text>Criar conta clique aqui e volte para home</Text>
            <Text style={styles.registerText}>Essa pagina tem que ter um header left para retornar para login</Text>
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
export default CreateAcc;

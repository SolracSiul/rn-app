import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import * as Animatable from 'react-native-animatable'
import {Feather} from "@expo/vector-icons"



const Home = ({navigation}:any) => {
  const onPressLogin = () => {
    navigation.navigate("Login")
    
  };

  return (
    <View style={styles.container}>
      <View style = {styles.containerLogo}>
        <Feather name="shopping-cart" size={94} color={"white"}/>
      </View> 

      <Animatable.View delay={1200} animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Monitore e organize seus gastos de qualquer lugar!</Text>
        <Text style={styles.text}> Faça o login para começar</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => onPressLogin()}
        >
        
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
    </Animatable.View>

      
    </View>
  );
};
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#38a69d'
  },
  containerLogo: {
    flex:2,
    backgroundColor: '#38a69d',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerForm: {
    flex:1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
    },
    
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 28,
      marginBottom: 12,
    },
    text:{
      color: '#a1a1a1'
    },
    button:{
      position: 'absolute',
      backgroundColor: '#38a69d',
      borderRadius: 50,
      paddingVertical: 8,
      width: '60%',
      alignself: 'center',
      bottom: '15%',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 14

    },
    buttonText:{
      fontSize: 18,
      color: '#FFF',
      fontWeight: 'bold',
      
    }
    })
export default Home;

import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react';
import { Button , Image, Platform} from 'react-native';
import axios from 'axios';
import api from '../services/api';
import { useEffect } from 'react';

export default function Perfil() {
  const [profileImage, setProfileImage] = useState('')
  const [userId, setUserId] = useState('');
  const {authState, onProfile} = useAuth();
  const idUser: string = authState?.user?._id || 'n mudou id';

  useEffect(() => {
    const loadProfile = async () => {
      try {
        await onProfile!();
        setUserId(authState?.user?._id || 'n mudou id');
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      }
    };

    loadProfile();
  }, []);  
  const openImageLibrary = async () =>{
    const {status} = await ImagePicker.requestCameraPermissionsAsync();
    if(status !== 'granted'){
      alert('Precisamos de autorização do uso de imagens')
    }
    if(status === 'granted'){
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [2, 2],
        quality: 1,
      })
      if(!response.canceled){
        setProfileImage(response.assets[0].uri)
       
      }
    }
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Meu perfil {authState?.user?.name}</Text>
        <Text>Meu id {idUser}</Text>
        <Button title="Atualize sua foto de perfilr" onPress={openImageLibrary} />
        {profileImage && <Image source={{ uri: profileImage }} style={{ width: 150, height: 150 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

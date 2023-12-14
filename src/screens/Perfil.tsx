import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react';
import { Button , Image, Platform, TextInput, TouchableOpacity} from 'react-native';
import axios from 'axios';
import api from '../services/api';
import { useEffect } from 'react';
import { launchImageLibraryAsync } from 'expo-image-picker';

export default function Perfil() {
  const [profileImage, setProfileImage] = useState<string | any>('')
  const [userId, setUserId] = useState('');
  const {authState, onProfile} = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profissao: '',
  });

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
  const handleUpdateProfile = () => {
    setEditing(false)
    console.log('upload')
  };
  const openImageLibrary = async () =>{
    const {status} = await ImagePicker.requestCameraPermissionsAsync();
    if(status !== 'granted'){
      alert('Precisamos de autorização do uso de imagens')
    }
    if(status === 'granted'){
      const response = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [2, 2],
        quality: 1,
      })
      if(!response.canceled){
        setProfileImage(response.assets[0].base64)
      }
    }
  }
  return (
    <View style={styles.container}>
      {editing === false ? (
        <View style={styles.profileInfo}>
          <View style={styles.infoContainer}>
            {profileImage && (
              <Image source={{ uri: 'data:image/jpeg;base64,' + profileImage }} style={styles.profileImage} />
            )}
            <View>
             <Text style={styles.hello}>Olá, </Text>
             <Text style={styles.infoText}>{authState?.user?.name}</Text>
             <Text style={styles.email}>{authState?.user?.email}</Text>
          <Text style={styles.email}>{authState?.user?.profissao}</Text>
            </View>
          </View>
          <Button title="Editar Perfil" onPress={() => setEditing(true)} />
          <Button title="Atualizar Foto de Perfil" onPress={openImageLibrary} />
        </View>
      ) : (
        <View style={styles.editProfile}>
          <Text style={styles.label}>Editar Perfil</Text>
          <TextInput
            style={styles.input}
            placeholder="Novo Nome"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Novo Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Nova Profissão"
            value={formData.profissao}
            onChangeText={(text) => setFormData({ ...formData, profissao: text })}
          />
          <Button title="Salvar Alterações" onPress={handleUpdateProfile} />
          <TouchableOpacity onPress={() => setEditing(false)}>
            <Text style={styles.cancelButton}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
  },
  profileInfo: {
    alignItems: 'center',
    width: '90%',
    height: '95%',
    padding: 20,
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    shadowColor: 'purple',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 10,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
  },
  editProfile: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoContainer: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
    color: '#555',
  },
  hello:{
    paddingLeft: 15,
    color: 'black',
    textTransform: 'capitalize'
  },
  email:{
    fontSize: 12,
    paddingLeft: 15,
  },
  infoText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    paddingLeft: 15,
    textTransform: 'capitalize'
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  profileImage: {
    width: 150,
    height: 150,
    marginTop: 10,
    borderRadius: 75,
  },
  cancelButton: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
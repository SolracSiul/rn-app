import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function Perfil() {
  const {authState} = useAuth();
  return (
    <View style={styles.container}>
      <Text>Meu perfil {authState?.user?.name}</Text>
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

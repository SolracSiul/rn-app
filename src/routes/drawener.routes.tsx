import { createDrawerNavigator} from '@react-navigation/drawer'
import {Feather} from "@expo/vector-icons"
import TabRoutes from './tab.routes'
import Contact from '../screens/Contact'
import {TouchableOpacity, StyleSheet} from "react-native"
import { useAuth } from '../context/AuthContext'

const Drawer = createDrawerNavigator()


export default function DrawerRoutes(){
    const {onLogout} = useAuth();

    async function handleLogoutPress() {
      if(onLogout !== undefined){
        await onLogout()
      }
    }

    function SignOutButton({ onPress }: any) {
        return (
          <TouchableOpacity onPress={onPress} style={styles.customBtn}>
            <Feather name="log-out" size={20} color="purple" />
          </TouchableOpacity>
        );
      }
    
    let auth = true;
    return(
        <Drawer.Navigator screenOptions={{ headerStyle:{backgroundColor: '#f4f4f4'}, drawerActiveTintColor: 'purple',headerTintColor: 'purple',title: '',  headerRight: () => (
            <SignOutButton onPress={handleLogoutPress} />
            ), }} >
            <Drawer.Screen name='home' component={TabRoutes} 
            options={{
                drawerLabel: '',
                drawerIcon: ({color, size}) => <Feather name='home' color={color} size={size}/>
            }}
            ></Drawer.Screen>
            <Drawer.Screen name='contact' component={Contact}
            options={{
                drawerLabel: 'Meu perfil',
                drawerIcon: ({color, size}) => <Feather name='user' color={color} size={size}/>
            }}
            ></Drawer.Screen>
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
  customBtn:{
    paddingRight: 10
  }, 
})
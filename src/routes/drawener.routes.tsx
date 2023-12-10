import { createDrawerNavigator} from '@react-navigation/drawer'
import {Feather} from "@expo/vector-icons"
import TabRoutes from './tab.routes'
import StackRoutes from './stack.routes'
import { Button } from 'react-native'
import Contact from '../screens/Contact'
import {TouchableOpacity, StyleSheet} from "react-native"

const Drawer = createDrawerNavigator()


export default function DrawerRoutes(){
    function SignOutButton({ onPress }: any) {
        return (
          <TouchableOpacity onPress={onPress} style={styles.customBtn}>
            <Feather name="log-out" size={20} color="purple" />
          </TouchableOpacity>
        );
      }
    const teste = () =>{
        console.log('say hello')
    }
    let auth = true;
    return(
        <Drawer.Navigator screenOptions={{ headerStyle:{backgroundColor: '#f4f4f4'}, drawerActiveTintColor: 'purple',headerTintColor: 'purple',title: '',  headerRight: () => (
            <SignOutButton onPress={() => teste()} />
            ), }} >
            <Drawer.Screen name='home' component={TabRoutes} 
            options={{
                drawerLabel: 'list',
                drawerIcon: ({color, size}) => <Feather name='home' color={color} size={size}/>
            }}
            ></Drawer.Screen>
            <Drawer.Screen name='contact' component={Contact}
            options={{
                drawerLabel: 'Meus contatos',
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
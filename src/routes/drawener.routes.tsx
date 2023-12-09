import { createDrawerNavigator} from '@react-navigation/drawer'
import {Feather} from "@expo/vector-icons"
import TabRoutes from './tab.routes'
import StackRoutes from './stack.routes'
import { Button } from 'react-native'
import Contact from '../screens/Contact'

const Drawer = createDrawerNavigator()

export default function DrawerRoutes(){
    const teste = () =>{
        console.log('oie')
    }
    let auth = true;
    return(
        <Drawer.Navigator screenOptions={{title: '',  headerRight: () => (
            <Button onPress={() => {teste()}} title="Sign out"></Button>
          )}} >
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
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Feather} from "@expo/vector-icons"
import Feed from '../screens/Feed'
import Contact from '../screens/Contact'
import About from '../screens/About'

const Tab = createBottomTabNavigator()
export default function TabRoutes(){
    return(
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name='Feed' component={Feed}
            options={{
                tabBarLabel: 'Feed',
                tabBarIcon: ({color, size}) => <Feather name="home" color={'red'} size={size}/>
            }}
            ></Tab.Screen>
            <Tab.Screen name='About' component={About}
             options={{
                tabBarLabel: 'Inicio',
                tabBarIcon: ({color, size}) => <Feather name="home" color={'red'} size={size}/>
            }}></Tab.Screen>
            <Tab.Screen name='Contact' component={Contact}
             options={{
                tabBarLabel: 'Contact',
                tabBarIcon: ({color, size}) => <Feather name="home" color={'red'} size={size}/>
            }}></Tab.Screen>
        </Tab.Navigator>
    )
}

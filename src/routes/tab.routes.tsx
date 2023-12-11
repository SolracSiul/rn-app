import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Feather} from "@expo/vector-icons"
import Feed from '../screens/ProductList'
import Contact from '../screens/Contact'
import ProductList from '../screens/ProductList'
import ProductDetails from '../screens/ProductDetails'
import StackRoutes from './stack.routes'
import { createStackNavigator } from '@react-navigation/stack'
import { Animated } from "react-native";
import Cart from '../screens/Cart'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator();

const TabRoutes =() =>{
    
    return(
        <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false, tabBarLabelStyle: {marginTop: -16, color: 'purple'}}} >
            <Tab.Screen name='ProductTab' component={ProductStackNavigator}
            options={{
                tabBarIcon: ({color, size, focused}) => <Feather name="shopping-bag" color={focused ? 'purple' : '#372D8AA8'}size={size}/>
            }}
            ></Tab.Screen>
             
            <Tab.Screen name='Cart' component={Cart}
             options={{
                tabBarIcon: ({color, size, focused}) => <Feather name="shopping-cart" color={focused ? 'purple' : '#372D8AA8'} size={size}/>
            }}></Tab.Screen>
            <Tab.Screen name='Contact' component={Contact}
             options={{
                
                tabBarIcon: ({color, size, focused}) => <Feather name="user" color={focused ? 'purple' : '#372D8AA8'}size={size}/>
            }}></Tab.Screen>
              <Tab.Screen name='Contact2' component={Contact}
             options={{
                
                tabBarIcon: ({color, size, focused}) => <Feather name="message-square" color={focused ? 'purple' : '#372D8AA8'} size={size}/>
            }}></Tab.Screen>
        </Tab.Navigator>
    )
}
const ProductStackNavigator = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProductList" component={ProductList} options={{headerShown: false}}/>
      <Stack.Screen name="ProductDetails" component={ProductDetails} options={{headerShown: false}} />
    </Stack.Navigator>
  );


export default TabRoutes
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/nav';

import CreateAcc from '../screens/CreateAcc'
import Home from '../screens/Home';
import Login from '../screens/Login';
import Forgot from '../screens/Forgot';



const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNoRoutes(){
   
    return(
        <Stack.Navigator screenOptions={{headerShown: false,}}>
            <Stack.Screen name="Home" component={Home}></Stack.Screen>
            <Stack.Screen name="Login" component={Login}></Stack.Screen>
            <Stack.Screen name="CreateAcc" component={CreateAcc} options={{headerShown: true, title: ''}}></Stack.Screen>
            <Stack.Screen name="Forgot" component={Forgot} options={{headerShown: true, title: ''}}></Stack.Screen>
        </Stack.Navigator>
    )
}
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/nav';

import ProductDetails from '../screens/ProductDetails';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackRoutes(){
   
    return(
        <Stack.Navigator screenOptions={{headerShown: false,}}>
            <Stack.Screen name="ProductDetails" component={ProductDetails}></Stack.Screen>
        </Stack.Navigator>
    )
}
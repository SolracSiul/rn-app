import { NavigationContainer} from "@react-navigation/native"
import DrawerRoutes from "./drawener.routes"
import StackNoRoutes from "./stackno.routes";
import { useAuth } from "../context/AuthContext";

export default function Routes(){
    const {authState} = useAuth();
    return(
        <NavigationContainer >
            {authState?.authenticated ? <DrawerRoutes /> : <StackNoRoutes />}
        </NavigationContainer>
    )
}
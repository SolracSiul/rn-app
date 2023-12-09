import { NavigationContainer} from "@react-navigation/native"
// import TabRoutes from "./tab.routes"
import DrawerRoutes from "./drawener.routes"
import StackRoutes from "./stack.routes";

export default function Routes(){
    let auth = true;
    return(
        <NavigationContainer>
            {auth ? <DrawerRoutes /> : <StackRoutes />}
        </NavigationContainer>
    )
}
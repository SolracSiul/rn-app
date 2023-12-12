import 'react-native-gesture-handler'
import { LogBox } from 'react-native';

import Routes from './src/routes';
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { FavProvider } from './src/context/FavContext';
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavProvider>
            <Routes/>
        </FavProvider>
      </CartProvider>
    </AuthProvider>
  );
}


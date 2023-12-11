import 'react-native-gesture-handler'
import { LogBox } from 'react-native';

import Routes from './src/routes';
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes/>
      </CartProvider>
    </AuthProvider>
  );
}


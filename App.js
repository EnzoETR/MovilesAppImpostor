import AppNavegador from './src/navigation/AppNavegador';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavegador />
      </NavigationContainer>
    </AuthProvider>
  );
}
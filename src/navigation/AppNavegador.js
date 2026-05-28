import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IndexScreen from '../screens/IndexScreen';
import ConfiguracionScreen from '../screens/ConfigurarPartida';
import IniciarSesionScreen from '../screens/IniciarSesionScreen'; // Tu pantalla se queda aquí

const Stack = createNativeStackNavigator();

export default function AppNavegador() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={IndexScreen} />
      <Stack.Screen name="ConfigurarPartida" component={ConfiguracionScreen} />
      <Stack.Screen name="IniciarSesion" component={IniciarSesionScreen} />
    </Stack.Navigator>    
  );
}
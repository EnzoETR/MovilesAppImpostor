import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IndexScreen from '../screens/IndexScreen';
import ConfiguracionScreen from '../screens/ConfigurarPartida';

const Stack = createNativeStackNavigator();

export default function AppNavegador() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={IndexScreen} />
      <Stack.Screen name="ConfigurarPartida" component={ConfiguracionScreen} />
    </Stack.Navigator>    
  );
}
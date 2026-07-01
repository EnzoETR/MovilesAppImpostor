import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IndexScreen from '../screens/IndexScreen';
import ConfiguracionScreen from '../screens/ConfigurarPartida';
import IniciarSesionScreen from '../screens/IniciarSesionScreen'; 
import RevelarRolesScreen from '../screens/RevelarRolesScreen';
import VerRolScreen from '../screens/VerRolScreen';
import CategoriasScreen from '../screens/CategoriasScreen';
import VotacionScreen from '../screens/VotacionScreen';
const Stack = createNativeStackNavigator();

export default function AppNavegador() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Inicio" component={IndexScreen} />
      <Stack.Screen name="ConfigurarPartida" component={ConfiguracionScreen} />
      <Stack.Screen name="IniciarSesion" component={IniciarSesionScreen} />
      <Stack.Screen name="RevelarRoles" component={RevelarRolesScreen} />
      <Stack.Screen name="VerRol" component={VerRolScreen} />
      <Stack.Screen name="Categorias" component={CategoriasScreen} />
      <Stack.Screen name="Votacion" component={VotacionScreen} />
    </Stack.Navigator>    
  );
}
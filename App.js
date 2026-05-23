import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavegador from './src/navigation/AppNavegador';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  
  return  (
  <NavigationContainer>
    <AppNavegador />
  </NavigationContainer>
  );
    
}
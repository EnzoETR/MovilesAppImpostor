import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { styles } from '../styles/EstilosI-Sesion';
import Footer from '../components/footer';

export default function IniciarSesionScreen({ navigation }) {
  // Este estado controla si estamos en modo Registro (true) o Inicio de Sesión (false)
  const [esRegistro, setEsRegistro] = useState(true);

  // Estados para los campos de texto
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [repetirContrasenia, setRepetirContrasenia] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Selector de Pestañas */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, !esRegistro ? styles.tabButtonActive : styles.tabButtonInactive]}
            onPress={() => setEsRegistro(false)} // Cambia a Iniciar Sesión
          >
            <Text style={!esRegistro ? styles.tabButtonTextActive : styles.tabButtonTextInactive}>
              Iniciar Sesion
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, esRegistro ? styles.tabButtonActive : styles.tabButtonInactive]}
            onPress={() => setEsRegistro(true)} // Cambia a Registrarme
          >
            <Text style={esRegistro ? styles.tabButtonTextActive : styles.tabButtonTextInactive}>
              Registrarme
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tarjeta de Formulario Dinámica */}
        <View style={styles.formCard}>

          {/* Campo Nombre (Se muestra en AMBOS modos) */}
          <Text style={styles.inputLabel}>Nombre</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Ingresa tu nombre"
              placeholderTextColor="#4E7A43"
            />
          </View>

          {/* Campo Correo (SOLO se muestra si esRegistro es TRUE) */}
          {esRegistro && (
            <>
              <Text style={styles.inputLabel}>Correo</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={correo}
                  onChangeText={setCorreo}
                  keyboardType="email-address"
                  placeholder="Ingresa tu correo"
                  placeholderTextColor="#4E7A43"
                />
              </View>
            </>
          )}

          {/* Campo Contraseña (Se muestra en AMBOS modos) */}
          <Text style={styles.inputLabel}>Contraseña</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={contrasenia}
              onChangeText={setContrasenia}
              secureTextEntry={true}
              placeholder="Ingresa tu contraseña"
              placeholderTextColor="#4E7A43"
            />
          </View>

          {/* Campo Repetir Contraseña (SOLO se muestra si esRegistro es TRUE) */}
          {esRegistro && (
            <>
              <Text style={styles.inputLabel}>Repetir Contraseña</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={repetirContrasenia}
                  onChangeText={setRepetirContrasenia}
                  secureTextEntry={true}
                  placeholder="Repite tu contraseña"
                  placeholderTextColor="#4E7A43"
                />
              </View>
            </>
          )}

          {/* Botones Secundarios Dinámicos */}
          <View style={styles.secondaryButtonContainer}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setEsRegistro(!esRegistro)} // Intercambia el modo al presionar el botón izquierdo
            >
              <Text style={styles.secondaryButtonText}>
                {esRegistro ? 'YA TENGO CUENTA' : 'NO TENGO CUENTA'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => {
                if (!esRegistro) {
                  // Acción de Iniciar Sesión: te manda al Index (Inicio)
                  navigation.navigate("Inicio");
                } else {
                  // Acción de Registro (puedes agregar lógica aquí más adelante)
                  console.log("Registrando usuario...");
                }
              }}
            >
              <Text style={styles.secondaryButtonText}>
                {esRegistro ? 'CREAR CUENTA' : 'INICIAR SESION'}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <Footer />
      </View>
    </KeyboardAvoidingView>
  );
}
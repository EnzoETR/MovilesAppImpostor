import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';
import { styles } from '../styles/EstilosI-Sesion';
import Footer from '../components/footer';
import { supabase } from '../utils/supabase';

export default function IniciarSesionScreen({ navigation }) {
  // Este estado controla si estamos en modo Registro (true) o Inicio de Sesión (false)
  const [esRegistro, setEsRegistro] = useState(true);

  // Estados para los campos de texto
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [repetirContrasenia, setRepetirContrasenia] = useState('');
  const handleRegistro = async () => {
  if (!nombre.trim() || !correo.trim() || !contrasenia.trim() || !repetirContrasenia.trim()) {
    alert("Todos los campos son obligatorios.");
    return;
  }
  if (!correo.includes("@") || !correo.includes(".")) {
    alert("Por favor, introducí un correo electrónico válido.");
    return;
  }
  if (contrasenia !== repetirContrasenia) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  // Inserta en la tabla "usuarios"
  const { data, error } = await supabase
    .from('usuarios')
    .insert([{ 
      nombre: nombre.trim(), 
      correo: correo.trim(), 
      password: contrasenia.trim() 
    }]);

  if (error) {
    alert("Error al registrarse: " + error.message);
    return;
  }

  alert(`¡Cuenta creada con éxito! Bienvenido/a ${nombre}.`);
  setNombre(''); setCorreo(''); setContrasenia(''); setRepetirContrasenia('');
  setEsRegistro(false);
};

const handleIniciarSesion = async () => {
  if (!nombre.trim() || !contrasenia.trim()) {
    alert("Por favor, ingresa tu nombre y contraseña.");
    return;
  }

  // Busca en la tabla "usuarios"
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('nombre', nombre.trim())
    .eq('password', contrasenia.trim())
    .single();

  if (error || !data) {
    alert("Usuario o contraseña incorrectos.");
    return;
  }

  alert(`¡Bienvenido de nuevo, ${data.nombre}!`);
  navigation.navigate("Inicio", { usuario: data });
};

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
              onPress={esRegistro ? handleRegistro : handleIniciarSesion}
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
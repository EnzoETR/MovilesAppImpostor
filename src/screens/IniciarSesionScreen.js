import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Platform, Button } from 'react-native';
import { styles } from '../styles/EstilosI-Sesion';
import Footer from '../components/footer';
import { supabase } from '../utils/supabase'; // Asegúrate de importar Supabase correctamente

export default function IniciarSesionScreen({ navigation, route }) {
  // Capturamos el usuario si viene desde el Index
  const usuarioActivo = route.params?.usuario || null;

  // Estados para el formulario
  const [esRegistro, setEsRegistro] = useState(false); // Por defecto Iniciar Sesión
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [repetirContrasenia, setRepetirContrasenia] = useState('');

  // === LÓGICA PARA REGISTRARME ===
  const handleRegistro = async () => {
    if (!nombre.trim() || !correo.trim() || !contrasenia.trim() || !repetirContrasenia.trim()) {
      alert("Todos los campos son obligatorios para registrarte.");
      return;
    }
    if (!correo.includes("@") || !correo.includes(".")) {
      alert("Por favor, introduce un correo electrónico válido.");
      return;
    }
    if (contrasenia !== repetirContrasenia) {
      alert("Las contraseñas no coinciden. Verifícalas.");
      return;
    }

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

    alert(`¡Cuenta creada con éxito!\nBienvenido/a ${nombre}.`);
    setNombre(''); setCorreo(''); setContrasenia(''); setRepetirContrasenia('');
    setEsRegistro(false);
  };

  // === LÓGICA PARA INICIAR SESIÓN ===
  const handleIniciarSesion = async () => {
    if (!nombre.trim() || !contrasenia.trim()) {
      alert("Por favor, ingresa tu nombre y contraseña para continuar.");
      return;
    }

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

    alert(`¡Bienvenido de nuevo, ${data.nombre.toUpperCase()}!`);
    // Enviamos el usuario de vuelta a la pantalla de Inicio
    navigation.navigate("Inicio", { usuario: data });
  };

  // === EN CASO DE QUE YA ESTÉ LOGUEADO ===
  if (usuarioActivo) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
        <View style={[styles.formCard, { width: '100%', alignItems: 'center', paddingVertical: 40 }]}>
          <Text style={[styles.inputLabel, { fontSize: 22, textAlign: 'center', marginBottom: 10 }]}>
            Sesión Activa
          </Text>
          <Text style={{ fontSize: 16, color: '#ffffff', textAlign: 'center', marginBottom: 30 }}>
            Ya iniciaste sesión como: {"\n"}
            <Text style={{ fontWeight: 'bold', color: '#06a837', fontSize: 18 }}>{usuarioActivo.nombre}</Text>
          </Text>
          
          <View style={{ width: '80%', gap: 15 }}>
            <Button 
              title="Volver al Menú" 
              color="#06a837" 
              onPress={() => navigation.navigate("Inicio", { usuario: usuarioActivo })} 
            />
            <Button 
              title="Cerrar Sesión" 
              color="#d9534f" 
              onPress={() => {
                alert("Sesión cerrada");
                navigation.navigate("Inicio", { usuario: null });
              }} 
            />
          </View>
        </View>
        <View style={styles.footerContainer}>
          <Footer />
        </View>
      </View>
    );
  }

  // === RENDER NORMAL DEL FORMULARIO (SI NO HAY LOGUEO) ===
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
            onPress={() => setEsRegistro(false)}
          >
            <Text style={!esRegistro ? styles.tabButtonTextActive : styles.tabButtonTextInactive}>
              Iniciar Sesion
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, esRegistro ? styles.tabButtonActive : styles.tabButtonInactive]}
            onPress={() => setEsRegistro(true)}
          >
            <Text style={esRegistro ? styles.tabButtonTextActive : styles.tabButtonTextInactive}>
              Registrarme
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tarjeta de Formulario Dinámica */}
        <View style={styles.formCard}>

          {/* Campo Nombre */}
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

          {/* Campo Correo */}
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

          {/* Campo Contraseña */}
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

          {/* Campo Repetir Contraseña */}
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

          {/* Botones de Acción */}
          <View style={styles.secondaryButtonContainer}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setEsRegistro(!esRegistro)}
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
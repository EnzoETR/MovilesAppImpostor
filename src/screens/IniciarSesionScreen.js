import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Platform, Button } from 'react-native';
import { styles } from '../styles/EstilosI-Sesion';
import Footer from '../components/footer';

export default function IniciarSesionScreen({ navigation, route }) {
  
  const usuarioActivo = route.params?.usuario || null;

  const API_URLS = [
    'http://192.168.1.15:8088/api/v1',
    'http://192.168.10.16:8088/api/v1',
    'http://localhost:8088/api/v1',
    'http://10.0.2.2:8088/api/v1',
  ];

  const fetchConFallback = async (ruta, method = 'GET', body = null) => {
    let ultimoError = null;

    for (const API_URL of API_URLS) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const options = {
          method: method,
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
          },
        };

        if (body) {
          options.body = JSON.stringify(body);
        }

        const response = await fetch(`${API_URL}${ruta}`, options);
        
        clearTimeout(timeoutId);

        if (response.ok) {
          return response;
        }

        ultimoError = new Error(`HTTP ${response.status}`);
      } catch (error) {
        ultimoError = error;
      }
    }

    throw ultimoError || new Error('No se pudo conectar con el servidor');
  };

  // Estados para el formulario
  const [esRegistro, setEsRegistro] = useState(false);
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

    try {
      const response = await fetchConFallback('/usuario/crearUsuario', 'POST', {
        nombre: nombre.trim(),
        correo: correo.trim(),
        password: contrasenia.trim()
      });

      const data = await response.json();
      alert(`¡Cuenta creada con éxito!\nBienvenido/a ${nombre}.`);
      setNombre(''); setCorreo(''); setContrasenia(''); setRepetirContrasenia('');
      setEsRegistro(false);
    } catch (error) {
      alert("Error al registrarse: " + error.message);
    }
  };

  // === LÓGICA PARA INICIAR SESIÓN ===
  const handleIniciarSesion = async () => {
    if (!correo.trim() || !contrasenia.trim()) {
      alert("Por favor, ingresa tu correo y contraseña para continuar.");
      return;
    }

    try {
      const response = await fetchConFallback('/usuario/login', 'POST', {
        correo: correo.trim(),
        password: contrasenia.trim()
      });

      const data = await response.json();
      alert(`¡Bienvenido de nuevo, ${data.nombre.toUpperCase()}!`);
      navigation.navigate("Inicio", { usuario: data });
    } catch (error) {
      alert("Usuario o contraseña incorrectos.");
    }
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
          <Text style={styles.inputLabel}>{esRegistro ? 'Nombre' : 'Correo'}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={esRegistro ? nombre : correo}
              onChangeText={esRegistro ? setNombre : setCorreo}
              placeholder={esRegistro ? "Ingresa tu nombre" : "Ingresa tu correo"}
              placeholderTextColor="#4E7A43"
              keyboardType={esRegistro ? "default" : "email-address"}
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

          <TouchableOpacity
            style={{
              alignSelf: 'flex-start',
              marginTop: 14,
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 10,
              backgroundColor: '#eaf7ee',
              borderWidth: 1,
              borderColor: '#06a837',
            }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: '#0f6b31', fontWeight: '700' }}>← Volver</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <Footer />
      </View>
    </KeyboardAvoidingView>
  );
}
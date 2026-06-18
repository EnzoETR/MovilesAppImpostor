import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { styles } from '../styles/EstilosCategoriasReglas';
import Footer from '../components/footer';

const REGLAS = [
  'Cada jugador recibe un rol secreto.',
  'Uno será el impostor y los demás civiles.',
  'Todos reciben una palabra… menos el impostor.',
  'Por turnos, cada jugador dice una pista.',
  'El impostor debe improvisar sin saber la palabra.',
  'Debes evitar ser descubierto y también sospechar de otros.',
  'Al final de la ronda, todos votan.',
  'Si descubren al impostor, ganan los civiles.',
  'Si el impostor sobrevive, gana él.',
];

export default function CategoriasScreen({ navigation, route }) {
  const usuario = route.params?.usuario || null;  // 👈 recibe el usuario
  const estaLogueado = usuario !== null;

  const CATEGORIAS = [
  { id: 1, nombre: 'Videojuegos', disponible: estaLogueado },
  { id: 2, nombre: 'Países', disponible: estaLogueado },
  { id: 3, nombre: 'Comida', disponible: estaLogueado },
  { id: 4, nombre: 'Cuadros', disponible: estaLogueado },
  { id: 5, nombre: 'Músicos', disponible: estaLogueado },
  { id: 6, nombre: 'Películas', disponible: true }, // única disponible sin login
];

  const handleCategoria = (categoria) => {
    if (!categoria.disponible) {
      Alert.alert(
        'Iniciá sesión',
        'Esta categoría requiere iniciar sesión.',
        [{ text: 'OK' }]
      );
      return;
    }
    // navigation.navigate('ConfigurarPartida', { categoria: categoria.nombre });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titulo}>Categorias y Reglas</Text>
        <Text style={styles.subtitulo}>Categorias</Text>

        {CATEGORIAS.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.categoriaBtn, !cat.disponible && styles.categoriaBtnBloqueada]}
            onPress={() => handleCategoria(cat)}
            activeOpacity={cat.disponible ? 0.7 : 0.5}
          >
            <Text style={[styles.categoriaTexto, !cat.disponible && styles.categoriaTextoBloqueada]}>
              {cat.nombre}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.agregarBtn}
          onPress={() => Alert.alert('Próximamente', 'Esta función estará disponible pronto.')}
        >
          <Text style={styles.agregarTexto}>Agregar categoría</Text>
        </TouchableOpacity>

        <View style={styles.reglasContainer}>
          <Text style={styles.reglasTitle}>REGLAS</Text>
          {REGLAS.map((regla, index) => (
            <Text key={index} style={styles.reglaTexto}>• {regla}</Text>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footerContainer}>
        <Footer />
      </View>
    </View>
  );
}
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B4332',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
  },

  // Títulos
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 14,
    textAlign: 'center',
  },

  // Botones de categoría disponible
  categoriaBtn: {
    width: '100%',
    backgroundColor: '#52B788',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 10,
    alignItems: 'center',
  },
  categoriaTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B4332',
  },

  // Botones de categoría bloqueada
  categoriaBtnBloqueada: {
    backgroundColor: '#95D5B2',
    opacity: 0.6,
  },
  categoriaTextoBloqueada: {
    color: '#2D6A4F',
  },

  // Botón agregar
  agregarBtn: {
    width: '100%',
    backgroundColor: '#52B788',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 24,
    alignItems: 'center',
  },
  agregarTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B4332',
  },

  // Sección reglas
  reglasContainer: {
    width: '100%',
    backgroundColor: '#2D6A4F',
    borderRadius: 12,
    padding: 18,
    marginBottom: 20,
  },
  reglasTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 2,
  },
  reglaTexto: {
    fontSize: 14,
    color: '#D8F3DC',
    marginBottom: 8,
    lineHeight: 20,
    textAlign: 'center',
  },

  footerContainer: {
    width: '100%',
  },
});
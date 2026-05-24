import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  contenedorFooter: {
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#004e32',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
  contenedorFichasEstadisticas: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  contenedorBotonesIncio: {
    width: '100%',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagenPrincipal: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: -40,

  },
});
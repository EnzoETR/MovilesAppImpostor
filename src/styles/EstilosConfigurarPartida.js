import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#087c4f',
    flex: 1,
  },
  containerScroll: {
    padding: 18,
    paddingBottom: 32,
  },

header: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 40,
},

titulo: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
},

opciones: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
},

cardOpcion: {
    backgroundColor: '#075c35',
    width: '31%',
    minWidth: 95,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 110,
    marginBottom: 8,
},

textOpcion: {
    color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 12,
},

cardCategorias: {
    backgroundColor: '#075c35',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
},

subtitulo: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
},

dropdown: {
    backgroundColor: '#a8e6bd',
    borderWidth: 0,
    borderRadius: 6,
},

dropdownText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
},

cardJugadores: {
    backgroundColor: '#075c35',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    minHeight: 300,
},
listaJugadores: {
    alignItems: 'center',
    width: '100%',
},

jugadoresScrollContainer: {
    width: '100%',
    height: 220,
    marginBottom: 14,
},
jugadoresScroll: {
    width: '100%',
    height: '100%',
},
jugadoresScrollContent: {
    paddingBottom: 8,
},

inputJugador: {
    backgroundColor: '#f5f5f5',
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    width: '100%',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c2c2c2',
    marginBottom: 10,
},

botonesJugadores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
},

botonJugador: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
},

botonesFinales: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
    marginBottom: 12,
},

botonFinal: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#06a837',
},

botonFinalSecundario: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#d9534f',
},

footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
},

footerText: {
    color: '#000000',
    fontWeight: 'bold',
    marginRight: 6,
},


controlesImpostores: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    gap: 10,
    width: '100%',
},

numeroImpostores: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    minWidth: 28,
    textAlign: 'center',
},

controlesPista: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    width: '100%',
},


});

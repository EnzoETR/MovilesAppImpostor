import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#087c4f',
    flex: 1,
    padding: 18,
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
    justifyContent: 'space-between',
    marginBottom: 10,
},

cardOpcion: {
    backgroundColor: '#075c35',
    width: '48%',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
},

textOpcion: {
    color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
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
    padding: 10,
    marginBottom: 10,
},

listaJugadores: {
    alignItems: 'center',
},

itemJugador: {
    backgroundColor: '#a8e6bd',
    color: '#000000',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 220,
    padding: 5,
    borderRadius: 5,
    marginBottom: 7,
},

botonesFinales: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    justifyContent: 'space-between',
    marginTop: 10,
},

numeroImpostores: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 20,
},


controlesImpostores: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
},
controlesPista: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    transform: [{ scale: 1.5 }], 
},


});

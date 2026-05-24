import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  contenedorGrande: {
    backgroundColor: '#8ec4a5',
    width: '30%',
    padding: 10,
    marginHorizontal: 4,
    borderRadius: 16,
  },
  contenedorChico: {
    width: '100%',
    padding: 12,
    backgroundColor: '#08774f',
    alignItems: 'right',
    justifyContent: 'center',
    borderRadius: 12,
    marginTop: 12,
    flexDirection: 'row',
  },
  titulo: {
    color: '#08774f',
    fontSize: 20,
    fontWeight: '600',
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
  image: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 10,
    marginTop: 8,
  },
});
import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.9;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00693E', // Verde oscuro de fondo
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: cardWidth,
    marginBottom: 20,
  },
  tabButton: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 2,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#A8D5A1', // Verde claro activo (Registrarme)
    borderColor: '#A8D5A1',
  },
  tabButtonInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Boton opaco (Iniciar Sesion)
    borderColor: 'transparent',
  },
  tabButtonTextActive: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabButtonTextInactive: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  formCard: {
    width: cardWidth,
    backgroundColor: '#004C2D', // Verde mas oscuro para la tarjeta central
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  helperText: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: '#A8D5A1',
    fontSize: 11,
  },
  inputLabel: {
    alignSelf: 'flex-start',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 15,
    marginBottom: 5,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#A8D5A1', // Verde clarito para los inputs
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 15 : 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    color: '#000000',
    fontSize: 16,
  },
  secondaryButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 25,
  },
  secondaryButton: {
    backgroundColor: '#A8D5A1',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 12,
    flex: 0.47,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  footerContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
});
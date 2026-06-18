import {Text, View, Image} from 'react-native';
import { styles } from '../styles/EstilosIndex';
import FichaEstadistica from '../components/ficha_estadistica';
import BotonInicio from '../components/boton_inicio';
import Footer from '../components/footer';
import ImagenPrinicipal from '../../assets/imagenes/ImpostorImagenPrincipal.png';

export default function IndexScreen({ navigation , route}) {
    return (
        <View style={styles.container}>
            <Image 
                source={ImagenPrinicipal}
                style={styles.imagenPrincipal}
            />
            <View style={styles.contenedorFichasEstadisticas}>
                <FichaEstadistica titulo="PARTIDAS" valor="20" imagen="mando.png"/>
                <FichaEstadistica titulo="VICTORIAS" valor="10" imagen="victoria.png"/>
                <FichaEstadistica titulo="IMPOSTOR" valor="5" imagen="impostor.png"/>
            </View>
            <View style={styles.contenedorBotonesIncio}>
                {/* Botón 1: Crear Partida */}
                <BotonInicio
                  title="Crear Partida"
                  onPress={() => navigation.navigate("ConfigurarPartida")}
                />
                {/* Botón 2: Categorías y Reglas */}
                <BotonInicio
                  title="Categorías y Reglas"
                  onPress={() => console.log("Abriendo Categorías y Reglas")}
                />
                {/* Botón 3: Iniciar Sesion */}
                <BotonInicio
                  title="Iniciar Sesión"
                  onPress={() => navigation.navigate("IniciarSesion")}
                />
            </View>
            <View style={styles.contenedorFooter}>
                <Footer />
            </View>
        </View>
    );
}

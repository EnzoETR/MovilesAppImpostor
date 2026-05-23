import {Text, View} from 'react-native';
import { styles } from '../styles/EstilosIndex';
import FichaEstadistica from '../components/ficha_estadistica';
import BotonInicio from '../components/boton_inicio';

export default function IndexScreen({ navigation }){
    return (
        <View style={styles.container}>
            <View style={styles.contenedorFichasEstadisticas}>
                <FichaEstadistica/>
                <FichaEstadistica/>
                <FichaEstadistica/>
            </View>
            <View style={styles.contenedorBotonesIncio}>
                <BotonInicio 
                title="Crear Partida"
                onPress={() => navigation.navigate("ConfigurarPartida")}
                />
                <BotonInicio />
                <BotonInicio />
            </View>
        </View>
    );
}
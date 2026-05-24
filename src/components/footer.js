import {View, Text, Image} from 'react-native';
import { styles } from '../styles/EstilosFooter';

export default function Footer() {
    return (
        <View style={styles.contenedorFooter}>
            <Image source={require('../../assets/iconos/utec.png')} style={styles.image} />
        </View>
    );
}
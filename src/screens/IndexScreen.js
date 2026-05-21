import {Text, View} from 'react-native';
import { styles } from '../styles/EstilosIndex';

export default function IndexScreen(){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hola Mundo</Text>
        </View>
    );
}

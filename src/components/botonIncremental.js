import { TouchableOpacity, Text } from "react-native";
import { styles } from "../styles/EstilosBoton";

export default function BotonIncremental({ title = 'Incrementar', onPress }){
    return (
        <TouchableOpacity style={styles.contenedorBotonIncremental} onPress={onPress} activeOpacity={0.8}>
            <Text style={styles.masmenos}>{title}</Text>
        </TouchableOpacity>
    );
}

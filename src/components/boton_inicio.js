import { TouchableOpacity, Text } from "react-native";
import { styles } from "../styles/EstilosBoton";

export default function BotonInicio({ title = 'Inicio', onPress }){
    return (
        <TouchableOpacity style={styles.contenedor} onPress={onPress} activeOpacity={0.8}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

import { View, Text} from "react-native";
import { styles } from "../styles/EstilosBoton";

export default function BotonInicio(){
    return (
        <View style={styles.contenedor}>
            <Text style={styles.text}>Inicio</Text>
        </View>
    );
}

import { View, Text, Image } from "react-native";
import { styles } from "../styles/EstilosFichaEstaditica";

const iconos = {
  'mando.png': require('../../assets/iconos/mando.png'),
  'victoria.png': require('../../assets/iconos/victoria.png'),
  'impostor.png': require('../../assets/iconos/impostor.png'),
};

export default function FichaEstadistica({titulo, valor, imagen}) {
    return (
        <View style={styles.contenedorGrande}>
            <Text>{titulo}</Text>
            <View style={styles.contenedorChico}>
                <Image source={iconos[imagen]} style={styles.image} />
                <Text style={styles.text}>{valor}</Text>
            </View>
        </View>
    );
}

import { View, Text, Image } from "react-native";
import { styles } from "../styles/EstilosFichaEstaditica";

export default function FichaEstadistica(){
    return (
        <View style={styles.contenedorGrande}>
            <Text >Titulo</Text>
            <View style={styles.contenedorChico}>
                <Image source={require('../../assets/favicon.png')} style={styles.image} />
                <Text style={styles.text}>20</Text>
            </View>
        </View>
    );
}

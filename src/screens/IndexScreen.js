import { Text, View, Image } from 'react-native';
import { styles } from '../styles/EstilosIndex';
import FichaEstadistica from '../components/ficha_estadistica';
import BotonInicio from '../components/boton_inicio';
import Footer from '../components/footer';
import ImagenPrinicipal from '../../assets/imagenes/ImpostorImagenPrincipal.png';
import { useState, useEffect } from 'react';

export default function IndexScreen({ navigation, route }) {
    // Estado local para mantener al usuario sincronizado
    const [usuario, setUsuario] = useState(route.params?.usuario || null);

    // Este efecto escucha cada vez que la pantalla vuelve a estar en primer plano (focus)
    useEffect(() => {
        if (route.params?.usuario !== undefined) {
            setUsuario(route.params.usuario);
        }
    }, [route.params?.usuario]);

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
                <BotonInicio
                  title="Crear Partida"
                  onPress={() => navigation.navigate("ConfigurarPartida", { usuario })}
                />
                {/* Botón 2: Categorías y Reglas */}
                <BotonInicio
                  title="Categorías y Reglas"
                   onPress={() => navigation.navigate("Categorias", { usuario })}
                />
                {/* Botón 3: Iniciar Sesión / Ver Perfil */}
                <BotonInicio
                  title={usuario ? `Perfil: ${usuario.nombre}` : "Iniciar Sesión"}
                  onPress={() => navigation.navigate("IniciarSesion", { usuario })}
                />
            </View>
            <View style={styles.contenedorFooter}>
                <Footer />
            </View>
        </View>
    );
}

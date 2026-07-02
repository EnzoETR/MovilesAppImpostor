import { Text, View, Image } from 'react-native';
import { styles } from '../styles/EstilosIndex';
import FichaEstadistica from '../components/ficha_estadistica';
import BotonInicio from '../components/boton_inicio';
import Footer from '../components/footer';
import ImagenPrinicipal from '../../assets/imagenes/ImpostorImagenPrincipal.png';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPartidasGuardadas } from '../utils/partidasStore';

export default function IndexScreen({ navigation }) {
    const { usuario } = useAuth();

    const [totalPartidas, setTotalPartidas] = useState(0);
    const [victoriasCiviles, setVictoriasCiviles] = useState(0);
    const [victoriasImpostores, setVictoriasImpostores] = useState(0);

    const API_URL = 'http://192.168.1.137:8088/api/v1';

    useEffect(() => {
        if (usuario) {
            cargarEstadisticas();
        } else {
            setTotalPartidas(0);
            setVictoriasCiviles(0);
            setVictoriasImpostores(0);
        }
    }, [usuario]);

    const cargarEstadisticas = async () => {
        try {
            const response = await fetch(`${API_URL}/partida/listarPartidas`);

            if (!response.ok) {
                throw new Error('Error al obtener partidas');
            }

            const partidas = await response.json();
            const partidasUsuario = (Array.isArray(partidas) ? partidas : []).filter(
                partida => String(partida.idUsuario) === String(usuario.id)
            );

            const total = partidasUsuario.length;
            const civiles = partidasUsuario.filter(partida => partida.ganoImpostor === false).length;
            const impostores = partidasUsuario.filter(partida => partida.ganoImpostor === true).length;

            setTotalPartidas(total);
            setVictoriasCiviles(civiles);
            setVictoriasImpostores(impostores);
        } catch (error) {
            console.log('Error cargando estadísticas del backend, usando respaldo local:', error);

            const partidasLocales = await getPartidasGuardadas();
            const partidasUsuario = partidasLocales.filter(
                partida => String(partida.idUsuario) === String(usuario.id)
            );

            setTotalPartidas(partidasUsuario.length);
            setVictoriasCiviles(partidasUsuario.filter(partida => partida.ganoImpostor === false).length);
            setVictoriasImpostores(partidasUsuario.filter(partida => partida.ganoImpostor === true).length);
        }
    };

    return (
        <View style={styles.container}>
            <Image 
                source={ImagenPrinicipal}
                style={styles.imagenPrincipal}
            />

            <View style={styles.contenedorFichasEstadisticas}>
                <FichaEstadistica 
                    titulo="PARTIDAS" 
                    valor={usuario ? String(totalPartidas) : "0"} 
                    imagen="mando.png"
                />

                <FichaEstadistica 
                    titulo="CIVILES" 
                    valor={usuario ? String(victoriasCiviles) : "0"} 
                    imagen="victoria.png"
                />

                <FichaEstadistica 
                    titulo="IMPOSTOR" 
                    valor={usuario ? String(victoriasImpostores) : "0"} 
                    imagen="impostor.png"
                />
            </View>

            <View style={styles.contenedorBotonesIncio}>
                <BotonInicio
                    title="Crear Partida"
                    onPress={() => navigation.navigate("ConfigurarPartida", { usuario })}
                />

                <BotonInicio
                    title="Categorías y Reglas"
                    onPress={() => navigation.navigate("Categorias", { usuario })}
                />

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
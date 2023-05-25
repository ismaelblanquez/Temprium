import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomBar from '../components/BottomBar';
function ProfileConfig({ navigation }) {
    const [email, setEmail] = useState('');

    const getEmail = async () => {
        const email = await AsyncStorage.getItem('email');
        setEmail(email);
    } 

    useEffect(() => {
        getEmail();
    }, []);

    const cerrarSesion = async () => {
        try {
            await AsyncStorage.removeItem('email');
            navigation.replace('Login'); // redirige al usuario a la pantalla de inicio de sesión
        } catch (error) {
            Alert.alert('Error', 'No se pudo cerrar sesión');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.tituloContainer}>
                    <Text style={styles.titulo}>
                        CONFIGURACIÓN{'\n'}
                        <Text style={styles.titulo2}>DE PERFIL</Text>
                    </Text>
                </View>
            </View>
            <View style={styles.contenido}>
                <View style={styles.row}>
                    <Text style={styles.label}>Correo electrónico:</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.texto}>{email}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={cerrarSesion}>
                <Text style={styles.buttonText}>CERRAR SESIÓN</Text>
            </TouchableOpacity>
            <BottomBar navigation={navigation} selectedTab="Config" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '5%',
    },
    headerContainer: {
        backgroundColor: '#E1F5FE',
        borderRadius: 12,
        borderWidth: 4,
        borderColor: '#0096C7',
        width: '80%',
        marginLeft: '9%',
        marginBottom: '10%',
        marginTop:'15%'
    },
    tituloContainer: {
        alignItems: 'center',
        padding: '4%',
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0096C7',
    },
    titulo2: {
        paddingLeft: '23%',
    },
    contenido: {
        marginBottom: '5%'
    },
    label: {
        marginRight: 8,
        fontSize: 16,
        color: '#023E8A',
        fontWeight: 'bold',
    },
    texto: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#023E8A',
    },
    button: {
        backgroundColor: '#0096C7',
        alignItems: 'center',
        padding: '5%',
        width: '80%',
        borderRadius: 8,
        marginBottom: '15%',
        alignSelf: 'center',    
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileConfig;

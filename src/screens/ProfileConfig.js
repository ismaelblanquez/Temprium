import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            <Text style={styles.text}>Configuración de perfil</Text>
            <View style={styles.row}>
                <Text style={styles.label}>Correo electrónico:</Text>
                <Text style={styles.texto}>{email}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={cerrarSesion}>
                <Text style={styles.buttonText}>Cerrar sesión</Text>
            </TouchableOpacity>
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
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
    },
    texto: {
        fontSize: 16,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    button: {
        backgroundColor: 'blue',
        padding: 16,
        borderRadius: 4,
        marginTop: 16,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ProfileConfig;

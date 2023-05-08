import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function ProfileConfig() {
    const [correoElectronico, setCorreoElectronico] = useState('ejemplo@correo.com');

    const cerrarSesion = () => {
        // Lógica para cerrar sesión
        console.log('Sesión cerrada');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Configuración de perfil</Text>
            <View style={styles.row}>
                <Text style={styles.label}>Correo electrónico:</Text>
                <Text style={styles.texto}>{correoElectronico}</Text>
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

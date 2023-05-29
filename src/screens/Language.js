import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Picker } from 'react-native';
import BottomBar from '../components/BottomBar';
function Language() {
    const [idioma, setIdioma] = useState('es'); // Valor inicial del idioma

    const handleChangeIdioma = (value) => {
        setIdioma(value);
    };

    const handleGuardarCambios = () => {
        // Lógica para guardar los cambios de idioma en la aplicación
        // Aquí puedes realizar llamadas a API, actualizar el estado de la aplicación, etc.
        console.log('Idioma actualizado:', idioma);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Idioma</Text>
            <View style={styles.optionContainer}>
                <Text style={styles.optionText}>Seleccionar idioma</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={idioma}
                    onValueChange={handleChangeIdioma}
                >
                    <Picker.Item label="Español" value="es" />
                    <Picker.Item label="Inglés" value="en" />
                    <Picker.Item label="Francés" value="fr" />
                    {/ Agregar más opciones de idioma aquí /}
                </Picker>
            </View>
            <Button title="Guardar cambios" onPress={handleGuardarCambios} />
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
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    optionContainer: {
        marginBottom: 16,
    },
    optionText: {
        fontSize: 16,
    },
    picker: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
    },
});

export default Language;
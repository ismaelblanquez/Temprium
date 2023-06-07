    import React, { useState } from 'react';
    import { View, Text, StyleSheet, Button, Switch } from 'react-native';
    import BottomBar from '../components/BottomBar';
    function Theme() {
        const [temaOscuro, setTemaOscuro] = useState(false); // Valor inicial del tema

        const handleChangeTema = (value) => {
            setTemaOscuro(value);
        };

        const handleGuardarCambios = () => {
            // Lógica para guardar los cambios de tema en la aplicación
            // Aquí puedes realizar llamadas a API, actualizar el estado de la aplicación, etc.

        };

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Tema</Text>
                <View style={styles.optionContainer}>
                    <Text style={styles.optionText}>Modo oscuro</Text>
                    <Switch
                        style={styles.switch}
                        value={temaOscuro}
                        onValueChange={handleChangeTema}
                    />
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
            flexDirection: 'row',
            alignItems: 'center',
        },
        optionText: {
            fontSize: 16,
            flex: 1,
        },
        switch: {
            marginLeft: 8,
        },
    });

    export default Theme;
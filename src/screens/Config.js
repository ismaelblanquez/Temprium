import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import BottomBar from '../components/BottomBar';



const Config = ({ navigation }) => {

    const data = [
        { id: 1, titulo: 'CONFIGURACIÓN DE PERFIL' },
        { id: 2, titulo: 'NOTIFICACIONES' },
        { id: 3, titulo: 'PRIVACIDAD' },
        { id: 4, titulo: 'SEGURIDAD' },
        { id: 5, titulo: 'IDIOMA' },
        { id: 6, titulo: 'TEMAS' },
    ];

    const handleItemPress = (item) => {
        switch (item.id) {
            case 1:
                navigation.navigate('ProfileConfig');
                break;
            case 2:
                navigation.navigate('Notifications');
                break;
            case 3:
                navigation.navigate('privacy');
                break;
            case 4:
                navigation.navigate('Security');
                break;
            case 5:
                navigation.navigate('Language');
                break;
            case 6:
                navigation.navigate('Theme');
                break;
            default:
                break;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.tituloContainer}>
                    <Text style={styles.titulo}>AJUSTES</Text>
                </View>
            </View>

            <View style={styles.container}>
                <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.tarjetaContainer} onPress={() => handleItemPress(item)}>
                            <View style={styles.infoContainer}>
                                <Text style={styles.tarjetaTitulo}>{item.titulo}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <BottomBar navigation={navigation} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
        marginTop: '5%'
    },
    headerContainer: {
        backgroundColor: '#E1F5FE',
        borderRadius: 12,
        borderWidth: 4,
        borderColor: '#0096C7',
        width: '80%',
        marginLeft: '9%',
        marginBottom: '15%',
    },
    tituloContainer: {
        alignItems: 'center',
        padding: '4%'
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0096C7',
    },
    tarjetaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '4%',
        marginRight: '4%',
        marginBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#0096C7',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'start',
        flex: 1,
        marginLeft: '4%',
        marginBottom: '4%',
    },
    tarjetaTitulo: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#0096C7',
    },
    tarjetaFlecha: {
        // alignItems: '',
        color: '#0096C7',
        fontWeight: 'bold'
    },
    botoneraContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#CCCCCC',
        paddingVertical: 8,
    },
    botoneraButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botoneraButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
    },
});

export default Config;
import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import BottomBar from '../components/BottomBar';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Extra = ({ navigation }) => {
    const [email, setEmail] = useState('');
    useEffect(() => {
        const getEmail = async () => {
          try {
            const storedEmail = await AsyncStorage.getItem('email');
            setEmail(storedEmail);
          } catch (error) {
            console.log('Error al obtener el correo electrónico:', error);
          }
        };
    
        getEmail();
      }, []);

      console.log(email);
      

    const data = [
        { id: 1, titulo: 'TAREAS DIARIAS' },
        // { id: 2, titulo: 'NOTIFICACIONES' },
        // { id: 3, titulo: 'PRIVACIDAD' },
        // { id: 4, titulo: 'SEGURIDAD' },
        // { id: 5, titulo: 'EXTRAS' },
        // { id: 5, titulo: 'IDIOMA' },
        // { id: 6, titulo: 'TEMAS' },
    ];

    const handleItemPress = (item) => {
        if(email){
            switch (item.id) {
                case 1:
                    navigation.navigate('DailyTasks');
                    break;
                case 2:
                    //navigation.navigate('Notifications');
                    Alert.alert("En mantenimiento");
                    break;
                case 3:
                    // navigation.navigate('privacy');
                    Alert.alert("En mantenimiento");
                    break;
                case 4:
                    navigation.navigate('Security');
                    break;
                case 5:
                    navigation.navigate('Extra');
                    break;
                case 6:
                    navigation.navigate('Theme');
                    break;
                default:
                    break;
            }
        }else{
            switch (item.id) {
                case 1:
                    navigation.navigate('DailyTasks');
                    break;
                case 2:
                    //navigation.navigate('Notifications');
                    Alert.alert("En mantenimiento");
                    break;
                case 3:
                    // navigation.navigate('privacy');
                    Alert.alert("En mantenimiento");
                    break;
                case 4:
                    //navigation.navigate('Security');
                    Alert.alert("Esta funcion no esta implementada en este usuario");
                    break;
                case 5:
                    navigation.navigate('Extra');
                    break;
                case 6:
                    navigation.navigate('Theme');
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.tituloContainer}>
                    <Text style={styles.titulo}>EXTRAS</Text>
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

            <BottomBar navigation={navigation} selectedTab="Config" />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
        // marginTop: '5%'
    },
    headerContainer: {
        backgroundColor: '#E1F5FE',
        // borderRadius: 12,
        // borderWidth: 4,
        borderColor: '#0096C7',
        width: '80%',
        marginLeft: '9%',
        marginBottom: '15%',
        marginTop:'15%'
    },
    tituloContainer: {
        alignItems: 'center',
        padding: '4%'
    },
    titulo: {
        fontSize: 30,
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
       
        flex: 1,
        marginLeft: '4%',
        marginBottom: '4%',
    },
    tarjetaTitulo: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#0096C7',
    },

});

export default Extra;
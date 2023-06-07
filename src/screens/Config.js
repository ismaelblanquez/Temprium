import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import BottomBar from '../components/BottomBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Config = ({ navigation }) => {
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

  const data = [
    { id: 1, titulo: 'CONFIGURACIÓN DE PERFIL' },
    { id: 2, titulo: 'NOTIFICACIONES' },
    { id: 3, titulo: 'PRIVACIDAD' },
    { id: 4, titulo: 'SEGURIDAD' },
    { id: 5, titulo: 'EXTRAS' },
    // { id: 5, titulo: 'IDIOMA' },
    // { id: 6, titulo: 'TEMAS' },
  ];

  const switchCases = {
    1: 'ProfileConfig',
    2: email ? 'Notifications' : () => Alert.alert('En mantenimiento'),
    3: 'Privacy',
    4: email ? 'Security' : () => Alert.alert('Esta función no está implementada en este usuario'),
    5: 'Extra',
    6: 'Theme',
  };

  const handleItemPress = (item) => {
    const action = switchCases[item.id];
    if (typeof action === 'string') {
      navigation.navigate(action);
    } else if (typeof action === 'function') {
      action();
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

      <BottomBar navigation={navigation} selectedTab="Config" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    backgroundColor: '#E1F5FE',
    width: '80%',
    marginLeft: '9%',
    marginBottom: '15%',
    marginTop: '15%',
  },
  tituloContainer: {
    alignItems: 'center',
    padding: '4%',
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

export default Config;

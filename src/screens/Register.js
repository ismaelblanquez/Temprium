import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { addUsuario } from '../DataBase/Conexion';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repPassword, setRepPassword] = useState('');

  const handleRegister = () => {
    if (email === '' || password === '' || repPassword === '') {
      Alert.alert('Error', 'Uno de los campos contiene datos vacíos');
      return;
    }

    if (password !== repPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    addUsuario(email, password)
      .then(() => {
        console.log('Usuario registrado');
        navigation.replace('Login');
      })
      .catch(error => Alert.alert(`Error al registrar usuario`));
  };

  return (
    <View style={styles.container}>
      <Image style={styles.cabecera} source={require('../assets/images/Cabecera.png')} />
      <Text style={styles.title}>REGISTRO</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
          placeholderTextColor="#BDBDBD"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
          placeholderTextColor="#BDBDBD"
        />
        <TextInput
          style={styles.input}
          placeholder="Repetir contraseña"
          secureTextEntry
          value={repPassword}
          onChangeText={text => setRepPassword(text)}
          placeholderTextColor="#BDBDBD"
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
        <Text style={styles.loginButtonText}>REGISTRARSE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  cabecera: {
    height: '18%',
    width: '100%',
  },
  title: {
    marginTop: 40,
    marginBottom: 40,
    fontSize: 35,
    color: '#1A1A1A',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 30,
    width: '80%',
  },
  input: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#1A1A1A',
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 50,
    color: '#1A1A1A',
  },
  loginButton: {
    backgroundColor: '#0096C7',
    paddingHorizontal: 90,
    paddingVertical: 10,
    borderRadius: 8,
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Register;

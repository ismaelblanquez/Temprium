import React, { useContext, useState,useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { db, addUsuario } from '../DataBase/Conexion';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthContext';
import 'setimmediate';

const Register = ({ navigation }) => {
  const {setUserEmail} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repPassword, setRepPassword] = useState('');
  const handleTitle = () => {
    // Aquí puedes agregar la lógica para iniciar sesión
    console.log('REGISTRO');
  };

  const handleLogin = () => {
    // Aquí puedes agregar la lógica para iniciar sesión
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Repetir password:', repPassword);
    AsyncStorage.setItem('UserEmail',email);
    setUserEmail(email);
    if (email != '' && password != '') {
      addUsuario(email, password)
        .then(() => console.log('Usuario registrado'))
        .catch(error => console.log(`Error al registrar usuario: ${error.message}`));
    } else {
      console.log("Error, uno de los campos contiene datos vacíos");
    }
    // navigation.navigate("Home");
  };

  const handleGuest = () => {
    // Aquí puedes agregar la lógica para iniciar sesión como invitado
    console.log('Iniciar sesión como invitado');
  };

  const handleForgotPassword = () => {
    // Aquí puedes agregar la lógica para recuperar la contraseña
    console.log('Recuperar contraseña');
  };

  const handleRegister = () => {
    // Aquí puedes agregar la lógica para registrar una nueva cuenta
    console.log('Registrarse');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.cabecera} source={require('../assets/images/Cabecera.png')} />
      <TextInput
        style={styles.title}
        value='REGISTRO'
        onChangeText={(title) => setEmail(title)}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Repetir contraseña"
          secureTextEntry
          value={password}
          onChangeText={(text) => setRepPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>REGISTRARSE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF', //#F7FAFC
  },
  cabecera: {
    height: '18%',
    width: '100%',
  },
  title: { //registro
    marginTop: 40,
    marginBottom: 40,
    fontSize: 25,
    color: '#1A1A1A',
    textAlign: 'center'
  },
  inputContainer: {
    marginBottom: 30,
    width: '80%',
  },
  input: {
    height: 40,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#1A1A1A', //#1A1A1A
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#BDBDBD', //#BDBDBD
  },
  loginButton: {
    backgroundColor: '#0096C7',
    paddingHorizontal: 90,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 40,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default Register;
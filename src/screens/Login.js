import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import 'setimmediate';
import { existeUsuario, verificarUsuario, buscarUsuario} from '../DataBase/Conexion';
import AsyncStorage from '@react-native-async-storage/async-storage';




// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const verificarUsuario = async (email, password) => {
  //   const existe = await existeUsuario(email, password);
  //   if (existe) {
  //     console.log('Usuario existe');
  //     // Aquí podrías agregar lógica adicional para iniciar sesión
  //     return true;
  //   } else {
  //     console.log('Usuario no existe');
  //     // Aquí podrías agregar lógica adicional para manejar el caso en que el usuario no exista
  //     return false;
  //   }
  // };


  const handleTitle = () => {
    // Aquí puedes agregar la lógica para iniciar sesión
    console.log('INICIO DE SESIÓN');
  };

const handleLogin = async () => {
  console.log('Email:', email);
  console.log('Password:', password);
  await AsyncStorage.setItem('email', email);
  await AsyncStorage.setItem('password', password);

    verificarUsuario(email, password)
      .then(() => navigation.replace("Home"))
      .catch(error => console.log(`Error al buscar usuario: ${error.message}`));

    // const usuarioExiste = await verificarUsuario(email, password);
    // if (usuarioExiste) {
    //   navigation.navigate('Home');
    // }
  };



  const handleGuest = () => {
    // Aquí puedes agregar la lógica para iniciar sesión como invitado
    console.log('Iniciar sesión como invitado');
    navigation.replace('Home');
  };

  const handleForgotPassword = () => {
    // Aquí puedes agregar la lógica para recuperar la contraseña
    console.log('Recuperar contraseña');
  };

  const handleRegister = () => {
    // Aquí puedes agregar la lógica para registrar una nueva cuenta
    console.log('Registrarse');
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.cabecera} source={require('../assets/images/Cabecera.png')} />
      <TextInput
        style={styles.title}
        value='INICIO DE SESIÓN'
        onChangeText={(title) => setEmail(title)}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor = '#BDBDBD'
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor = '#BDBDBD'
        />
        <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>¿OLVIDASTE TU CONTRASEÑA?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>ENTRAR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.guestButton} onPress={handleGuest}>
        <Text style={styles.guestButtonText}>ENTRAR COMO INVITADO</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>¿NO TIENES CUENTA?</Text>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.registerLink}>REGÍSTRATE AHORA</Text>
        </TouchableOpacity>
      </View>
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
  title: { //inicio de sesion
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 25,
    fontSize: 25,
    color: '#1A1A1A',
  },
  inputContainer: {
    marginBottom: 20,
    width: '80%'
  },
  input: {
    height: 40,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#1A1A1A',
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#1A1A1A'
    },
  forgotPasswordButton: {
    alignSelf: 'center'
  },
  forgotPasswordText: {
    color: '#1A1A1A',
    fontSize: 12
  },
  loginButton: {
    backgroundColor: '#0096C7',
    paddingHorizontal: 90,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  guestButton: {
    backgroundColor: '#0096C7',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  guestButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  registerContainer: {
    //alignItems: 'bottom',
    paddingVertical: 20
  },
  registerText: {
    marginTop: 30,
    alignItems: 'center',
    color: '#1A1A1A',
    fontSize: 12
  },
  registerLink: {
    color: '#0096C7',
    fontWeight: 'bold',
    fontSize: 12
  },
});
export default Login;
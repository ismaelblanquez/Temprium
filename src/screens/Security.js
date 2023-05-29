import React, { useState } from 'react';
import { verificarContraseña, updateContraseña } from '../DataBase/Conexion';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomBar from '../components/BottomBar';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Switch,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';

  function Seguridad({navigation}) {
  const [contrasena, setContrasena] = useState('');
  const [contrasenaAnterior, setContrasenaAnterior] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [autenticacionDosFactores, setAutenticacionDosFactores] =
    useState(false);
    const [email, setEmail] = useState('');

  const handleChangeContrasena = (text) => {
    setContrasena(text);
  };

  const handleChangeContrasenaAnterior = (text) => {
    setContrasenaAnterior(text);
  };

  const handleChangeConfirmarContrasena = (text) => {
    setConfirmarContrasena(text);
  };

  const toggleAutenticacionDosFactores = () => {
    setAutenticacionDosFactores(!autenticacionDosFactores);
  };

  const handleGuardarCambios = async() => {
    // Lógica para guardar los cambios de seguridad en la aplicación
    // Aquí puedes realizar llamadas a API, actualizar el estado de la aplicación, etc.
    console.log('Contraseña actualizada:', contrasena);
    console.log('Contraseña anterior:', contrasenaAnterior);
    console.log('Confirmar contraseña:', confirmarContrasena);
    console.log('Autenticación de dos factores:', autenticacionDosFactores);
    const email = await AsyncStorage.getItem('email');
    setEmail(email);
    console.log(email);

    const contraseñaExiste = await verificarContraseña(contrasenaAnterior);
    console.log(contraseñaExiste)
    if(contraseñaExiste)
    {
      if(contrasena == confirmarContrasena){
          updateContraseña(contrasena,email)
          .then( () => console.log('Contraseña cambiada'), navigation.replace('Login'))
          .catch((error)=>console.log(error))
      }else{
        Alert.alert('La nueva contraseña no coincide')
      }
    }


  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.tituloContainer}>
          <Text style={styles.titulo}>SEGURIDAD</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Contraseña anterior"
          secureTextEntry
          value={contrasenaAnterior}
          onChangeText={handleChangeContrasenaAnterior}
          placeholderTextColor = '#BDBDBD'
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña nueva"
          secureTextEntry
          value={contrasena}
          onChangeText={handleChangeContrasena}
          placeholderTextColor = '#BDBDBD'
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          secureTextEntry
          value={confirmarContrasena}
          onChangeText={handleChangeConfirmarContrasena}
          placeholderTextColor = '#BDBDBD'
        />
        <View style={styles.optionContainer}>
          {/* <Text style={styles.optionText}>Autenticación de dos factores</Text>
          <Switch
            trackColor={{ true: '#0096C7', false: '#E1F5FE' }}
            value={autenticacionDosFactores}
            onValueChange={toggleAutenticacionDosFactores}
            thumbColor={autenticacionDosFactores ? '#E1F5FE' : '#0096C7'}
          /> */}
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleGuardarCambios}>
        <Text style={styles.buttonText}>GUARDAR CAMBIOS</Text>
      </TouchableOpacity>
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
  headerContainer: {
    backgroundColor: '#E1F5FE',
    // borderRadius: 12,
    // borderWidth: 4,
    borderColor: '#0096C7',
    width: '80%',
    marginLeft: '9%',
    marginBottom: '10%',
    marginTop:'15%'
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
  inputContainer: {
    marginBottom: 30,
    width: '80%',
    marginLeft: '9%',
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#1A1A1A', //#1A1A1A
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#1A1A1A',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  optionText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0096C7',
    alignItems: 'center',
    padding: '3%',
    width: '80%',
    height: 50,
    borderRadius: 8,
    marginBottom: '15%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Seguridad;
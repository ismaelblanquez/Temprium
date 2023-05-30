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
            <Text style={styles.text}>Seguridad</Text>
            <View style={styles.optionContainer}>
                <Text style={styles.optionText}>Contraseña anterior</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={contrasenaAnterior}
                    onChangeText={handleChangeContrasenaAnterior}
                />
            </View>
            <View style={styles.optionContainer}>
                <Text style={styles.optionText}>Contraseña nueva</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={contrasena}
                    onChangeText={handleChangeContrasena}
                />
            </View>
            <View style={styles.optionContainer}>
                <Text style={styles.optionText}>Confirmar contraseña</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={confirmarContrasena}
                    onChangeText={handleChangeConfirmarContrasena}
                />
            </View>
            <View style={styles.optionContainer}>
                <Text style={styles.optionText}>Autenticación de dos factores</Text>
                <Switch
                    value={autenticacionDosFactores}
                    onValueChange={toggleAutenticacionDosFactores}
                />
            </View>
            <Button title="Guardar cambios" onPress={handleGuardarCambios} />
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
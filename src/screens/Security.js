import React, { useState } from 'react';
import {
View,
Text,
StyleSheet,
Button,
TextInput,
Switch,
} from 'react-native';

function Security() {
const [contrasena, setContrasena] = useState('');
const [contrasenaAnterior, setContrasenaAnterior] = useState('');
const [confirmarContrasena, setConfirmarContrasena] = useState('');
const [autenticacionDosFactores, setAutenticacionDosFactores] =
useState(false);

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

const handleGuardarCambios = () => {
// Lógica para guardar los cambios de seguridad en la aplicación
// Aquí puedes realizar llamadas a API, actualizar el estado de la aplicación, etc.
console.log('Contraseña actualizada:', contrasena);
console.log('Contraseña anterior:', contrasenaAnterior);
console.log('Confirmar contraseña:', confirmarContrasena);
console.log('Autenticación de dos factores:', autenticacionDosFactores);
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
text: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 16,
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
input: {
flex: 1,
height: 40,
marginLeft: 16,
borderWidth: 1,
borderColor: 'gray',
borderRadius: 4,
paddingHorizontal: 8,
},
});

export default Security;
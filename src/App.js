// Importar las dependencias necesarias
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Home from './screens/Home';
import RegisterHours from './screens/RegisterHours';
import Register from './screens/Register';
import BottomBar from './components/BottomBar';
import FilterHours from './screens/FilterHours';
import Config from './screens/Config';
// import Notifications from './screens/Notifications';
import Language from './screens/Language';
import Privacy from './screens/Privacy';
import Security from './screens/Security';
import Theme from './screens/Theme';
import ProfileConfig from './screens/ProfileConfig';
import AuthContext from './services/AuthContext';
import 'setimmediate';

// Definir los componentes Login y Home
// const Login = ({ navigation }) => {
//   const handleLogin = () => {
//     // Navegar a la pantalla Home
//     navigation.navigate('Home');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Bienvenido al Login</Text>
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Ingresar</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

<Login></Login>;

{/* <Home></Home>; */}

// Crear el StackNavigator y definir las rutas
const Stack = createStackNavigator();
const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="RegisterHours" component={RegisterHours} />
        <Stack.Screen name="FilterHours" component={FilterHours} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Config" component={Config} />
        {/* <Stack.Screen name="Notifications" component={Notifications} /> */}
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen name="Security" component={Security} />
        <Stack.Screen name="Theme" component={Theme} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="ProfileConfig" component={ProfileConfig} />
        <Stack.Screen
        name="BottomBar"
        component={BottomBar}
        options={{ headerShown: false }}
      />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Definir los estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;

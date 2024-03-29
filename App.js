// Importar las dependencias necesarias
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity,useEffect } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import RegisterHours from './src/screens/RegisterHours';
import Register from './src/screens/Register';
import BottomBar from './src/components/BottomBar';
import FilterHours from './src/screens/FilterHours';
import Config from './src/screens/Config';
import Language from './src/screens/Language';
import Privacy from './src/screens/Privacy';
import Security from './src/screens/Security';
import Theme from './src/screens/Theme';
import ForgotPassword from './src/screens/ForgotPassword';
import ProfileConfig from './src/screens/ProfileConfig';
import Calendar from './src/screens/Calendar';
import DailyTasks from './src/screens/DailyTasks';
import AuthContext from './src/services/AuthContext';
import Extra from './src/screens/Extra';
import 'setimmediate';
import { SafeAreaProvider } from 'react-native-safe-area-context';


// Crear el StackNavigator y definir las rutas
const Stack = createStackNavigator();


const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterHours" component={RegisterHours} options={{ headerShown: false }} />
          <Stack.Screen name="FilterHours" component={FilterHours} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="Config" component={Config} options={{ headerShown: false }} />
          <Stack.Screen name="DailyTasks" component={DailyTasks} options={{ headerShown: false }} />
          <Stack.Screen name="Language" component={Language} options={{ headerShown: false }} />
          <Stack.Screen name="Security" component={Security} options={{ headerShown: false }} />
          <Stack.Screen name="Theme" component={Theme} options={{ headerShown: false }} />
          <Stack.Screen name="Calendar" component={Calendar} options={{ headerShown: false }} />
          <Stack.Screen name="Privacy" component={Privacy} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
          <Stack.Screen name="Extra" component={Extra} options={{ headerShown: false }} />
          <Stack.Screen name="ProfileConfig" component={ProfileConfig} options={{ headerShown: false }} />
          <Stack.Screen
            name="BottomBar"
            component={BottomBar}
            options={{ headerShown: false }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};


export default App;
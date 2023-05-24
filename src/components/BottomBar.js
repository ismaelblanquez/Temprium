import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BottomBar = ({ navigation }) => {
  const goToHome = () => {
    // Acción al presionar el botón de Home
    
    navigation.replace('Home');
  };

  const goToFilters = () => {
    // Acción al presionar el botón de filtros
    
    navigation.replace('FilterHours');
  };

  const goToTime = () => {
    // Acción al presionar el botón de tiempo
    
    navigation.replace('RegisterHours');
  };

  const goToCalendar = () => {
    // Acción al presionar el botón de calendario
    
    navigation.replace('Calendar');
  };

  const goToSettings = () => {
    // Acción al presionar el botón de ajustes
   
    navigation.navigate('Config');
  };

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity style={styles.navButton} onPress={goToHome}>
        <Ionicons name="home-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={goToFilters}>
        <Ionicons name="funnel-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.highlightedButton} onPress={goToTime}>
        <Ionicons name="time-outline" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={goToCalendar}>
        <Ionicons name="calendar-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={goToSettings}>
        <Ionicons name="settings-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    // position: fixed,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    // bottom: 0,
    // width: '100%',
  },
  navButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightedButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0096C7',
    borderRadius: 100,
    height: 30,
    width: 30,
    // padding: 8,
    // paddingLeft: 9.5,
  },
});

export default BottomBar;

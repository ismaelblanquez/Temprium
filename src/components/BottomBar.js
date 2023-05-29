import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BottomBar = ({ navigation, selectedTab }) => {

  console.log(selectedTab);
  const handleTabPress = (selectedTab) => {
    navigation.replace(selectedTab);
  };

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={[styles.navButton, selectedTab === 'Home' && styles.highlightedButton]}
        onPress={() => handleTabPress('Home')}
      >
        <Ionicons name="home-outline" size={selectedTab === 'Home' ? 30 : 24} color={selectedTab === 'Home' ? 'white' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navButton, selectedTab === 'FilterHours' && styles.highlightedButton]}
        onPress={() => handleTabPress('FilterHours')}
      >
        <Ionicons name="funnel-outline" size={selectedTab === 'FilterHours' ? 30 : 24} color={selectedTab === 'FilterHours' ? '#FFFFFF' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navButton, selectedTab === 'RegisterHours' && styles.highlightedButton]}
        onPress={() => handleTabPress('RegisterHours')}
      >
        <Ionicons name="time-outline" size={selectedTab === 'RegisterHours' ? 30 : 28} color={selectedTab === 'RegisterHours' ? '#FFFFFF' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navButton, selectedTab === 'Calendar' && styles.highlightedButton]}
        onPress={() => handleTabPress('Calendar')}
      >
        <Ionicons name="calendar-outline" size={selectedTab === 'Calendar' ? 30 : 24} color={selectedTab === 'Calendar' ? '#FFFFFF' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navButton, selectedTab === 'Config' && styles.highlightedButton]}
        onPress={() => handleTabPress('Config')}
      >
        <Ionicons name="settings-outline" size={selectedTab === 'Config' ? 30 : 24} color={selectedTab === 'Config' ? '#FFFFFF' : 'black'} />
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
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  navButton: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  highlightedButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0096C7',
    borderRadius: 80,
    height: 40,
    width: 40,
  },
});

export default BottomBar;

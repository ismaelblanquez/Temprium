import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BottomBar = ({ navigation, selectedTab }) => {
  const handleTabPress = (selectedTab) => {
    navigation.replace(selectedTab);
  };

  const navButtons = [
    { name: 'home-outline', size: 24, color: 'black', route: 'Home' },
    { name: 'funnel-outline', size: 24, color: 'black', route: 'FilterHours' },
    { name: 'time-outline', size: 28, color: 'black', route: 'RegisterHours' },
    { name: 'calendar-outline', size: 24, color: 'black', route: 'Calendar' },
    { name: 'settings-outline', size: 24, color: 'black', route: 'Config' },
  ];

  return (
    <View style={styles.bottomBar}>
      {navButtons.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.navButton,
            selectedTab === button.route && styles.highlightedButton
          ]}
          onPress={() => handleTabPress(button.route)}
        >
          <Ionicons name={button.name} size={selectedTab === button.route ? 30 : button.size} color={selectedTab === button.route ? '#FFFFFF' : button.color} />
        </TouchableOpacity>
      ))}
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

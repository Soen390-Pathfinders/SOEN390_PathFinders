import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // For icons


type ToggleAccessibilityProps = {
    showIcons: boolean;
    setShowIcons: (value: boolean) => void;
  };

const ToggleAccessibility = ({ showIcons, setShowIcons }: ToggleAccessibilityProps) => {

    return (
        <TouchableOpacity 
          onPress={() => setShowIcons(!showIcons)}
          style={styles.toggleButton}
        >
          <Text>{showIcons ? 'Hide Amenities' : 'Show Amenities'}</Text>
        </TouchableOpacity>
      );
    }
    
    const styles = StyleSheet.create({
      toggleButton: {
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        alignSelf: 'center',
      },
    });

export default ToggleAccessibility;
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have this library installed

const GuestSelectionScreen = () => {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  const increaseAdults = () => setAdults(adults + 1);
  const decreaseAdults = () => {
    if (adults > 0) setAdults(adults - 1);
  };

  const increaseChildren = () => setChildren(children + 1);
  const decreaseChildren = () => {
    if (children > 0) setChildren(children - 1);
  };

  return (
    <View style={styles.container}>
      {/* Exit Button */}
      <TouchableOpacity style={styles.exitButton}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>

      {/* Location Input */}
      <TextInput
        style={styles.input}
        placeholder="Location"
        placeholderTextColor="#aaa"
      />

      {/* Dates Display */}
      <TouchableOpacity style={styles.dateDisplay}>
        <Text style={styles.dateText}>23 - 31 May</Text>
      </TouchableOpacity>

      {/* Guest Selection */}
      <Text style={styles.guestTitle}>How many guests?</Text>
      
      <View style={styles.guestRow}>
        <Text style={styles.guestLabel}>Adults</Text>
        <View style={styles.counter}>
          <TouchableOpacity onPress={decreaseAdults} style={styles.counterButton}>
            <Text style={styles.counterButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterText}>{adults}</Text>
          <TouchableOpacity onPress={increaseAdults} style={styles.counterButton}>
            <Text style={styles.counterButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.guestRow}>
        <Text style={styles.guestLabel}>Children</Text>
        <View style={styles.counter}>
          <TouchableOpacity onPress={decreaseChildren} style={styles.counterButton}>
            <Text style={styles.counterButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterText}>{children}</Text>
          <TouchableOpacity onPress={increaseChildren} style={styles.counterButton}>
            <Text style={styles.counterButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.clearText}>Clear all</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: 'white', position: 'relative' },
  exitButton: { position: 'absolute', top: 16, right: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    color: '#333',
  },
  dateDisplay: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
  },
  dateText: {
    color: '#333',
  },
  guestTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  guestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  guestLabel: {
    fontSize: 16,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 50,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonText: {
    fontSize: 18,
    color: '#333',
  },
  counterText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clearButton: { alignItems: 'center', padding: 16 },
  clearText: { fontSize: 16, color: 'gray' },
  searchButton: {
    backgroundColor: '#00C1D4',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GuestSelectionScreen;

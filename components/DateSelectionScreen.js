import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const DateSelectionScreen = () => {
  const [days, setDays] = useState(1); // Number of days

  // Function to handle increasing the number of days
  const increaseDays = () => setDays(days + 1);

  // Function to handle decreasing the number of days
  const decreaseDays = () => {
    if (days > 1) setDays(days - 1);
  };

  return (
    <View style={styles.container}>
      {/* Exit Button */}
      <TouchableOpacity style={styles.exitButton}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>When staying</Text>
      
      {/* Date Selection Options */}
      <View style={styles.dateSelectionContainer}>
        <TouchableOpacity style={styles.dateOptionActive}>
          <Text style={styles.dateOptionText}>Choose dates</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dateOptionInactive}>
          <Text style={styles.dateOptionText}>Anytime</Text>
        </TouchableOpacity>
      </View>
      
      {/* Calendar Display (Static, for layout purposes) */}
      <View style={styles.calendar}>
        <Text style={styles.calendarMonth}>February 2022</Text>
        <View style={styles.calendarGrid}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <Text key={day} style={styles.calendarDay}>{day}</Text>
          ))}
          {/* Placeholder dates for February */}
          {Array.from({ length: 28 }, (_, i) => (
            <Text key={i} style={styles.calendarDate}>{i + 1}</Text>
          ))}
        </View>
      </View>
      
      {/* Days Selector */}
      <View style={styles.daysSelector}>
        <TouchableOpacity onPress={decreaseDays} style={styles.dayButton}>
          <Text style={styles.dayButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.daysText}>{days} days</Text>
        <TouchableOpacity onPress={increaseDays} style={styles.dayButton}>
          <Text style={styles.dayButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Clear and Search Buttons */}
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
  exitButton: { position: 'absolute', top: 16, right: 16, zIndex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  dateSelectionContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  dateOptionActive: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#00C1D4', borderRadius: 8 },
  dateOptionInactive: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#f0f0f0', borderRadius: 8 },
  dateOptionText: { color: 'white', fontWeight: 'bold' },
  calendar: { alignItems: 'center', marginBottom: 16 },
  calendarMonth: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'space-evenly' },
  calendarDay: { width: '14%', textAlign: 'center', fontWeight: 'bold', color: '#888' },
  calendarDate: { width: '14%', textAlign: 'center', marginVertical: 4 },
  daysSelector: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  dayButton: { padding: 8, backgroundColor: '#f0f0f0', borderRadius: 8, marginHorizontal: 8 },
  dayButtonText: { fontSize: 18, color: '#555' },
  daysText: { fontSize: 16, fontWeight: 'bold' },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 16 },
  skipButton: { alignItems: 'center', padding: 16 },
  skipText: { fontSize: 16, color: 'gray' },
  nextButton: { backgroundColor: '#00C1D4', borderRadius: 8, alignItems: 'center', paddingVertical: 16, paddingHorizontal: 32 },
  nextButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  bottomButtons: { position: 'absolute', bottom: 16, left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  clearButton: { alignItems: 'center', padding: 16 },
  clearText: { fontSize: 16, color: 'gray' },
  searchButton: { backgroundColor: '#00C1D4', borderRadius: 8, alignItems: 'center', paddingVertical: 16, paddingHorizontal: 32 },
  searchButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});

export default DateSelectionScreen;

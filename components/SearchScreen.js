import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "./HomeScreen";
import { NavigationContainer } from '@react-navigation/native';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      {/* Exit Button */}
      <TouchableOpacity style={styles.exitButton} onPress={() => navigation.navigate('HomeScreen')}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Where to?</Text>
      
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search" />
      </View>
      
      {/* Options (Anywhere, Europe, Asia) */}
      <View style={styles.optionsContainer}>
        <View style={styles.option}>
          <Image source={{uri: 'https://photo.znews.vn/w860/Uploaded/jaroin/2017_10_02/02_Bavaria_travelandleisure_1.jpg'}} style={styles.optionImage} />
          <Text style={styles.optionText}>Anywhere</Text>
        </View>
        
        <View style={styles.option}>
          <Image source={{uri: 'https://media-cdn.tripadvisor.com/media/photo-c/1280x250/17/15/6d/d6/paris.jpg'}} style={styles.optionImage} />
          <Text style={styles.optionText}>Europe</Text>
        </View>
        
        <View style={styles.option}>
          <Image source={{uri: 'https://cdnphoto.dantri.com.vn/R5anasgck8LnSKyaL43dDfjt6DY=/thumb_w/960/2020/07/06/thanhbinh-67-docx-1594030048659.jpeg'}} style={styles.optionImage} />
          <Text style={styles.optionText}>Asia</Text>
        </View>
      </View>

      {/* Details (When, Guests) */}
      <TouchableOpacity style={styles.detailButton}>
        <Text style={styles.detailText}>When</Text>
        <Text style={styles.detailAdd}>Add time</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.detailButton}>
        <Text style={styles.detailText}>Guests</Text>
        <Text style={styles.detailAdd}>Add guests</Text>
      </TouchableOpacity>

      {/* Bottom Buttons (Clear All and Search) */}
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
  searchContainer: { backgroundColor: '#f0f0f0', borderRadius: 8, padding: 8, marginBottom: 16 },
  searchInput: { fontSize: 16 },
  optionsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  option: { alignItems: 'center' },
  optionImage: { width: 80, height: 80, borderRadius: 8 },
  optionText: { marginTop: 8, fontSize: 16 },
  detailButton: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  detailText: { fontSize: 16 },
  detailAdd: { fontSize: 16, color: 'gray' },
  bottomButtons: { position: 'absolute', bottom: 16, left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  clearButton: { alignItems: 'center', padding: 16 },
  clearText: { fontSize: 16, color: 'gray' },
  searchButton: { backgroundColor: '#00C1D4', borderRadius: 8, alignItems: 'center', paddingVertical: 16, paddingHorizontal: 32 },
  searchButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});

export default SearchScreen;

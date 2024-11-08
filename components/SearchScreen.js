import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet,Image } from 'react-native';
import { Calendar } from 'react-native-calendars';

const SearchScreen = () => {
    const [activeSection, setActiveSection] = useState(null); // Stores which section is active
    const [location, setLocation] = useState('Anywhere');
    const [dates, setDates] = useState('Choose dates');
    const [selectedDates, setSelectedDates] = useState({});
    const [guests, setGuests] = useState({ adults: 0, children: 0 });

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    // Function to handle date selection from the calendar
    const onDayPress = (day) => {
        const newDates = { ...selectedDates };
        if (newDates[day.dateString]) {
            // Toggle off if already selected
            delete newDates[day.dateString];
        } else {
            // Toggle on if not selected
            newDates[day.dateString] = { selected: true, selectedColor: '#00aaff' };
        }
        setSelectedDates(newDates);

        // Format and set display dates
        const dateKeys = Object.keys(newDates);
        if (dateKeys.length > 0) {
            const formattedDates = `${dateKeys[0]} - ${dateKeys[dateKeys.length - 1]}`;
            setDates(formattedDates);
        } else {
            setDates('Choose dates');
        }
    };

    return (
        
        <View style={styles.container}>
            {/* Location Section */}
            <TouchableOpacity onPress={() => toggleSection('location')}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Where to?</Text>
                    <Text style={styles.sectionValue}>{location}</Text>
                </View>
            </TouchableOpacity>
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
            {activeSection === 'location' && (
                <View style={styles.expandedSection}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter location"
                        value={location}
                        onChangeText={setLocation}
                    />
                    <Button title="Close" onPress={() => toggleSection(null)} />
                </View>
            )}

            {/* Date Section */}
            <TouchableOpacity onPress={() => toggleSection('dates')}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>When staying</Text>
                    <Text style={styles.sectionValue}>{dates}</Text>
                </View>
            </TouchableOpacity>
            {activeSection === 'dates' && (
                <View style={styles.expandedSection}>
                    <Calendar
                        onDayPress={onDayPress}
                        markedDates={selectedDates}
                        markingType={'period'}
                    />
                    <Button title="Close" onPress={() => toggleSection(null)} />
                </View>
            )}

            {/* Guests Section */}
            <TouchableOpacity onPress={() => toggleSection('guests')}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>How many guests?</Text>
                    <Text style={styles.sectionValue}>{`Adults: ${guests.adults}, Children: ${guests.children}`}</Text>
                </View>
            </TouchableOpacity>
            {activeSection === 'guests' && (
                <View style={styles.expandedSection}>
                    <Text style={styles.modalText}>Guests</Text>
                    <View style={styles.guestSelector}>
                        <Text>Adults</Text>
                        <Button title="-" onPress={() => setGuests({ ...guests, adults: Math.max(0, guests.adults - 1) })} />
                        <Text>{guests.adults}</Text>
                        <Button title="+" onPress={() => setGuests({ ...guests, adults: guests.adults + 1 })} />
                    </View>
                    <View style={styles.guestSelector}>
                        <Text>Children</Text>
                        <Button title="-" onPress={() => setGuests({ ...guests, children: Math.max(0, guests.children - 1) })} />
                        <Text>{guests.children}</Text>
                        <Button title="+" onPress={() => setGuests({ ...guests, children: guests.children + 1 })} />
                    </View>
                    <Button title="Close" onPress={() => toggleSection(null)} />
                </View>
            )}

            {/* Clear All and Search Buttons */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => {
                    setLocation('Anywhere');
                    setDates('Choose dates');
                    setGuests({ adults: 0, children: 0 });
                    setSelectedDates({});
                }}>
                    <Text style={styles.clearButton}>Clear all</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.searchButton} onPress={() => alert('Search!')}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    section: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    sectionValue: { fontSize: 14, color: '#888' },
    expandedSection: { padding: 20, backgroundColor: '#f9f9f9', marginVertical: 10, borderRadius: 10 },
    buttonsContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20 },
    clearButton: { color: '#888', fontSize: 16 },
    searchButton: { backgroundColor: '#00aaff', padding: 10, borderRadius: 5 },
    searchButtonText: { color: '#fff', fontWeight: 'bold' },
    input: { backgroundColor: '#fff', padding: 10, borderRadius: 5, width: '100%' },
    modalText: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: '#333' },
    guestSelector: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
    optionsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  option: { alignItems: 'center' },
  optionImage: { width: 80, height: 80, borderRadius: 8 },
  optionText: { marginTop: 8, fontSize: 16 },
});

export default SearchScreen;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
    const navigation = useNavigation();
    const [activeSection, setActiveSection] = useState(null); // Stores which section is active
    const [location, setLocation] = useState('Anywhere');
    const [dates, setDates] = useState('Choose dates');
    const [selectedDates, setSelectedDates] = useState({});
    const [startDay, setStartDay] = useState(null);
    const [endDay, setEndDay] = useState(null);
    const [adultGuest, setAdultGuest] = useState(0);
    const [childGuest, setChildGuest] = useState(0);

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    // Function to handle date selection from the calendar
    const onDayPress = (day) => {
        // If `startDay` is not set, set it. If it is set, set `endDay`
        if (!startDay) {
            setStartDay(day.dateString);
            setDates(day.dateString); // Update displayed dates
        } else if (!endDay) {
            setEndDay(day.dateString);
            setDates(`${startDay} - ${day.dateString}`);
        } else {
            // Reset both dates if both are set
            setStartDay(day.dateString);
            setEndDay(null);
            setDates(day.dateString);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.exitButton}>
                <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            {/* Location Section */}
            <TouchableOpacity onPress={() => toggleSection('location')}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Where to?</Text>
                    <Text style={styles.sectionValue}>{location}</Text>
                </View>
            </TouchableOpacity>
            
            {activeSection === 'location' && (
                <View style={styles.expandedSection}>
                    <View style={styles.optionsContainer}>
                        <View style={styles.option}>
                            <Image source={{ uri: 'https://photo.znews.vn/w860/Uploaded/jaroin/2017_10_02/02_Bavaria_travelandleisure_1.jpg' }} style={styles.optionImage} />
                            <Text style={styles.optionText}>Anywhere</Text>
                        </View>
                        <View style={styles.option}>
                            <Image source={{ uri: 'https://media-cdn.tripadvisor.com/media/photo-c/1280x250/17/15/6d/d6/paris.jpg' }} style={styles.optionImage} />
                            <Text style={styles.optionText}>Europe</Text>
                        </View>
                        <View style={styles.option}>
                            <Image source={{ uri: 'https://cdnphoto.dantri.com.vn/R5anasgck8LnSKyaL43dDfjt6DY=/thumb_w/960/2020/07/06/thanhbinh-67-docx-1594030048659.jpeg' }} style={styles.optionImage} />
                            <Text style={styles.optionText}>Asia</Text>
                        </View>
                    </View>
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
                    <Text style={styles.sectionValue}>{`Adults: ${adultGuest}, Children: ${childGuest}`}</Text>
                </View>
            </TouchableOpacity>
            {activeSection === 'guests' && (
                <View style={styles.expandedSection}>
                    <Text style={styles.modalText}>Guests</Text>
                    <View style={styles.guestSelector}>
                        <Text>Adults</Text>
                        <Button title="-" onPress={() => setAdultGuest(Math.max(0, adultGuest - 1))} />
                        <Text>{adultGuest}</Text>
                        <Button title="+" onPress={() => setAdultGuest(adultGuest + 1)} />
                    </View>
                    <View style={styles.guestSelector}>
                        <Text>Children</Text>
                        <Button title="-" onPress={() => setChildGuest(Math.max(0, childGuest - 1))} />
                        <Text>{childGuest}</Text>
                        <Button title="+" onPress={() => setChildGuest(childGuest + 1)} />
                    </View>
                    <Button title="Close" onPress={() => toggleSection(null)} />
                </View>
            )}

            {/* Clear All and Search Buttons */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => {
                    setLocation('Anywhere');
                    setDates('Choose dates');
                    setAdultGuest(0);
                    setChildGuest(0);
                    setStartDay(null);
                    setEndDay(null);
                    setSelectedDates({});
                }}>
                    <Text style={styles.clearButton}>Clear all</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.searchButton} onPress={() => {
                    navigation.navigate('SearchResultsScreen', {
                        location: location,
                        startDay: startDay  ,
                        endDay: endDay,
                        adultGuest: adultGuest,
                        childGuest: childGuest,
                    });
                }}>
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
    sectionValue: { fontSize: 24, color: '#888' },
    expandedSection: { padding: 20, backgroundColor: '#f9f9f9', marginVertical: 10, borderRadius: 10 },
    buttonsContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, position: 'absolute', bottom: 16, left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    clearButton: { color: '#888', fontSize: 20 },
    searchButton: { backgroundColor: '#00aaff', padding: 10, borderRadius: 5 },
    searchButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
    input: { backgroundColor: '#fff', padding: 10, borderRadius: 5, width: '100%' },
    modalText: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: '#333' },
    guestSelector: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
    optionsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
    option: { alignItems: 'center' },
    optionImage: { width: 80, height: 80, borderRadius: 8 },
    optionText: { marginTop: 8, fontSize: 16 },
    exitButton: { position: 'absolute', top: 16, right: 16, zIndex: 1 },
});

export default SearchScreen;

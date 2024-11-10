import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen({ route, navigation }) {
  const { item, latitude, longitude } = route.params;

  const openGoogleMaps = () => {
    const googleMapsUrl = `google.navigation:q=${latitude},${longitude}`;
    
    Linking.canOpenURL(googleMapsUrl).then(supported => {
      if (supported) {
        Linking.openURL(googleMapsUrl);
      } else {
        alert('Vui lòng cài đặt ứng dụng Google Maps để sử dụng tính năng này');
        Linking.openURL('market://details?id=com.google.android.apps.maps');
      }
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title={item.Name}
          description={item.Address}
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Đóng</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.directionsButton}
          onPress={openGoogleMaps}
        >
          <Text style={styles.directionsButtonText}>Open Google Maps</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  backButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  directionsButton: {
    backgroundColor: '#00bcd5',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  directionsButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

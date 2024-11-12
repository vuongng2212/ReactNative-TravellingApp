import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Linking, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TOMORROW_API_KEY = 'gxjq5wWxkZ5LzHoiWd1ojt5KUxOzI425'; // Thay bằng API key của bạn

export default function MapScreen({ route, navigation }) {
  const { item, latitude, longitude } = route.params;
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.tomorrow.io/v4/weather/forecast?location=${latitude},${longitude}&apikey=${TOMORROW_API_KEY}`
      );
      const data = await response.json();
      
      if (data.code) {
        throw new Error(data.message);
      }
      
      if (data && data.timelines && data.timelines.daily) {
        setWeather(data.timelines.daily);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherText = (weatherCode) => {
    const weatherTypes = {
      1000: 'Quang đãng',
      1100: 'Hầu như quang đãng',
      1101: 'Có mây rải rác',
      1102: 'Nhiều mây',
      2000: 'Mưa nhỏ',
      2001: 'Mưa',
      2002: 'Mưa lớn',
      4000: 'Mưa giông',
    };
    return weatherTypes[weatherCode] || 'Không xác định';
  };

  const openGoogleMaps = () => {
    const googleMapsUrl = `google.navigation:q=${latitude},${longitude}`;
    const webMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    
    Linking.canOpenURL(googleMapsUrl).then(supported => {
      if (supported) {
        Linking.openURL(googleMapsUrl);
      } else {
        Linking.openURL(webMapsUrl);
      }
    }).catch(err => {
      Linking.openURL(webMapsUrl);
    });
  };

  const getWeatherIcon = (weatherCode) => {
    const weatherIcons = {
      1000: 'weather-sunny',
      1100: 'weather-partly-cloudy',
      1101: 'weather-cloudy',
      1102: 'weather-cloudy',
      2000: 'weather-rainy',
      2001: 'weather-pouring',
      2002: 'weather-pouring',
      4000: 'weather-lightning-rainy',
    };
    return weatherIcons[weatherCode] || 'weather-cloudy';
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
      
      <View style={styles.weatherContainer}>
        <View style={styles.weatherHeader}>
          <MaterialCommunityIcons name="weather-partly-cloudy" size={24} color="#00bcd5" />
          <Text style={styles.weatherTitle}>Dự báo thời tiết</Text>
        </View>
        
        {loading && (
          <View style={styles.loadingContainer}>
            <MaterialCommunityIcons name="loading" size={24} color="#00bcd5" />
            <Text style={styles.messageText}>Đang tải dữ liệu...</Text>
          </View>
        )}
        
        {error && (
          <View style={styles.errorContainer}>
            <MaterialCommunityIcons name="alert-circle" size={24} color="#ff6b6b" />
            <Text style={styles.errorText}>Lỗi: {error}</Text>
          </View>
        )}
        
        {weather && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {weather.slice(0, 5).map((day, index) => (
              <View key={index} style={[
                styles.weatherCard,
                index === 0 && styles.todayCard
              ]}>
                <Text style={styles.dateText}>
                  {index === 0 ? 'Hôm nay' : new Date(day.time).toLocaleDateString('vi-VN', { weekday: 'short', month: 'numeric', day: 'numeric' })}
                </Text>
                <MaterialCommunityIcons 
                  name={getWeatherIcon(day.values.weatherCodeMax)} 
                  size={32} 
                  color={index === 0 ? "#fff" : "#00bcd5"} 
                />
                <Text style={[styles.tempText, index === 0 && styles.todayText]}>
                  {Math.round(day.values.temperatureAvg)}°C
                </Text>
                <Text style={[styles.weatherDesc, index === 0 && styles.todayText]}>
                  {getWeatherText(day.values.weatherCodeMax)}
                </Text>
                <View style={styles.detailsContainer}>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons 
                      name="water-percent" 
                      size={16} 
                      color={index === 0 ? "#fff" : "#666"} 
                    />
                    <Text style={[styles.detailText, index === 0 && styles.todayText]}>
                      {Math.round(day.values.humidityAvg)}%
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons 
                      name="weather-rainy" 
                      size={16} 
                      color={index === 0 ? "#fff" : "#666"} 
                    />
                    <Text style={[styles.detailText, index === 0 && styles.todayText]}>
                      {Math.round(day.values.rainAccumulation)}mm
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

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
  weatherContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 15,
    margin: 10,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  weatherHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  weatherTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  weatherCard: {
    alignItems: 'center',
    marginRight: 15,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    minWidth: 120,
    elevation: 2,
  },
  todayCard: {
    backgroundColor: '#00bcd5',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#666',
  },
  tempText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  weatherDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  todayText: {
    color: '#fff',
  },
  detailsContainer: {
    width: '100%',
    marginTop: 5,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  detailText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 5,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  messageText: {
    marginLeft: 10,
    color: '#00bcd5',
    fontSize: 14,
  },
  errorText: {
    marginLeft: 10,
    color: '#ff6b6b',
    fontSize: 14,
  },
});

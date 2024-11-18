import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const FavoriteScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Đã lưu</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Text style={styles.chatIcon}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.notificationIcon}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://example.com/saved-placeholder.jpg' }} // Replace with actual image URL
          style={styles.image}
        />
        <Text style={styles.title}>Lưu chỗ nghỉ bạn thích</Text>
        <Text style={styles.subtitle}>
          Tạo danh sách các chỗ nghỉ yêu thích để chia sẻ, so sánh và đặt phòng.
        </Text>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Bắt đầu tìm kiếm</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.createListText}>Tạo một danh sách</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
          <Image
            style={styles.menuImg2}
            source={require("../assets/SearchIcon.png")}
          />
          <Text style={styles.footerText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FavoriteScreen')}>
        <Image
            style={styles.menuImg2}
            source={require("../assets/heart.png")}
          />
          <Text style={styles.footerText}>Favorite</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <Image
            style={styles.menuImg2}
            source={require("../assets/booking.png")}
          />
          <Text style={styles.footerText}>Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <Image
            style={styles.menuImg2}
            source={require("../assets/message.png")}
          />
          <Text style={styles.footerText}>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => navigation.navigate('ProfileScreen')}>
              <Image
            style={styles.menuImg2}
            source={require("../assets/profile.jpg")}
          />
          <Text style={[styles.footerText]}>My Profile</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#0066CC',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  chatIcon: {
    color: '#fff',
    fontSize: 18,
    marginRight: 15,
  },
  notificationIcon: {
    color: '#fff',
    fontSize: 18,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: '#0066CC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 15,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  createListText: {
    color: '#0066CC',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  footerText: {
    fontSize: 14,
    color: '#888',
  },
  activeFooter: {
    color: '#003580',
    fontWeight: 'bold',
  },
  menuImg2: {
    width: 20,
    height: 20,
    margin: 3,
    justifyContent:"center",
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
});

export default FavoriteScreen;

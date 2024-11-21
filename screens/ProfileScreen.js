import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import MenuFooter from "../components/MenuFooter";
import { signOut } from "firebase/auth";
import { auth } from '../firebaseConfig';

export default function ProfileScreen({ navigation }) {
  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful, navigate to home screen
      navigation.navigate("Home"); // Make sure "Home" matches your route name for the home screen
      console.log("Signed out successfully");
    }).catch((error) => {
      // Handle error
      console.error("Error signing out: ", error);
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          {/* Placeholder for profile picture */}
          <Image
            source={{ uri: 'https://via.placeholder.com/70' }} // Placeholder image URL
            style={styles.avatarImage}
          />
        </View>
        <Text style={styles.email}>@gmail.com</Text>
      </View>

      {/* Menu Options */}
      <ScrollView>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Quản lý tài khoản</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Tặng thưởng & Ví</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>
            Chương trình khách hàng thân thiết Genius
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Đánh giá</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Câu hỏi cho chỗ nghỉ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, styles.logout]}>
          <Text onPress={handleLogout} style={[styles.menuText, styles.logoutText]}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer */}
      <MenuFooter navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#003580',
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ccc',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  email: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  logout: {
    marginTop: 20,
    backgroundColor: '#ffe5e5',
  },
  logoutText: {
    color: '#d9534f',
    fontWeight: 'bold',
  },
});

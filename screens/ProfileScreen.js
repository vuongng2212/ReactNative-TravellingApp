import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          {/* Placeholder for profile picture */}
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
          <Text style={[styles.menuText, styles.logoutText]}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerText}>Favorite</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerText}>Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerText}>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.footerText, styles.activeFooter]}>My Profile</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  footerText: {
    fontSize: 14,
    color: '#888',
  },
  activeFooter: {
    color: '#003580',
    fontWeight: 'bold',
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

export default ProfileScreen;

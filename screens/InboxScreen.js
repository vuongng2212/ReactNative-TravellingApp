import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InboxScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Text style={styles.goBackText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tin nhắn</Text>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <Text style={[styles.tabItem, styles.activeTab]}>Chỗ nghỉ</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Image
          source={require('../assets/message.png')} // Replace with your local image
          style={styles.image}
        />
        <Text style={styles.noMessagesText}>Bạn không có tin nhắn nào</Text>
        <Text style={styles.subText}>
          Bạn có thể gửi và nhận tin nhắn khi có đơn đặt trong tương lai.
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Đặt ngay</Text>
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
    height: 60,
    backgroundColor: '#005eb8',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1, // Centers the title while allowing the back button space
    textAlign: 'center',
    marginRight: 30, // Add spacing to center the title properly
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'space-evenly',
  },
  tabItem: {
    paddingVertical: 10,
    fontSize: 16,
    color: '#666',
  },
  activeTab: {
    color: '#005eb8',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#005eb8',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  noMessagesText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#005eb8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  goBackText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default InboxScreen;

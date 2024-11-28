import React, { useState, useEffect } from 'react';
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
  const [userEmail, setUserEmail] = useState('');

  // Fetch user email on component mount
  useEffect(() => {
    const user = auth.currentUser; // Get the currently logged-in user
    if (user) {
      setUserEmail(user.email); // Set the email in state
    }
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful, navigate to the sign-in screen
        navigation.navigate("SigninScreen");
        console.log("Signed out successfully");
      })
      .catch((error) => {
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
        {/* Email */}
        <Text style={styles.email}>{userEmail || 'Loading...'}</Text>
      </View>

      {/* Menu Options */}
      <ScrollView>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Manage account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Gift & Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('FavoriteScreen')}>
          <Text style={styles.menuText}>Favorite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Review</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText} onPress={() => navigation.navigate('ResetpasswordScreen')}>Change password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Question?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, styles.logout]}>
          <Text onPress={handleLogout} style={[styles.menuText, styles.logoutText]}>Sign Out</Text>
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

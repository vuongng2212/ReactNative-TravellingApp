import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { updatePassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Adjust the import path based on your project structure
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const ResetpasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation(); // Initialize navigation

  const validatePassword = () => {
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleResetPassword = async () => {
    if (!validatePassword()) return;

    setLoading(true);
    try {
      const user = auth.currentUser; // Current authenticated user
      if (user) {
        await updatePassword(user, password);
        Alert.alert('Success', 'Password reset successfully!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('ProfileScreen'), // Navigate to ProfileScreen
          },
        ]);
      } else {
        Alert.alert('Error', 'No user is currently signed in.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Reset your Password</Text>
      <Text style={styles.subText}>Please enter your new password</Text>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleResetPassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Reset Password</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003580',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#8e8e8e',
    marginBottom: 20,
  },
  errorText: {
    color: '#E84C3D',
    marginBottom: 10,
    fontSize: 14,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f2f2f2',
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    height: 50,
    backgroundColor: '#003580',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ResetpasswordScreen;

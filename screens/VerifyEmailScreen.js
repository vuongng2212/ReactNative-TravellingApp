import React from 'react';
import { Text, View, Button, Alert, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';

export default function VerifyEmailScreen({ navigation, route }) {
  const { email } = route.params;

  const checkVerification = async () => {
    try {
      await auth.currentUser.reload();
      if (auth.currentUser.emailVerified) {
        Alert.alert('Verified', 'Email verified successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('SigninScreen') },
        ]);
      } else {
        Alert.alert('Not Verified', 'Email not verified yet.');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.instructions}>
        A verification email was sent to {email}. Please verify your email and click the button below.
      </Text>
      <Button title="Check Verification" onPress={checkVerification} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
});

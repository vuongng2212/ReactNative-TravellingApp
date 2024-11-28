import React, { useState } from 'react';
import { Text, View, TextInput, Button, Alert, StyleSheet, Linking } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      Alert.alert(
        'Verification Email Sent',
        'A verification email has been sent to your email address. Please verify your email before signing in.',
        [{ text: 'OK', onPress: () => navigation.navigate('SigninScreen') }]
      );

      console.log('User created:', user.email);
    } catch (error) {
      console.error('Signup Error:', error.code, error.message);
      Alert.alert('Sign up failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Sign up</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        required
      />
      <View style={styles.buttonContainer}>
        <Button title="Sign up" onPress={onSubmit} />
      </View>
      <Text style={styles.paragraph}> OR </Text>
      <View style={styles.authOptions}>
        <View style={styles.buttonContainer}>
          <Button
            title="Continue with Facebook"
            onPress={() => Linking.openURL('https://www.facebook.com/')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Continue with Apple"
            onPress={() => Linking.openURL('https://www.apple.com/')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Continue with Google"
            onPress={() => Linking.openURL('https://accounts.google.com/')}
          />
        </View>
      </View>
      <Text style={styles.paragraph}>
        Already have an account?{' '}
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate('SigninScreen')}
        >
          Sign in
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
    fontWeight: '300',
  },
  authOptions: {
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

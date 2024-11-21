import { useState } from 'react';
import { Text, View, TextInput, Button, Image, StyleSheet, Linking } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function SigninScreen({ navigation }) {
  const handleLink = (url) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Simple email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onLogin = async () => {
    if (!email || !password) {
      console.error('Email and Password cannot be empty');
      return;
    }

    if (!isValidEmail(email)) {
      console.error('Invalid email format');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Signed in as:', user.email);
      navigation.navigate('HomeScreen'); // Corrected navigation
    } catch (error) {
      // Handling specific errors
      if (error.code === 'auth/invalid-email') {
        console.error('Invalid email format');
      } else if (error.code === 'auth/user-not-found') {
        console.error('No user found with this email');
      } else if (error.code === 'auth/wrong-password') {
        console.error('Incorrect password');
      } else if (error.code === 'auth/invalid-credential') {
        console.error('Invalid credentials. Please check your email or password');
      } else {
        console.error('Error during login:', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Sign in</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your mobile number / email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail} // Fixed email change handler
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry // Mask password
        value={password}
        onChangeText={setPassword} // Fixed password change handler
      />
      <View style={styles.buttonContainer}>
        <Button title="Sign in" onPress={onLogin} />
      </View>
      <Text style={styles.paragraph}> OR </Text>
      <View style={styles.authOptions}>
        <View style={styles.buttonContainer}>
          <Image style={styles.logo} source={require("../assets/Facebook_Logo.png")} />
          <Button title="Continue with Facebook" onPress={() => handleLink('https://www.facebook.com/')} />
        </View>
        <View style={styles.buttonContainer}>
          <Image style={styles.logo} source={require("../assets/Apple_logo.png")} />
          <Button title="Continue with Apple" onPress={() => handleLink('https://www.apple.com/')} />
        </View>
        <View style={styles.buttonContainer}>
          <Image style={styles.logo} source={require("../assets/Google__G__logo.png")} />
          <Button title="Continue with Google" onPress={() => handleLink('https://accounts.google.com/')} />
        </View>
      </View>
      <Text style={styles.paragraph}>
        Don't have an account?{' '}
        <Text style={styles.linkText} onPress={() => navigation.navigate('SignupScreen')}>
          Sign up
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
  logo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

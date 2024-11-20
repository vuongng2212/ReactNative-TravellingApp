
import { Link } from '@react-navigation/native';
import { Text, View, TextInput, Button, Image, StyleSheet, Linking } from 'react-native';

export default function SignginScreen({navigation}) {
  const handleLink = (url) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Sign in</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your mobile number / email"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        keyboardType="phone-pad"
      />
      {/* Change HomeScreen to SearchScreen */}
      <View style={styles.buttonContainer}>
        <Button title="Sign in" onPress={() => navigation.navigate('HomeScreen')} />
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
    backgroundColor: '#ecf0f1',
    padding: 8,
    backgroundColor: "white",
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

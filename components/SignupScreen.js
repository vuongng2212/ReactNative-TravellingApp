import { Link } from '@react-navigation/native';
import { Text, View, TextInput, Button, Image, StyleSheet,Linking } from 'react-native';

export default function SignupScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Create an account</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your mobile number"
        keyboardType="phone-pad"
      />
      <View style={styles.authOptions}>
        <View style={styles.buttonContainer}>
          <Image style={styles.logo} source={require("../assets/Facebook_Logo.png")} />
          <Button title="Continue with Facebook" onPress={() => {}} />
        </View>
        <View style={styles.buttonContainer}>
          <Image style={styles.logo} source={require("../assets/Apple_logo.png")} />
          <Button title="Continue with Apple" onPress={() => {}} />
        </View>
        <View style={styles.buttonContainer}>
          <Image style={styles.logo} source={require("../assets/Google__G__logo.png")} />
          <Button title="Continue with Google" onPress={() => {}} />
        </View>
        {/* <Text>All ready have account</Text><Linking></Linking> */}
      </View>
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
});
import { Link } from '@react-navigation/native';
import { Text, View, TextInput, Button, Image, StyleSheet,Linking } from 'react-native';
import SearchResultsScreen from "./SearchResultsScreen";
export default function SignupScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Create an account</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your mobile number"
        keyboardType="phone-pad"
      />
      {/* thay homescreen bang searchscrenn */}
      <View style={styles.buttonContainer}>
        <Button title="Continue" onPress={() => navigation.navigate('HomeScreen')}/>
      </View>
      <Text style={styles.paragraph}> OR </Text>
      <View style={styles.authOptions}>
        <View style={styles.buttonContainer}>
          <Image style={styles.logo} source={require("../assets/Facebook_Logo.png")} />
          <a href="https://www.facebook.com/">
          <Button title="Continue with Facebook" onPress={() => {}} />
          </a>
        </View>
        <View style={styles.buttonContainer}>
          <Image style={styles.logo} source={require("../assets/Apple_logo.png")} />
          <a href="https://www.facebook.com/">
          <Button title="Continue with Apple" onPress={() => {}} />
          </a>
        </View>
        <View style={styles.buttonContainer}>
          <Image style={styles.logo} source={require("../assets/Google__G__logo.png")} />
          <a href="https://accounts.google.com/v3/signin/identifier?elo=1&ifkv=AcMMx-d6D6UWD3tkue8wihsHJEYKSORS793L2j0Sf11mSP8e6Rq0ZQu8UBGH43uAzfAnsC6Wf3Ngbg&ddm=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin&continue=https%3A%2F%2Faccounts.google.com%2FManageAccount%3Fnc%3D1">
          <Button title="Continue with Google" onPress={() => {}} />
          </a>
        </View>
      </View>
      <Text style={styles.paragraph}>Already have an account ? <a href=''>Login </a></Text>
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
    backgroundColor:"white",
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
    fontWeight:'light',
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
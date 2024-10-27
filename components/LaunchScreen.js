import { Text, View, StyleSheet, Image,TouchableOpacity } from 'react-native';
//import SignupScreen from "./components/SignupScreen";
export default function AssetExample({navigation}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{
        //backgroundColor:'#E94141',
        color:'white',
        padding:1,
        borderRadius:1
      }}
      
       onPress={() => navigation.navigate('SignupScreen')}
      >
      <Image style={styles.logo} source={require('../assets/logoStart.png')} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    flex:1,
    backgroundColor:'#fff',
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  }
});

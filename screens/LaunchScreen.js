import { Text, View, StyleSheet, Image } from 'react-native';
import { useEffect } from 'react';

export default function AssetExample({ navigation }) {
  useEffect(() => {
    
    navigation.navigate('SignupScreen');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logoStart.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    flex: 1,
    backgroundColor: '#fff',
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
  },
});
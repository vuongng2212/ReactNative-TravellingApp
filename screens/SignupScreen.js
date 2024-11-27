import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Linking,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import * as Crypto from "expo-crypto";

const hashPassword = async (password) => {
  const hashedPassword = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
  return hashedPassword;
};

export default function SignupScreen({ navigation }) {
  const handleLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User object:", user);

      if (user) {
        try {
          await sendEmailVerification(user, {
            handleCodeInApp: true,
            url: "https://travellingapp-ef3ae.firebaseapp.com",
          });
          console.log("Verification email sent successfully");

          const hashedPassword = await hashPassword(password);

          await setDoc(doc(db, "users", user.uid), {
            email: email,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
            emailVerified: false,
          });

          console.log("User created successfully");
          navigation.navigate("SigninScreen");
        } catch (emailError) {
          console.error("Error sending verification email:", emailError);
        }
      } else {
        console.error("User object is undefined");
      }
    } catch (error) {
      console.error("SignUp error:", error.code, error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Sign up</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your mobile number/ email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail} // Corrected handler for TextInput
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true} // Corrected usage
        value={password}
        onChangeText={setPassword} // Corrected handler for TextInput
        required
      />
      <View style={styles.buttonContainer}>
        <Button title="Sign up" onPress={onSubmit} />
      </View>
      <Text style={styles.paragraph}> OR </Text>
      <View style={styles.authOptions}>
        <View style={styles.buttonContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/Facebook_Logo.png")}
          />
          <Button
            title="Continue with Facebook"
            onPress={() => handleLink("https://www.facebook.com/")}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/Apple_logo.png")}
          />
          <Button
            title="Continue with Apple"
            onPress={() => handleLink("https://www.apple.com/")}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/Google__G__logo.png")}
          />
          <Button
            title="Continue with Google"
            onPress={() => handleLink("https://accounts.google.com/")}
          />
        </View>
      </View>
      <Text style={styles.paragraph}>
        Already have an account?{" "}
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate("SigninScreen")}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "80%",
    fontWeight: "300",
  },
  authOptions: {
    width: "100%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

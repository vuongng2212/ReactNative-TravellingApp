import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function SigninScreen({ navigation }) {
  const handleLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Simple email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and Password cannot be empty");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Error", "Invalid email format");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Signed in as:", user.email);

      // Kiểm tra trạng thái xác thực email
      if (user.emailVerified) {
        // Email đã được xác thực, cập nhật Firestore
        try {
          const userDocRef = doc(db, "users", user.uid);
          await updateDoc(userDocRef, {
            emailVerified: true,
          });
          console.log("Updated email verification status in Firestore");
          navigation.navigate("HomeScreen");
        } catch (updateError) {
          console.error("Error updating Firestore:", updateError);
        }
      } else {
        // Email chưa được xác thực
        Alert.alert(
          "Email Not Verified",
          "Please verify your email before continuing. Check your inbox for verification link.",
          [
            {
              text: "OK",
              onPress: () => {
                // Đăng xuất user
                auth.signOut();
              },
            },
            {
              text: "Resend Email",
              onPress: async () => {
                try {
                  await sendEmailVerification(auth.currentUser, {
                    url: "https://travellingapp-ef3ae.firebaseapp.com",
                    handleCodeInApp: true,
                  });
                  Alert.alert("Success", "Verification email has been resent");
                } catch (error) {
                  console.error("Error sending verification email:", error);
                  Alert.alert("Error", "Failed to resend verification email");
                }
              },
            },
          ]
        );
      }
    } catch (error) {
      // Handling specific errors
      if (error.code === "auth/invalid-email") {
        console.error("Invalid email format");
      } else if (error.code === "auth/user-not-found") {
        console.error("No user found with this email");
      } else if (error.code === "auth/wrong-password") {
        console.error("Incorrect password");
      } else if (error.code === "auth/invalid-credential") {
        console.error(
          "Invalid credentials. Please check your email or password"
        );
      } else {
        console.error("Error during login:", error.message);
      }
      Alert.alert("Error", getErrorMessage(error.code));
    }
  };

  // Helper function to get user-friendly error messages
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "Invalid email format";
      case "auth/user-not-found":
        return "No user found with this email";
      case "auth/wrong-password":
        return "Incorrect password";
      case "auth/invalid-credential":
        return "Invalid credentials. Please check your email or password";
      default:
        return "An error occurred during login";
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
        Don't have an account?{" "}
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate("SignupScreen")}
        >
          Sign up
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

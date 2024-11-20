import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function MenuFooter({ navigation }) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.footerNavItem}
        onPress={() => navigation.navigate("SearchScreen")}
      >
        <Image
          style={styles.menuImg2}
          source={require("../assets/SearchIcon.png")}
        />
        <Text style={styles.footerText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerNavItem}
        onPress={() => navigation.navigate("FavoriteScreen")}
      >
        <Image
          style={styles.menuImg2}
          source={require("../assets/heart.png")}
        />
        <Text style={styles.footerText}>Favorite</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerNavItem}
        onPress={() => navigation.navigate("BookingScreen")}
      >
        <Image
          style={styles.menuImg2}
          source={require("../assets/booking.png")}
        />
        <Text style={styles.footerText}>Booking</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerNavItem}
        onPress={() => navigation.navigate("InboxScreen")}
      >
        <Image
          style={styles.menuImg2}
          source={require("../assets/message.png")}
        />
        <Text style={styles.footerText}>Inbox</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerNavItem}
        onPress={() => navigation.navigate("ProfileScreen")}
      >
        <Image
          style={styles.menuImg2}
          source={require("../assets/profile.jpg")}
        />
        <Text style={styles.footerText}>My Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  footerText: {
    fontSize: 14,
    color: "#888",
  },
  menuImg2: {
    width: 20,
    height: 20,
    margin: 3,
    justifyContent: "center",
  },
  footerNavItem: {
    alignItems: "center",
  },
});

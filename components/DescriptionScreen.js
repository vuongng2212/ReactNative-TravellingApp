import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";
import Back from "../assets/left-arrow.png";
export default function DescriptionScreen({ route, navigation }) {
  const { item } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Title */}
      <View style={styles.title}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Back} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Description</Text>
        <Text></Text>
      </View>

      {/* Image */}
      <Image source={{ uri: `${item.Image}.png` }} style={styles.img} />
      <Text style={styles.DescriptionTxt}>{item.Description}</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  img: {
    marginTop: 30,
    width: "100%",
    height: 250,
  },
  DescriptionTxt: {
    marginTop: 10,
    color: "#6f7072",
  },
});

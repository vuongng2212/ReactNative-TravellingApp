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
import locationIcon from "../assets/location.png";

export default function DescriptionScreen({ route, navigation }) {
  const { item } = route.params;
  const latitude = 10.766454; // Tọa độ vĩ độ
  const longitude = 106.692203; // Tọa độ kinh độ
  const openMap = () => {
    const url = `google.navigation:q=${latitude},${longitude}`;
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 7,
        }}
      >
        <Image source={locationIcon} style={{ width: 25, height: 25 }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text style={{ width: "70%" }}>{item.Address}</Text>
          <TouchableOpacity
            style={{
              width: "30%",
            }}
            onPress={openMap}
          >
            <Text
              style={{
                width: "100%",
                color: "#58b5b9",
                textDecorationLine: "underline",
                textAlign: "center",
              }}
            >
              View map
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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

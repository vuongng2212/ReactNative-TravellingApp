import React, { useEffect } from "react";
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
import firebase from "firebase/compat/app";

export default function DescriptionScreen({ route, navigation }) {
  const { item } = route.params;

  const openMap = (item) => {
    const latitude = parseFloat(item.Cord.latitude);
    const longitude = parseFloat(item.Cord.longitude);
    navigation.navigate("MapScreen", {
      item: item,
      latitude: latitude,
      longitude: longitude,
    });
  };
  const firstImage =
    Array.isArray(item.Place.img) && item.Place.img.length > 0
      ? `${item.Place.img[0]}.jpg`
      : `${item.Place.img}.jpg`;

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
      <Image source={{ uri: firstImage }} style={styles.img} />
      <Text style={styles.DescriptionTxt}>{item.Place.description}</Text>
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
          <Text style={{ width: "70%" }}>{item.Address.adr}</Text>
          <TouchableOpacity
            style={{
              width: "30%",
            }}
            onPress={() => openMap(item)}
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
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "white",
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
    borderRadius: 10,
  },
  DescriptionTxt: {
    marginTop: 10,
    color: "#6f7072",
  },
});

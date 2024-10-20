import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import backIcon from "../assets/backIcon.png";
import locationIcon from "../assets/location.png";
import star from "../assets/star.png";
import next from "../assets/next.png";
export default function PropertyDetailScreen({ route, navigation }) {
  const { item } = route.params;
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View>
        <Image source={{ uri: `${item.Image}.jpg` }} style={styles.img} />

        <TouchableOpacity
          style={styles.overlayIMG}
          onPress={() => navigation.goBack()}
        >
          <Image source={backIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.txtName}>{item.Name}</Text>
        {/* Name and Address */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 7,
          }}
        >
          <Image source={locationIcon} style={{ width: 25, height: 25 }} />
          <Text>{item.Address}</Text>
        </View>
        {/* Rating */}
        <View style={styles.rating}>
          <View
            style={{ flexDirection: "row", margin: 10, alignItems: "center" }}
          >
            <Image source={star} style={{ width: 15, height: 15 }} />
            <Text> {item.Rate}/5</Text>
          </View>
          <View
            style={{ flexDirection: "row", margin: 10, alignItems: "center" }}
          >
            <Text> reviews </Text>
            <Image source={next} style={{ width: 15, height: 15 }} />
          </View>
        </View>
      </View>
      <View style={styles.honrizonLine}></View>
      <View style={styles.container}>
        {/* Facilities and services */}
        <View>
          <Text>Facilities & services</Text>

          <View>
            <Text>
              {item.Guest} Guests {item.Bedrooms} Bedrooms {item.Beds} Beds
              {item.Bathrooms} Bath
            </Text>
          </View>
          {item.Internet && (
            <View>
              <Text>Wifi</Text>
            </View>
          )}
          {item.Kitchen && (
            <View>
              <Text>Kitchen</Text>
            </View>
          )}
          {item.Pool && (
            <View>
              <Text>Pool</Text>
            </View>
          )}
          {item.Outdoor && (
            <View>
              <Text>Outdoor</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  overlayIMG: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  container: {
    padding: 15,
    backgroundColor: "#fff",
  },
  txtName: {
    fontSize: 19,
    fontWeight: "bold",
  },
  rating: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    backgroundColor: "#fafafa",
    borderRadius: 5,
  },
  honrizonLine: {
    backgroundColor: "#fafafa",
    height: 3,
  },
});

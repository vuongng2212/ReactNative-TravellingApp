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
import Internet from "../assets/Internet.png";
import Kitchen from "../assets/Kitchen.png";
import Gym from "../assets/Gym.png";
import Pool from "../assets/Pool.png";
import Outdoor from "../assets/Outdoor.png";

export default function FacilitiesANDServiceScreen({ route, navigation }) {
  const { item } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Title */}
      <View style={styles.title}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Back} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Facilities & services
        </Text>
        <Text></Text>
      </View>
      {/* Facilities */}
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 15,
            marginTop: 25,
          }}
        >
          Facilities & services
        </Text>

        <View style={{ marginLeft: 10 }}>
          <View>
            <Text style={styles.facilitiesTxt}>
              {item.Guest} Guests {item.Bedrooms} Bedrooms {item.Beds} Beds
              {item.Bathrooms} Bath
            </Text>
          </View>

          {item.Internet && (
            <View>
              <View style={styles.facilitiesItem}>
                <Image source={Internet} style={styles.facilitiesImg} />
                <Text style={styles.facilitiesTxt}>Wifi</Text>
              </View>
              <View style={styles.honrizonLine}></View>
            </View>
          )}
          {item.Kitchen && (
            <View>
              <View style={styles.facilitiesItem}>
                <Image source={Kitchen} style={styles.facilitiesImg} />
                <Text style={styles.facilitiesTxt}>Kitchen</Text>
              </View>
              <View style={styles.honrizonLine}></View>
            </View>
          )}

          {item.Pool && (
            <View>
              <View style={styles.facilitiesItem}>
                <Image source={Pool} style={styles.facilitiesImg} />
                <Text style={styles.facilitiesTxt}>Pool</Text>
              </View>
              <View style={styles.honrizonLine}></View>
            </View>
          )}
          {item.Outdoor && (
            <View>
              <View style={styles.facilitiesItem}>
                <Image source={Outdoor} style={styles.facilitiesImg} />
                <Text style={styles.facilitiesTxt}>Outdoor</Text>
              </View>
              <View style={styles.honrizonLine}></View>
            </View>
          )}
        </View>
      </View>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 15,
            marginTop: 25,
          }}
        >
          Services
        </Text>
        {/* Services -> Cleaning */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Cleaning and laundry
        </Text>
        <View style={{ marginLeft: 10 }}>
          {item.Services.Cleaning.Washer && (
            <View>
              <View style={styles.facilitiesItem}>
                <Image source={Outdoor} style={styles.facilitiesImg} />
                <Text style={styles.facilitiesTxt}>Washer</Text>
              </View>
              <View style={styles.honrizonLine}></View>
            </View>
          )}
          {item.Services.Cleaning.Dryer && (
            <View>
              <View style={styles.facilitiesItem}>
                <Image source={Outdoor} style={styles.facilitiesImg} />
                <Text style={styles.facilitiesTxt}>Dryer</Text>
              </View>
              <View style={styles.honrizonLine}></View>
            </View>
          )}
          {item.Services.Cleaning.Iron && (
            <View>
              <View style={styles.facilitiesItem}>
                <Image source={Outdoor} style={styles.facilitiesImg} />
                <Text style={styles.facilitiesTxt}>Iron</Text>
              </View>
              <View style={styles.honrizonLine}></View>
            </View>
          )}
        </View>
        {/* Bathroom */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Bathroom
        </Text>
        <View style={{ marginLeft: 10 }}>
          {item.Services.Bathroom.Bathtub && (
            <View>
              <View style={styles.facilitiesItem}>
                <Image source={Outdoor} style={styles.facilitiesImg} />
                <Text style={styles.facilitiesTxt}>Bathtub</Text>
              </View>
              <View style={styles.honrizonLine}></View>
            </View>
          )}
          {item.Services.Bathroom.HairDryer && (
            <View>
              <View style={styles.facilitiesItem}>
                <Image source={Outdoor} style={styles.facilitiesImg} />
                <Text style={styles.facilitiesTxt}>Dryer</Text>
              </View>
              <View style={styles.honrizonLine}></View>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#fff",
  },
  title: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  facilitiesItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  facilitiesImg: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  facilitiesTxt: {
    color: "#656668",
  },
  honrizonLine: {
    backgroundColor: "#fafafa",
    height: 3,
  },
});

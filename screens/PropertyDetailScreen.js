import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import MapView, { Marker } from 'react-native-maps';

import backIcon from "../assets/backIcon.png";
import locationIcon from "../assets/location.png";
import star from "../assets/star.png";
import next from "../assets/next.png";
import Internet from "../assets/Internet.png";
import Kitchen from "../assets/Kitchen.png";
import Gym from "../assets/Gym.png";
import Pool from "../assets/Pool.png";
import Outdoor from "../assets/Outdoor.png";
import Clock from "../assets/Clock.png";

export default function PropertyDetailScreen({ route, navigation }) {
  const { item } = route.params;

  const limitWords = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };

  const openMap = (item) => {
    const latitude = parseFloat(item.Cord.latitude);
    const longitude = parseFloat(item.Cord.longitude);
    navigation.navigate('MapScreen', {
      item: item,
      latitude: latitude,
      longitude: longitude,
    });
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView>
        <View>
          <Image source={{ uri: `${item.Place.img}.jpg` }} style={styles.img} />

          <TouchableOpacity
            style={styles.overlayIMG}
            onPress={() => navigation.goBack()}
          >
            <Image source={backIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          {/* Name and Address */}
          <Text style={styles.txtName}>{item.Place.txtName}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
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
          {/* Rating */}
          <View style={styles.rating}>
            <View
              style={{ flexDirection: "row", margin: 10, alignItems: "center" }}
            >
              <Image source={star} style={{ width: 15, height: 15 }} />
              <Text> {item.Place.rate}/5</Text>
            </View>
            <TouchableOpacity
              style={{ flexDirection: "row", margin: 10, alignItems: "center" }}
              onPress={() =>
                navigation.navigate("ReviewScreen", { id: item.id })
              }
            >
              <Text style={{ color: "#5a5b5d" }}> reviews </Text>
              <Image source={next} style={{ width: 15, height: 15 }} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.honrizonLine}></View>
        <View style={styles.container}>
          {/* Facilities and services */}
          <View>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}
            >
              Facilities & services
            </Text>

            <View>
              <Text style={styles.facilitiesTxt}>
                {item.Place.guest} Guests {item.Room.bedrooms} Bedrooms {item.Room.beds} Beds
                {item.Place.bathrooms} Bath
              </Text>
            </View>

            {item.Facilities.internet && (  
              <View>
                <View style={styles.facilitiesItem}>
                  <Image source={Internet} style={styles.facilitiesImg} />
                  <Text style={styles.facilitiesTxt}>Wifi</Text>
                </View>
              </View>
            )}

            {item.Facilities.kitchen && (
              <View>
                <View style={styles.facilitiesItem}>
                  <Image source={Kitchen} style={styles.facilitiesImg} />
                  <Text style={styles.facilitiesTxt}>Kitchen</Text>
                </View>
              </View>
            )}

            {item.Facilities.pool && (
              <View>
                <View style={styles.facilitiesItem}>
                  <Image source={Pool} style={styles.facilitiesImg} />
                  <Text style={styles.facilitiesTxt}>Pool</Text>
                </View>
              </View>
            )}

            {item.Facilities.outdoor && (
              <View>
                <View style={styles.facilitiesItem}>
                  <Image source={Outdoor} style={styles.facilitiesImg} />
                  <Text style={styles.facilitiesTxt}>Outdoor</Text>
                </View>
              </View>
            )}

            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                navigation.navigate("FacilitiesANDServiceScreen", {
                  item: item,
                })
              }
            >
              <Text style={styles.txtBtn}>Show all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.honrizonLine}></View>

          {/* Reviews */}
          <View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Reviews</Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  margin: 10,
                  alignItems: "center",
                }}
                onPress={() => navigation.navigate("ReviewScreen", { id: item.id })}
              >
                <Text style={{ color: "#5a5b5d" }}>See all </Text>
                <Image source={next} style={{ width: 10, height: 10 }} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                {item.Place.rate}
              </Text>
              <Text>/5</Text>
            </View>
            {/* Latest reviews */}
            <View>{/* Flat list */}</View>
            <View style={styles.honrizonLine}></View>

            {/* Policies */}
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Policies</Text>
            </View>
            <View style={styles.ruleView}>
              <View style={{ margin: 10 }}>
                <Text style={{ fontWeight: "bold" }}>House rules</Text>
                <View style={styles.ruleInOut}>
                  <Image source={Clock} style={{ width: 15, height: 15 }} />
                  <Text> Earliest check in time:</Text>
                </View>
                <View style={styles.ruleInOut}>
                  <Image source={Clock} style={{ width: 15, height: 15 }} />
                  <Text> Earliest check out time:</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Checkin policies
              </Text>
            </View>
            <Text>
              It's
              alwayaapfpfsajsappojffoppofapafjpofasjafpafspofapfaosjopfajpofapofjasfoasposp
            </Text>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.txtBtn}>View more</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.honrizonLine}></View>

          {/* Description */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>
              Description
            </Text>
          </View>
          <View>
            <Image
              source={{ uri: `${item.Place.img}.jpg` }}
              style={styles.DescriptionImg}
            />
            <Text style={styles.DescriptionTxt}>
              {limitWords(item.Place.description, 25)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate("DescriptionScreen", { item: item })
            }
          >
            <Text style={styles.txtBtn}>View more</Text>
          </TouchableOpacity>
          <View style={styles.honrizonLine}></View>

          {/* Book */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text>From: </Text>
              <Text style={{ fontWeight: "bold" }}>${item.Place.price}</Text>
              <Text>/night</Text>
            </View>
            <TouchableOpacity
              style={styles.bookBtn}
              onPress={() =>
                navigation.navigate("ComfirmAndPay", { item: item })
              }
            >
              <Text style={styles.bookTxt}>Book now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  facilitiesItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
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
  btn: {
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#96959a",
  },
  txtBtn: {
    margin: 10,
    color: "#999a9c",
    textAlign: "center",
    fontSize: 16,
  },
  ruleView: {
    backgroundColor: "#fafafa",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  ruleInOut: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  bookBtn: {
    backgroundColor: "#00bcd5",
    borderRadius: 5,
    marginTop: 15,
  },
  bookTxt: {
    color: "#fff",
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 25,
    marginRight: 25,
  },
  DescriptionImg: {
    width: "100%",
    height: 200,
  },
  DescriptionTxt: {
    marginTop: 10,
    color: "#6f7072",
  },
});

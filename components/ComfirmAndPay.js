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
export default function ComfirmAndPay({ route, navigation }) {
  const { item } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Title */}
      <View style={styles.title}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Back} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
          Confirm and pay
        </Text>
        <View></View>
      </View>
      <View style={styles.honrizonLine}></View>
      {/* About the Room */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <View>
          <Text>${item.Price}/night</Text>
          <Text>{item.Name}</Text>
          <Text>{item.Rate}</Text>
        </View>
        <View>
          <Image source={{ uri: `${item.Image}.jpg` }} style={styles.img} />
        </View>
      </View>
      <View style={styles.honrizonLine}></View>
      {/* Your trip */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>
          Your trip
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text>Date</Text>
            <Text>Date1</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text>Guest</Text>
            <Text>Guest 2</Text>
          </View>
        </View>
      </View>
      <View style={styles.honrizonLine}></View>
      {/* Payment options */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>
          Payment options
        </Text>
        {/* Pay in full */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text>Pay in full</Text>
            <Text>Pay in full 2</Text>
          </View>
        </View>
        {/* Pay a part now */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <View>
              <Text>Pay a part now</Text>
              <Text>Pay a part now 2</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.honrizonLine}></View>
      {/* Price details */}
      <View style={{ marginBottom: 20, marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>
          Price details
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>${item.Price} x 1 night</Text>
          <Text>${item.Price * 1}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Cleaning fee</Text>
          <Text>Cleaning fee2</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Service fee</Text>
          <Text>Service fee2</Text>
        </View>
        <View style={styles.honrizonLine}></View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Total</Text>
          <Text>Total 2</Text>
        </View>
      </View>
      <View style={{ justifyContent: "flex-end" }}>
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => navigation.navigate("PaymentSuccess", { item: item })}
        >
          <Text style={styles.bookTxt}>Book now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  honrizonLine: {
    backgroundColor: "#fafafa",
    height: 3,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  bookBtn: {
    backgroundColor: "#00bcd5",
    borderRadius: 5,
    marginTop: 15,
    marginLeft: 25,
    marginRight: 25,
  },
  bookTxt: {
    color: "#fff",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 25,
    marginRight: 25,
  },
});

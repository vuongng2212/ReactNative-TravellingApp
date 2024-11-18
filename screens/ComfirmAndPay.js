import React, { useState, useEffect, Children } from "react";
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
import StartIcon from "../assets/star.png";
export default function ComfirmAndPay({ route, navigation }) {
  const { item, startDay, endDay, guests, child } = route.params;
  const cleaningFee = 5;
  const serviceFee = 5;
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              ${item.Place.price}
            </Text>
            <Text>/night</Text>
          </View>
          <Text>{item.Place.name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={StartIcon}
              style={{ width: 15, height: 15, marginRight: 5 }}
            />
            <Text>{item.Place.rate}</Text>
          </View>
        </View>
        <View>
          <Image source={{ uri: `${item.Place.img}.jpg` }} style={styles.img} />
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
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.txtBold}>Date</Text>
            <Text>
              {startDay} - {endDay}
            </Text>
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
            <Text style={styles.txtBold}>Guest</Text>
            <Text>{guests + child}</Text>
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <View>
            <Text style={styles.txtBold}>Pay in full</Text>
            <Text>
              Pay ${item.Place.price * 1 + cleaningFee + serviceFee} now to
              finalize your booking
            </Text>
          </View>
        </View>
        {/* Pay a part now */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <View>
              <Text style={styles.txtBold}>Pay a part now</Text>
              <Text>
                You can make a partial payment now and the remaining amount at a
                later time
              </Text>
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
          <Text>${item.Place.price} x 1 night</Text>
          <Text>${item.Place.price * 1}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Cleaning fee</Text>
          <Text>${cleaningFee}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Service fee</Text>
          <Text>${serviceFee}</Text>
        </View>
        <View style={styles.honrizonLine}></View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Total</Text>
          <Text>${item.Place.price * 1 + cleaningFee + serviceFee}</Text>
        </View>
      </View>
      <View style={{ justifyContent: "flex-end" }}>
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() =>
            navigation.navigate("PaymentSuccess", {
              item: item,
              total: item.Place.price * 1 + cleaningFee + serviceFee,
            })
          }
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
  txtBold: {
    fontWeight: "bold",
  },
});

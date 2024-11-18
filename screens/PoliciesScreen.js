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
import Deposit from "../assets/deposit.png";
import ID from "../assets/ID.png";
import Pets from "../assets/no-animals.png";
import Smoking from "../assets/no-smoking.png";
import SelfCheckin from "../assets/check-in.png";
import Age from "../assets/age.png";

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
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Policies</Text>
        <Text></Text>
      </View>

      {/* Policies */}
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 15,
            marginTop: 25,
          }}
        >
          Check-in policies
        </Text>
        <View style={{ marginLeft: 10 }}>
          {item.Policies.checkInPolicies.depositRequired && (
            <View>
              <View style={styles.facilitiesItem}>
                <Image source={Deposit} style={styles.facilitiesImg} />
                <Text style={styles.facilitiesTxt}>Required deposit</Text>
              </View>
              <View style={styles.honrizonLine}></View>
            </View>
          )}
          {item.Policies.checkInPolicies.idRequired && (
            <View>
              <View style={styles.facilitiesItem}>
                <Image source={ID} style={styles.facilitiesImg} />
                <Text style={styles.facilitiesTxt}>Required ID</Text>
              </View>
              <View style={styles.honrizonLine}></View>
            </View>
          )}
          {item.Policies.checkInPolicies.noPetsAllowed && (
            <View>
              <View style={styles.facilitiesItem}>
                <Image source={Pets} style={styles.facilitiesImg} />
                <Text style={styles.facilitiesTxt}>No pets allowed</Text>
              </View>
              <View style={styles.honrizonLine}></View>
            </View>
          )}
          {item.Policies.checkInPolicies.noSmokingPolicy && (
            <View>
              <View style={styles.facilitiesItem}>
                <Image source={Smoking} style={styles.facilitiesImg} />
                <Text style={styles.facilitiesTxt}>No smoking policy</Text>
              </View>
              <View style={styles.honrizonLine}></View>
            </View>
          )}
          {item.Policies.checkInPolicies.selfCheckin && (
            <View>
              <View style={styles.facilitiesItem}>
                <Image source={SelfCheckin} style={styles.facilitiesImg} />
                <Text style={styles.facilitiesTxt}>Self check-in</Text>
              </View>
              <View style={styles.honrizonLine}></View>
            </View>
          )}

          <View>
            <View style={styles.facilitiesItem}>
              <Image source={Age} style={styles.facilitiesImg} />
              <Text style={styles.facilitiesTxt}>
                Minimun age: {item.Policies.checkInPolicies.minimumAge}
              </Text>
            </View>
            <View style={styles.honrizonLine}></View>
          </View>
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

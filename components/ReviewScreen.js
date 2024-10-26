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
import StarIcon from "../assets/star.png";
export default function ReviewScreen({ navigation }) {
  const totalView = 262;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Title */}
      <View style={styles.title}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Back} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Reviews</Text>
        <Text></Text>
      </View>

      {/* Reviews */}
      <View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 22,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          {totalView} reviews
        </Text>
        <View style={styles.starView}>
          <View>
            <Text style={{ fontSize: 18 }}>4.5/5</Text>
            {/* Star */}
            <View style={{ flexDirection: "row" }}>
              <Image source={StarIcon} style={styles.starIcon} />
              <Image source={StarIcon} style={styles.starIcon} />
              <Image source={StarIcon} style={styles.starIcon} />
              <Image source={StarIcon} style={styles.starIcon} />
              <Image source={StarIcon} style={styles.starIcon} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  starView: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  starIcon: {
    width: 20,
    height: 20,
  },
});

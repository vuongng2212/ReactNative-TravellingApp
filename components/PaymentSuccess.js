import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import SuccessIcon from "../assets/PaymentSuccess.png";
import DownloadPDF from "../assets/DownloadPDF.png";
export default function PaymentSuccess({ route, navigation }) {
  const { item } = route.params;

  const [formattedDate, setFormattedDate] = useState("");
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    setFormattedDate(`${day}-${month}-${year}`);

    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM/PM
    setFormattedTime(`${formattedHours}:${minutes} ${ampm}`);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FB" />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          borderWidth: 1,
          borderColor: "red",
          borderRadius: 15,
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={SuccessIcon}
            style={{ width: 150, height: 150, marginBottom: 20 }}
          />
          <Text style={styles.title}>Payment success!</Text>
        </View>
        <View style={{ margin: 15 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.txtLeft}>Ref number</Text>
            <Text style={styles.txtRight}>1234567890</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.txtLeft}>Date</Text>
            <Text style={styles.txtRight}>{formattedDate}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.txtLeft}>Time</Text>
            <Text style={styles.txtRight}>{formattedTime}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={styles.txtLeft}>Payment method</Text>
            <Text style={styles.txtRight}>1234567890</Text>
          </View>
          <View style={styles.honrizonLine}></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={styles.txtLeft}>Amount</Text>
            <Text style={styles.txtRight}>${item.Price}</Text>
          </View>
          <TouchableOpacity style={styles.btn}>
            <Image source={DownloadPDF} style={{ width: 20, height: 20 }} />
            <Text style={{ fontSize: 16, margin: 10 }}>Get PDF receipt</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#F8F9FB",
    paddingTop: 100,
    paddingBottom: 100,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  txtLeft: {
    fontSize: 16,
    fontWeight: "400",
  },
  txtRight: {
    fontSize: 16,
    fontWeight: "bold",
  },
  honrizonLine: {
    backgroundColor: "#fafafa",
    height: 3,
  },
  btn: {
    marginTop: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

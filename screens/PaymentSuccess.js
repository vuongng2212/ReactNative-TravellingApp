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
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function PaymentSuccess({ route, navigation }) {
  const { item, total, paymentMethod } = route.params;

  const [formattedDate, setFormattedDate] = useState("");
  const [formattedTime, setFormattedTime] = useState("");
  const [refNumber, setRefNumber] = useState("");

  const saveBooking = async () => {
    try {
      const testUserID = "3hzoxYV7m5nlV6e4vEKH";
      const userRef = doc(db, "users", testUserID);
      const bookingData = {
        payID: refNumber || "",
        placeName: item?.Place?.name || "",
        placeImg: item?.Place?.img || "",
        placeRate: item?.Place?.rate || 0,
        totalPrice: total || 0,

        paymentMethod: paymentMethod || "",
      };

      // Kiểm tra object đã tạo
      console.log("BookingData:", bookingData);

      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();

      if (!userData?.Booking) {
        await updateDoc(userRef, {
          Booking: [bookingData],
        });
      } else {
        await updateDoc(userRef, {
          Booking: arrayUnion(bookingData),
        });
      }
    } catch (error) {
      console.error("Lỗi khi lưu vào Booking:", error);
      console.log("Error details:", error.message);
      console.log("Error code:", error.code);
    }
  };

  useEffect(() => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    setFormattedDate(`${day}-${month}-${year}`);

    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    setFormattedTime(`${formattedHours}:${minutes} ${ampm}`);
    const milliseconds = date.getMilliseconds();
    const newRefNumber = `${day}${month}${year}${hours}${minutes}${milliseconds}`;
    setRefNumber(newRefNumber);
  }, []);

  // Tạo useEffect mới để theo dõi refNumber
  useEffect(() => {
    if (refNumber) {
      // Chỉ gọi saveBooking khi refNumber có giá trị
      saveBooking();
    }
  }, [refNumber]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FB" />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          borderWidth: 1,
          borderColor: "#EDEEF0",
          borderRadius: 15,
          backgroundColor: "#fff",
          marginBottom: 20,
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
            style={{ width: 200, height: 200, marginBottom: 20 }}
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
            <Text style={styles.txtRight}>{refNumber}</Text>
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
            <Text style={styles.txtRight}>{paymentMethod}</Text>
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
            <Text style={styles.txtRight}>${total}</Text>
          </View>
          <TouchableOpacity style={styles.btn}>
            <Image source={DownloadPDF} style={{ width: 20, height: 20 }} />
            <Text
              style={{
                fontSize: 16,
                margin: 10,
                color: "#909694",
                fontWeight: "400",
              }}
            >
              Get PDF receipt
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.bookBtn}
        onPress={() => navigation.navigate("SearchResultsScreen")}
      >
        <Text style={styles.bookTxt}>View booking</Text>
      </TouchableOpacity>
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
    paddingBottom: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  txtLeft: {
    fontSize: 16,
    fontWeight: "400",
    color: "#757678",
    marginBottom: 10,
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
    borderColor: "#909694",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bookBtn: {
    backgroundColor: "#00bcd5",
    borderRadius: 15,
  },
  bookTxt: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    marginTop: 15,
    marginBottom: 15,
  },
});

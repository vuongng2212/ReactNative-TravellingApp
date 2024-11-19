import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import Back from "../assets/left-arrow.png";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import star from "../assets/star.png";

export default function BookingScreen({ navigation }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      const userRef = doc(db, "users", "3hzoxYV7m5nlV6e4vEKH");
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();

      if (userData?.Booking) {
        setBookings(userData.Booking);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderBookingItem = ({ item }) => {
    return (
      <View style={styles.bookingItem}>
        <Image
          source={{ uri: `${item.placeImg}.jpg` }}
          style={styles.placeImage}
        />
        <View style={styles.bookingInfo}>
          <Text style={styles.placeName}>{item.placeName}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.placeRate}>Đánh giá: {item.placeRate}</Text>
            <Image
              source={star}
              style={{ width: 15, height: 15, marginLeft: 5 }}
            />
          </View>
          <Text style={styles.totalPrice}>Giá: ${item.totalPrice}</Text>
          <Text style={styles.payID}>Mã đơn: {item.payID}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Booking title */}
      <View style={styles.title}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Back} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Booking</Text>
        <Text></Text>
      </View>

      {/* Booking content */}
      <View style={styles.content}>
        {loading ? (
          <Text>Đang tải...</Text>
        ) : bookings.length > 0 ? (
          <FlatList
            data={bookings}
            renderItem={renderBookingItem}
            keyExtractor={(item) => item.payID}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text style={styles.emptyText}>Chưa có đơn đặt chỗ nào</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 30,
    paddingRight: 30,
  },
  title: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  content: {
    flex: 1,
    backgroundColor: "#fafafa",
    borderRadius: 10,
  },
  bookingItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  placeImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  bookingInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
  },
  placeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  placeRate: {
    fontSize: 14,
    color: "#666",
  },
  totalPrice: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2ecc71",
  },
  payID: {
    fontSize: 12,
    color: "#999",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
});

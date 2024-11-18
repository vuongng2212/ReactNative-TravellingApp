import React, { useEffect, useState } from "react";
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
  Modal,
  ScrollView,
} from "react-native";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Checkbox } from "react-native-paper";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
// Image
import SearchIcon from "../assets/SearchIcon.png";
import PropertyList from "../components/SearchResultsScreen-PropertyList";

export default function HomeScreen({ navigation, route }) {
  let searchParams = "Anywhere";
  let location = "Anywhere";
  let startDay = null;
  let endDay = null;
  let adultGuest = 0;
  let childGuest = 0;
  if (route.params !== undefined) {
    ({ location, startDay, endDay, adultGuest, childGuest } = route.params);
    searchParams = `${location}, ${startDay}, ${endDay}, ${adultGuest}, ${childGuest}`;
  }
  // Fetch data
  const [data, setData] = useState([]);
  // Checkbox
  const [checkedAll, setChedkedAll] = useState(true);
  // Model
  const [isModalVisible, setModalVisible] = useState(false);
  // Thêm states cho Rooms and beds
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "Place"));
      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(fetchedData);
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {/* Search Area */}
      <View style={styles.search}>
        <TouchableOpacity>
          <Image source={SearchIcon} style={styles.searchImg} />
        </TouchableOpacity>
        <TextInput
          placeholder={searchParams}
          style={styles.txtInput}
          onPress={() => {}}
        />
      </View>
      <View style={styles.container2}>
        <TouchableOpacity>
          <View
            style={{
              paddingHorizontal: 26,
              borderRadius: 8,
              paddingVertical: 26,
              alignItems: "center",
            }}
          >
            <Image
              style={styles.menuImg}
              source={require("../assets/beach3.png")}
            />
            <Text style={{ fontSize: 20, fontWeight: 400 }}>Beach</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              paddingHorizontal: 26,
              borderRadius: 8,
              paddingVertical: 26,
              alignItems: "center",
            }}
          >
            <Image
              style={styles.menuImg}
              source={require("../assets/mountain.png")}
            />
            <Text style={{ fontSize: 20, fontWeight: 400 }}>Mountain</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              paddingHorizontal: 26,
              borderRadius: 8,
              paddingVertical: 26,
              alignItems: "center",
            }}
          >
            <Image
              style={styles.menuImg}
              source={require("../assets/camping.png")}
            />
            <Text style={{ fontSize: 20, fontWeight: 400 }}>Camping</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* Present total price */}
      <View style={styles.presentTotalPrice}>
        <Text style={styles.txtPresent}>Present total price</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.txtAllInclusive}>All-inclusive, pre-tax</Text>
          <Checkbox
            status={checkedAll ? "checked" : "unchecked"}
            onPress={() => {
              setChedkedAll(!checkedAll);
            }}
            color="#0394ae"
          />
        </View>
      </View>
      {/* Flat list */}
      <PropertyList
        data={filteredData.length > 0 ? filteredData : data}
        navigation={navigation}
        startDay={startDay}
        endDay={endDay}
        guests={adultGuest}
        child={childGuest}
      />
      {/* Modal */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
      </Modal>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
          <Image
            style={styles.menuImg2}
            source={require("../assets/SearchIcon.png")}
          />
          <Text style={styles.footerText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FavoriteScreen')}>
        <Image
            style={styles.menuImg2}
            source={require("../assets/heart.png")}
          />
          <Text style={styles.footerText}>Favorite</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <Image
            style={styles.menuImg2}
            source={require("../assets/booking.png")}
          />
          <Text style={styles.footerText}>Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <Image
            style={styles.menuImg2}
            source={require("../assets/message.png")}
          />
          <Text style={styles.footerText}>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => navigation.navigate('ProfileScreen')}>
              <Image
            style={styles.menuImg2}
            source={require("../assets/profile.jpg")}
          />
          <Text style={[styles.footerText]}>My Profile</Text>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#ffffff",
    flex: 1, // Đảm bảo modal sẽ hiển thị đúng
  },
  search: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
  },
  searchImg: {
    width: 25,
    height: 25,
    margin: 6,
  },
  txtInput: {
    fontSize: 20,
    flex: 1,
  },
  presentTotalPrice: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    borderColor: "#f7f7f7",
  },
  txtPresent: {
    margin: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  txtAllInclusive: {
    color: "gray",
    fontSize: 14,
    marginLeft: 5,
    marginBottom: 5,
  },
  horizontalLine: {
    height: 3,
    marginTop: 25,
    backgroundColor: "#f6f6f6",
    width: "100%",
  },
  button: {
    padding: 10,
    backgroundColor: "#00bfd1",
    borderRadius: 5,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  txtDetailTOP: {
    marginTop: 5,
    color: "#9fa0a5",
    width: "85%",
  },
  container2: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "20",
  },
  menuImg: {
    width: 50,
    height: 50,
    margin: 3,
    borderRadius: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  footerText: {
    fontSize: 14,
    color: '#888',
  },
  activeFooter: {
    color: '#003580',
    fontWeight: 'bold',
  },
  menuImg2: {
    width: 20,
    height: 20,
    margin: 3,
    justifyContent:"center",
  },
});
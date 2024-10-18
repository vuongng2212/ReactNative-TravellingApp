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
} from "react-native";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import SearchIcon from "../assets/SearchIcon.png";
import AdjustIcon from "../assets/AdjustIcon.png";

export default function SearchResultsScreen() {
  const [data, setData] = useState([]);

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

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity>
        <Image source={{ uri: `${item.Image}.jpg` }} style={styles.img} />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.txtRoom}>{item.Name}</Text>
          <Text style={{ marginTop: 10 }}>{item.Rate}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>{item.Bedrooms}</Text>
          <Text>${item.Price}/night</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.search}>
        <TouchableOpacity>
          <Image source={SearchIcon} style={styles.searchImg} />
        </TouchableOpacity>
        <TextInput placeholder="Anywhere" style={styles.txtInput} />
        <TouchableOpacity>
          <Image source={AdjustIcon} style={styles.adjust} />
        </TouchableOpacity>
      </View>
      <View style={styles.presentTotalPrice}>
        <Text style={styles.txtPresent}>Present total price</Text>
        <Text style={styles.txtAllInclusive}>All-includesive, pre-tax</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
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
    width: 30,
    height: 30,
    margin: 6,
  },
  adjust: {
    width: 30,
    height: 30,
    margin: 6,
  },
  txtInput: {
    fontSize: 20,
  },
  presentTotalPrice: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 40,
    borderColor: "gray",
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
  img: {
    width: "100%",
    height: 300,
    borderRadius: 5,
    marginTop: 20,
  },
  txtRoom: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
});

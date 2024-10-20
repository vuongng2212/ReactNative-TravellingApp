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
import AdjustIcon from "../assets/AdjustIcon.png";

export default function SearchResultsScreen({ navigation }) {
  // Fetch dât
  const [data, setData] = useState([]);
  // Multi range
  const [range, setRange] = useState([10, 250]);
  // Checkbox
  const [checkedAll, setChedkedAll] = useState(true);
  const [checkedEntire, setChedkedEntire] = useState(false);
  const [checkedPrivate, setChedkedPrivate] = useState(false);
  const [checkedDormitories, setChedkedDormitories] = useState(false);
  const [checkedKitchen, setCheckedKitchen] = useState(false);
  const [checkedPool, setCheckedPool] = useState(false);
  const [checkedGym, setCheckedGym] = useState(false);
  const [checkedOutdoor, setCheckedOutdoor] = useState(false);
  const [checkedInternet, setCheckedInternet] = useState(false);
  // Model
  const [isModalVisible, setModalVisible] = useState(false);

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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PropertyDetailScreen", { item: item });
        }}
      >
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.search}>
        <TouchableOpacity>
          <Image source={SearchIcon} style={styles.searchImg} />
        </TouchableOpacity>
        <TextInput placeholder="Anywhere" style={styles.txtInput} />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={AdjustIcon} style={styles.adjust} />
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalLine}></View>
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
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modelTitle}>
              <Text></Text>
              <Text style={styles.txtTitle}>Filters</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text>X</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.horizontaModellLine}></View>

            <ScrollView style={{ maxHeight: "100%", margin: 15 }}>
              {/* Price range */}
              <View>
                <Text style={styles.txtMainContent}>Price range</Text>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <MultiSlider
                    values={range}
                    sliderLength={320}
                    onValuesChange={(values) => setRange(values)}
                    min={10}
                    max={250}
                    step={1}
                    selectedStyle={{
                      backgroundColor: "#1EB1FC",
                    }}
                    unselectedStyle={{
                      backgroundColor: "#D3D3D3",
                    }}
                    markerStyle={{
                      backgroundColor: "#1EB1FC",
                      height: 20,
                      width: 20,
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.borderRange}>
                    <View
                      style={{
                        marginLeft: 25,
                        marginRight: 25,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                    >
                      <Text>Minimum</Text>
                      <Text>US$ {range[0]}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 30 }}>-</Text>
                  </View>
                  <View style={styles.borderRange}>
                    <View
                      style={{
                        marginLeft: 25,
                        marginRight: 25,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                    >
                      <Text>Maximum</Text>
                      <Text>US$ {range[1]}</Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* Type of place */}
              <View style={{ marginTop: 25 }}>
                <Text style={styles.txtMainContent}>Type of place</Text>
                <View>
                  <Text style={styles.txtMainTOP}>Entire place</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.txtDetailTOP}>
                      Entire apartments, condos, house
                    </Text>
                    <Checkbox
                      status={checkedEntire ? "checked" : "unchecked"}
                      onPress={() => {
                        setChedkedEntire(!checkedEntire);
                      }}
                      color="#0394ae"
                    />
                  </View>
                </View>
                <View>
                  <Text style={styles.txtMainTOP}>Private room</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.txtDetailTOP}>
                      Typically come with a private bathroom unless otherwise
                      started
                    </Text>
                    <Checkbox
                      status={checkedPrivate ? "checked" : "unchecked"}
                      onPress={() => {
                        setChedkedPrivate(!checkedPrivate);
                      }}
                      color="#0394ae"
                    />
                  </View>
                </View>
                <View>
                  <Text style={styles.txtMainTOP}>Domritories</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.txtDetailTOP}>
                      Large rooms with multiple beds that are shared with others
                    </Text>
                    <Checkbox
                      status={checkedDormitories ? "checked" : "unchecked"}
                      onPress={() => {
                        setChedkedDormitories(!checkedDormitories);
                      }}
                      color="#0394ae"
                    />
                  </View>
                </View>
              </View>
              {/* Room and bed */}
              <View style={styles.modalText}>
                <Text style={styles.txtMainContent}>Rooms and beds</Text>
                <TextInput
                  placeholder="Bedrooms"
                  style={styles.txtRoomandBed}
                />
                <View style={styles.horizontaModellLine}></View>
                <TextInput placeholder="Beds" style={styles.txtRoomandBed} />
                <View style={styles.horizontaModellLine}></View>
                <TextInput
                  placeholder="Bathrooms"
                  style={styles.txtRoomandBed}
                />
                <View style={styles.horizontaModellLine}></View>
              </View>
              {/* Facilities */}
              <View>
                <Text style={styles.txtMainContent}>Facilities</Text>
                <View style={styles.viewFacilities}>
                  <Text style={styles.txtFacilites}>Kitchen</Text>
                  <Checkbox
                    status={checkedKitchen ? "checked" : "unchecked"}
                    onPress={() => {
                      setCheckedKitchen(!checkedKitchen);
                    }}
                    color="#0394ae"
                  />
                </View>
                <View style={styles.viewFacilities}>
                  <Text style={styles.txtFacilites}>Pool</Text>
                  <Checkbox
                    status={checkedPool ? "checked" : "unchecked"}
                    onPress={() => {
                      setCheckedPool(!checkedPool);
                    }}
                    color="#0394ae"
                  />
                </View>
                <View style={styles.viewFacilities}>
                  <Text style={styles.txtFacilites}>Gym</Text>
                  <Checkbox
                    status={checkedGym ? "checked" : "unchecked"}
                    onPress={() => {
                      setCheckedGym(!checkedGym);
                    }}
                    color="#0394ae"
                  />
                </View>
                <View style={styles.viewFacilities}>
                  <Text style={styles.txtFacilites}>Outdoor space</Text>
                  <Checkbox
                    status={checkedOutdoor ? "checked" : "unchecked"}
                    onPress={() => {
                      setCheckedOutdoor(!checkedOutdoor);
                    }}
                    color="#0394ae"
                  />
                </View>
                <View style={styles.viewFacilities}>
                  <Text style={styles.txtFacilites}>Internet access</Text>
                  <Checkbox
                    status={checkedInternet ? "checked" : "unchecked"}
                    onPress={() => {
                      setCheckedInternet(!checkedInternet);
                    }}
                    color="#0394ae"
                  />
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginLeft: 15,
                marginRight: 15,
              }}
            >
              <TouchableOpacity>
                <Text style={{ color: "#b1b2b6" }}>Clear all</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>View Results</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  adjust: {
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
  horizontalLine: {
    height: 3,
    marginTop: 25,
    backgroundColor: "#f6f6f6",
    width: "100%",
  },
  horizontaModellLine: {
    height: 3,
    marginTop: 10,
    backgroundColor: "#f6f6f6",
    width: "100%",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    height: "70%",
    padding: 20,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modelTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  txtTitle: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    alignItems: "flex-start",
    marginTop: 25,
  },
  button: {
    padding: 10,
    backgroundColor: "#00bfd1",
    borderRadius: 5,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  txtRoomandBed: {
    fontSize: 14,
    marginTop: 10,
  },
  txtMainContent: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 25,
  },
  txtFacilites: {
    fontSize: 16,
  },
  viewFacilities: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  borderRange: {
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    borderColor: "#c6c8c7",
  },
  txtMainTOP: {
    fontWeight: "bold",
    marginTop: 10,
  },
  txtDetailTOP: {
    marginTop: 5,
    color: "#9fa0a5",
    width: "85%",
  },
});

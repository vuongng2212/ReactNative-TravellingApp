import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const PropertyList = ({
  data,
  navigation,
  startDay,
  endDay,
  guests,
  child,
}) => {
  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PropertyDetailScreen", {
            item: item,
            startDay: startDay,
            endDay: endDay,
            guests: guests,
            child: child,
          });
        }}
      >
        <Image source={{ uri: `${item.Place.img}.jpg` }} style={styles.img} />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.txtRoom}>{item.Place.name}</Text>
          <Text style={{ marginTop: 10 }}>{item.Place.rate}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>{item.Room.bedrooms.quantity}</Text>
          <Text>${item.Place.price}/night</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
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

export default PropertyList;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import HeartIcon from "../assets/heart.png";
import HeartIconFilled from "../assets/red-heart.png";
import StarIcon from "../assets/star.png";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

const PropertyList = ({
  data,
  navigation,
  startDay,
  endDay,
  guests,
  child,
}) => {
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const userId = "3hzoxYV7m5nlV6e4vEKH";
        if (!userId) return;

        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);
        const userFavorites = userDoc.data()?.Favourite || [];

        const favoritesObj = {};
        userFavorites.forEach((fav) => {
          favoritesObj[fav.placeId] = true;
        });

        setFavorites(favoritesObj);
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    loadFavorites();
  }, []);

  const toggleFavorite = async (item) => {
    try {
      const userId = "3hzoxYV7m5nlV6e4vEKH";
      if (!userId) {
        console.log("User not logged in");
        return;
      }

      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      const favoritePlace = {
        placeId: item.id || "",
        placeName: item.Place?.name || "",
        placeImg: item.Place?.img || "",
        placeRate: item.Place?.rate || 0,
        placePrice: item.Place?.price || 0,
        guests: item.Place?.guest || 1,
        bedroomsQuantity: item.Room?.bedrooms?.quantity || "",
      };

      if (!favorites[item.id]) {
        await updateDoc(userRef, {
          Favourite: arrayUnion(favoritePlace),
        });
      } else {
        await updateDoc(userRef, {
          Favourite: arrayRemove(favoritePlace),
        });
      }

      setFavorites((prev) => ({
        ...prev,
        [item.id]: !prev[item.id],
      }));
    } catch (error) {
      console.error("Error updating favorites:", error);
      console.log("Error details:", error.message);
      console.log("Item causing error:", item);
    }
  };

  const renderItem = ({ item }) => {
    const firstImage =
      Array.isArray(item.Place.img) && item.Place.img.length > 0
        ? `${item.Place.img[0]}.jpg`
        : `${item.Place.img}.jpg`;

    console.log(firstImage);

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PropertyDetailScreen", {
              placeId: item.id,
              startDay: startDay,
              endDay: endDay,
              guests: guests,
              child: child,
            });
          }}
        >
          <View style={styles.imageContainer}>
            <Image source={{ uri: firstImage }} style={styles.img} />
            <TouchableOpacity
              style={styles.heartButton}
              onPress={() => toggleFavorite(item)}
            >
              <Image
                source={favorites[item.id] ? HeartIconFilled : HeartIcon}
                style={[
                  styles.heartIcon,
                  favorites[item.id] && styles.heartIconFilled,
                ]}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.txtRoom}>{item.Place.name}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Text>{item.Place.rate}</Text>
              <Image source={StarIcon} style={styles.starIcon} />
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>{item.Room.bedrooms.quantity} bedroom</Text>
            <Text>${item.Place.price}/night</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

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
  imageContainer: {
    position: "relative",
  },
  heartButton: {
    position: "absolute",
    top: 30, // Điều chỉnh vị trí từ top
    right: 10, // Điều chỉnh vị trí từ right
    backgroundColor: "white",
    padding: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heartIcon: {
    width: 24,
    height: 24,
  },
  heartIconFilled: {
    tintColor: "red",
  },
  starIcon: {
    marginLeft: 5,
    width: 15,
    height: 15,
  },
});

export default PropertyList;

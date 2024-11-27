import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import PropertyList from "../components/SearchResultsScreen-PropertyList";
import MenuFooter from "../components/MenuFooter";

const FavoriteScreen = ({ navigation, route }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.log("No user logged in");
          navigation.navigate("SigninScreen");
          return;
        }

        const userRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);
        const userFavorites = userDoc.data()?.Favourite || [];

        setFavorites(userFavorites);
        setLoading(false);
      } catch (error) {
        console.error("Error loading favorites:", error);
        setLoading(false);
      }
    };

    loadFavorites();
  }, [navigation]);

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.content}>
          <Text>Đang tải...</Text>
        </View>
      );
    }

    if (favorites.length === 0) {
      return (
        <View style={styles.content}>
          <Image
            source={{ uri: "https://example.com/saved-placeholder.jpg" }}
            style={styles.image}
          />
          <Text style={styles.title}>Lưu chỗ nghỉ bạn thích</Text>
          <Text style={styles.subtitle}>
            Tạo danh sách các chỗ nghỉ yêu thích để chia sẻ, so sánh và đặt
            phòng.
          </Text>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => navigation.navigate("HomeScreen")}
          >
            <Text style={styles.searchButtonText}>Bắt đầu tìm kiếm</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // Chuyển đổi dữ liệu favorite để phù hợp với PropertyList
    const formattedFavorites = favorites.map((fav) => ({
      id: fav.placeId,
      Place: {
        id: fav.placeId,
        name: fav.placeName,
        rate: fav.placeRate,
        price: fav.placePrice,
        img: fav.placeImg,
        guest: fav.guests,
      },
      Room: {
        bedrooms: {
          quantity: fav.bedroomsQuantity,
        },
      },
    }));

    return (
      <View style={styles.favoriteList}>
        <PropertyList
          data={formattedFavorites}
          navigation={navigation}
          startDay={null}
          endDay={null}
          guests={0}
          child={0}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorite</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Text style={styles.chatIcon}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.notificationIcon}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      {renderContent()}

      <MenuFooter navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#0066CC",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  chatIcon: {
    color: "#fff",
    fontSize: 18,
    marginRight: 15,
  },
  notificationIcon: {
    color: "#fff",
    fontSize: 18,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: "#0066CC",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 15,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  createListText: {
    color: "#0066CC",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  footerText: {
    fontSize: 14,
    color: "#888",
  },
  activeFooter: {
    color: "#003580",
    fontWeight: "bold",
  },
  menuImg2: {
    width: 20,
    height: 20,
    margin: 3,
    justifyContent: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  favoriteList: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default FavoriteScreen;

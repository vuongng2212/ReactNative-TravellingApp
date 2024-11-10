import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  FlatList,
} from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Svg, { Rect } from "react-native-svg";
import Back from "../assets/left-arrow.png";
import StarIcon from "../assets/star.png";

export default function ReviewScreen({ navigation, route }) {
  const [placeData, setPlaceData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        console.log("Place ID:", route.params.id);

        const docRef = doc(db, "Place", route.params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Place Data:", data);
          console.log("Reviews:", data.Reviews);

          setPlaceData(data);
          setReviews(data.Reviews || []);

          if (data.Reviews && data.Reviews.length > 0) {
            const avgRating =
              data.Reviews.reduce(
                (acc, review) => acc + Number(review.rating),
                0
              ) / data.Reviews.length;
            setAverageRating(avgRating.toFixed(1));
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching place data:", error);
      }
    };

    fetchPlaceData();
  }, [route.params.id]);

  // Tính số lượng đánh giá cho mỗi rating
  const getRatingCount = (rating) => {
    return reviews.filter((review) => Number(review.rating) === rating).length;
  };

  // Tính phần trăm cho mỗi rating
  const calculatePercentage = (rating) => {
    const count = getRatingCount(rating);
    return reviews.length > 0 ? (count / reviews.length) * 100 : 0;
  };

  const renderReviewItem = ({ item }) => {
    console.log("Rendering review item:", item);

    return (
      <View style={styles.reviewItem}>
        <View style={styles.reviewHeader}>
          <Image
            source={{ uri: `${item.userAvatar}.jpg` }}
            style={styles.avatar}
            onError={(e) =>
              console.log("Error loading avatar:", e.nativeEvent.error)
            }
          />
          <View style={styles.reviewInfo}>
            <Text style={styles.userName}>{item.userName}</Text>
            <View style={styles.ratingContainer}>
              {[...Array(5)].map((_, index) => (
                <Image
                  key={index}
                  source={StarIcon}
                  style={[
                    styles.starIcon,
                    { opacity: index < Number(item.rating) ? 1 : 0.3 },
                  ]}
                />
              ))}
            </View>
          </View>
          <Text style={styles.reviewDate}>
            {item.createdAt?.toDate
              ? new Date(item.createdAt.toDate()).toLocaleDateString()
              : "No date"}
          </Text>
        </View>
        <Text style={styles.reviewContent}>{item.content}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Title */}
        <View style={styles.title}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Back} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Reviews</Text>
          <Text></Text>
        </View>

        {/* Reviews Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.totalReviews}>{reviews.length} reviews</Text>
          <View style={styles.starView}>
            <View style={{ marginRight: 100 }}>
              <Text style={{ fontSize: 18 }}>{averageRating}/5</Text>
              <View style={{ flexDirection: "row" }}>
                {[...Array(5)].map((_, index) => (
                  <Image
                    key={index}
                    source={StarIcon}
                    style={[
                      styles.starIcon,
                      { opacity: index < Math.round(averageRating) ? 1 : 0.3 },
                    ]}
                  />
                ))}
              </View>
            </View>

            {/* Rating Bars */}
            <View>
              {[5, 4, 3, 2, 1].map((rating) => (
                <View key={rating} style={styles.rateBar}>
                  <View style={{ width: "60%" }}>
                    <Svg height={10} width="100%">
                      <Rect
                        x="0"
                        y="0"
                        width="100%"
                        height={10}
                        fill="lightgray"
                        rx={10}
                        ry={10}
                      />
                      <Rect
                        x="0"
                        y="0"
                        width={`${calculatePercentage(rating)}%`}
                        height={10}
                        fill="gold"
                        rx={10}
                        ry={10}
                      />
                    </Svg>
                  </View>
                  <Text style={styles.lblRate}>{rating}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Reviews List */}
        <FlatList
          data={reviews}
          renderItem={renderReviewItem}
          keyExtractor={(item) => item.id}
          style={styles.reviewsList}
          contentContainerStyle={styles.reviewsContent}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  summaryContainer: {
    backgroundColor: "#fff",
  },
  title: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
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
  rateBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  lblRate: {
    marginLeft: 10,
  },
  reviewItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  reviewContent: {
    fontSize: 14,
    lineHeight: 20,
  },
  reviewsList: {
    flex: 1,
  },
  reviewsContent: {
    paddingBottom: 20,
  },
  reviewDate: {
    color: "#666",
    fontSize: 12,
  },
  totalReviews: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
});

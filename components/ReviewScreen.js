import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";
import Svg, { Rect } from "react-native-svg";
import Back from "../assets/left-arrow.png";
import StarIcon from "../assets/star.png";
export default function ReviewScreen({ navigation }) {
  const barWidth = 300; // Độ rộng của thanh
  const barHeight = 10; // Chiều cao của thanh
  const borderRadius = 10; // Độ cong của góc
  const ratings = {
    fiveStars: 80,
    totalReviews: 100, // Tổng số lượt đánh giá
  };

  const fiveStarPercentage = (ratings.fiveStars / ratings.totalReviews) * 100;
  const totalView = 262;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Title */}
      <View style={styles.title}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Back} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Reviews</Text>
        <Text></Text>
      </View>

      {/* Reviews */}
      <View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 22,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          {totalView} reviews
        </Text>
        {/* Rating Reviews */}
        <View style={styles.starView}>
          <View style={{ marginRight: 100 }}>
            <Text style={{ fontSize: 18 }}>4.5/5</Text>
            {/* Star */}
            <View style={{ flexDirection: "row" }}>
              <Image source={StarIcon} style={styles.starIcon} />
              <Image source={StarIcon} style={styles.starIcon} />
              <Image source={StarIcon} style={styles.starIcon} />
              <Image source={StarIcon} style={styles.starIcon} />
              <Image source={StarIcon} style={styles.starIcon} />
            </View>
          </View>

          {/* Rate Bar */}
          {/* Thong ke luot reviews*/}
          <View>
            <View style={styles.rateBar}>
              <View style={{ width: "60%" }}>
                <Svg height={barHeight} width="100%">
                  <Rect
                    x="0"
                    y="0"
                    width={barWidth}
                    height={barHeight}
                    fill="lightgray"
                    rx={borderRadius}
                    ry={borderRadius}
                  />

                  <Rect
                    x="0"
                    y="0"
                    width={`${fiveStarPercentage}%`}
                    height={barHeight}
                    fill="gold"
                    rx={borderRadius}
                    ry={borderRadius}
                  />
                </Svg>
              </View>
              <Text style={styles.lblRate}>5</Text>
            </View>
            <View style={styles.rateBar}>
              <View style={{ width: "60%" }}>
                <Svg height={barHeight} width="100%">
                  <Rect
                    x="0"
                    y="0"
                    width={barWidth}
                    height={barHeight}
                    fill="lightgray"
                    rx={borderRadius}
                    ry={borderRadius}
                  />

                  <Rect
                    x="0"
                    y="0"
                    width={`${fiveStarPercentage}%`}
                    height={barHeight}
                    fill="gold"
                    rx={borderRadius}
                    ry={borderRadius}
                  />
                </Svg>
              </View>
              <Text style={styles.lblRate}>4</Text>
            </View>
            <View style={styles.rateBar}>
              <View style={{ width: "60%" }}>
                <Svg height={barHeight} width="100%">
                  <Rect
                    x="0"
                    y="0"
                    width={barWidth}
                    height={barHeight}
                    fill="lightgray"
                    rx={borderRadius}
                    ry={borderRadius}
                  />

                  <Rect
                    x="0"
                    y="0"
                    width={`${fiveStarPercentage}%`}
                    height={barHeight}
                    fill="gold"
                    rx={borderRadius}
                    ry={borderRadius}
                  />
                </Svg>
              </View>
              <Text style={styles.lblRate}>3</Text>
            </View>
            <View style={styles.rateBar}>
              <View style={{ width: "60%" }}>
                <Svg height={barHeight} width="100%">
                  <Rect
                    x="0"
                    y="0"
                    width={barWidth}
                    height={barHeight}
                    fill="lightgray"
                    rx={borderRadius}
                    ry={borderRadius}
                  />

                  <Rect
                    x="0"
                    y="0"
                    width={`${fiveStarPercentage}%`}
                    height={barHeight}
                    fill="gold"
                    rx={borderRadius}
                    ry={borderRadius}
                  />
                </Svg>
              </View>
              <Text style={styles.lblRate}>2</Text>
            </View>
            <View style={styles.rateBar}>
              <View style={{ width: "60%" }}>
                <Svg height={barHeight} width="100%">
                  <Rect
                    x="0"
                    y="0"
                    width={barWidth}
                    height={barHeight}
                    fill="lightgray"
                    rx={borderRadius}
                    ry={borderRadius}
                  />

                  <Rect
                    x="0"
                    y="0"
                    width={`${fiveStarPercentage}%`}
                    height={barHeight}
                    fill="gold"
                    rx={borderRadius}
                    ry={borderRadius}
                  />
                </Svg>
              </View>
              <Text style={styles.lblRate}>1</Text>
            </View>
          </View>

          {/* Detail reviews */}
          {/* Show all comments */}
          {/* Using Firebase to load data from array Reviews */}
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
});

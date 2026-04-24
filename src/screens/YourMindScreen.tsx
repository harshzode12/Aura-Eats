import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "@react-native-community/blur";
import Ionicons from "react-native-vector-icons/Ionicons";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

import CommonHeader from "../components/CommonHeader";

type Props = NativeStackScreenProps<RootStackParamList, "yourmind">;

const categories = [
  { title: "Thali", image: require("../../assets/images/thali.png") },
  { title: "Salad", image: require("../../assets/images/salad.png") },
  { title: "Dessert", image: require("../../assets/images/dessert.png") },
];

const restaurants = [
  {
    name: "Taj Hotel",
    rating: "4.8/5",
    reviews: "2914 reviews",
    image: require("../../assets/images/pizza.png"),
  },
  {
    name: "Pind Lahori",
    rating: "4.6/5",
    reviews: "2495 reviews",
    image: require("../../assets/images/food1.jpg"),
  },
  {
    name: "The Heritage",
    rating: "4.5/5",
    reviews: "1814 reviews",
    image: require("../../assets/images/food2.jpg"),
  },
  {
    name: "The Privilege",
    rating: "4.2/5",
    reviews: "914 reviews",
    image: require("../../assets/images/food3.jpg"),
  },
];

const YourMindScreen: React.FC<Props> = ({ route, navigation }) => {
  // ✅ SAFE PARAM HANDLING (NO CRASH EVER 😎)
  const { selectedAddressType, currentAddress } = route?.params ?? {
    selectedAddressType: "home",
    currentAddress: "No Address",
  };

  const [liked, setLiked] = useState<{ [key: number]: boolean }>({});
  const [selectedCategory, setSelectedCategory] = useState(0);

  const toggleLike = (index: number) => {
    setLiked((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const onPressLocation = () => {
    console.log("Location pressed");
  };

  const goToCart = () => {
    const selectedItems = [
      {
        id: "1",
        name: "Paneer Angara",
        price: 190,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1601924582975-7e0c1d56f44f",
      },
      {
        id: "2",
        name: "Tawa Roti",
        price: 120,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1601924582975-7e0c1d56f44f",
      },
    ];

    navigation.navigate("Pay", {
      cartItems: selectedItems,
    });
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={styles.background}
    >
      <SafeAreaView style={styles.safe}>
        {/* HEADER */}
        <CommonHeader
          selectedAddressType={selectedAddressType}
          currentAddress={currentAddress}
          onPressLocation={onPressLocation}
        />

        {/* SEARCH */}
        <View style={styles.searchBar}>
          <Image
            source={require("../../assets/images/search.png")}
            style={styles.searchIcon}
          />
          <Text style={styles.searchText}>
            What are you craving today ?
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>What’s on your mind?</Text>

          {/* CATEGORIES */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedCategory(index)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.circleWrapper,
                    selectedCategory === index && styles.activeCategory,
                  ]}
                >
                  <Image source={item.image} style={styles.circleImage} />
                  <View style={styles.circleOverlay} />
                  <Text style={styles.circleText}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>
            Best Restaurants for {categories[selectedCategory].title}
          </Text>

          {/* RESTAURANTS */}
          {restaurants.map((item, index) => (
            <View key={index} style={styles.card}>
              <BlurView
                style={StyleSheet.absoluteFill}
                blurType="light"
                blurAmount={40}
              />

              <TouchableOpacity
                style={styles.heartBtn}
                onPress={() => toggleLike(index)}
              >
                <Ionicons
                  name={liked[index] ? "heart" : "heart-outline"}
                  size={22}
                  color={liked[index] ? "#ff3b30" : "#ffffff"}
                />
              </TouchableOpacity>

              <View style={styles.cardContent}>
                <Image source={item.image} style={styles.cardImage} />

                <View style={styles.verticalDivider} />

                <View style={{ flex: 1 }}>
                  <Text style={styles.hotelName}>{item.name}</Text>

                  <View style={styles.ratingRow}>
                    <View style={styles.ratingBadge}>
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                    <Text style={styles.reviewText}>
                      ({item.reviews})
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}

          {/* CART BUTTON */}
          <TouchableOpacity style={styles.cartBtn} onPress={goToCart}>
            <Text style={styles.cartText}>View Cart</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default YourMindScreen;

const styles = StyleSheet.create({
  background: { flex: 1 },
  safe: { flex: 1, paddingHorizontal: 16 },

  heading: {
    fontSize: 22,
    color: "#ffffff",
    marginBottom: 15,
    fontFamily: "CrimsonText-Bold",
    textDecorationLine: "underline",
  },

  sectionTitle: {
    fontSize: 20,
    color: "#ffffff",
    marginVertical: 18,
    fontFamily: "CrimsonText-SemiBold",
    textDecorationLine: "underline",
  },

  circleWrapper: {
    width: 110,
    height: 110,
    borderRadius: 60,
    marginRight: 14,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  activeCategory: {
    borderColor: "#00ffae",
    shadowColor: "#00ffae",
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },

  circleImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  circleOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  circleText: {
    position: "absolute",
    bottom: 10,
    color: "#fff",
    fontSize: 16,
  },

  card: {
    borderRadius: 22,
    marginBottom: 16,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },

  heartBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
  },

  cardContent: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
  },

  cardImage: {
    width: 85,
    height: 85,
    borderRadius: 16,
  },

  verticalDivider: {
    width: 1.5,
    height: 85,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginHorizontal: 12,
  },

  hotelName: {
    color: "#492000",
    fontSize: 18,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  ratingBadge: {
    backgroundColor: "#DF9A59",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },

  ratingText: {
    color: "#6A3914",
    fontSize: 13,
  },

  reviewText: {
    color: "#ddd",
    marginLeft: 10,
    fontSize: 13,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },

  searchIcon: {
    width: 20,
    height: 20,
    tintColor: "#ffffff",
    marginRight: 10,
  },

  searchText: {
    color: "#ffffff",
    fontSize: 16,
  },

  cartBtn: {
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: "#0f7a5c",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
  },

  cartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
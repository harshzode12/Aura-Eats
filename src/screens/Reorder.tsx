import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

import CommonHeader from "../components/CommonHeader";

// ✅ TYPES
type Props = NativeStackScreenProps<RootStackParamList, "yourmind">;

const Reorder = ({ navigation, route }: Props) => {
  // ✅ SAFE PARAM HANDLING (NO CRASH EVER)
  const selectedAddressType =
    route.params?.selectedAddressType ?? "home";

  const currentAddress =
    route.params?.currentAddress ?? "No address selected";

  const [liked, setLiked] = useState<{ [key: number]: boolean }>({});
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const toggleLike = (index: number) => {
    setLiked((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const addItem = (key: string) => {
    setCart((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
  };

  const removeItem = (key: string) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[key] > 1) {
        updated[key] -= 1;
      } else {
        delete updated[key];
      }
      return updated;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((a, b) => a + b, 0);
  };

  const restaurants = [
    {
      name: "Taj Hotel",
      rating: "4.8",
      reviews: "2914",
      image: require("../../assets/images/pizza1.png"),
      items: [
        { name: "Paneer Angara", price: 190 },
        { name: "Tawa Roti", price: 120 },
        { name: "Jeera Rice & Dal Fry", price: 110 },
      ],
    },
    {
      name: "Social Blend",
      rating: "4.3",
      reviews: "1438",
      image: require("../../assets/images/pasta.jpg"),
      items: [
        { name: "Aglio Olio Pasta", price: 260 },
        { name: "Spaghetti", price: 190 },
      ],
    },
    {
      name: "Urban Panjab",
      rating: "4.3",
      reviews: "1438",
      image: require("../../assets/images/pasta.jpg"),
      items: [
        { name: "Aglio Olio Pasta", price: 260 },
        { name: "Spaghetti", price: 190 },
      ],
    },
  ];

  // 🔥 CART → PAY SCREEN
  const handleViewCart = () => {
    const selectedItems: any[] = [];

    restaurants.forEach((res) => {
      res.items.forEach((item) => {
        const key = `${res.name}-${item.name}`;
        const qty = cart[key];

        if (qty) {
          selectedItems.push({
            id: key,
            name: item.name,
            price: item.price,
            quantity: qty,
            image: res.image,
          });
        }
      });
    });

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
        <CommonHeader
          selectedAddressType={selectedAddressType}
          currentAddress={currentAddress}
          onPressLocation={() => {}}
        />

        <Text style={styles.title}>Reorder</Text>

        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          {restaurants.map((res, index) => (
            <View key={index} style={styles.cardWrapper}>
              <View style={styles.card}>
                <TouchableOpacity
                  style={styles.heartBtn}
                  onPress={() => toggleLike(index)}
                >
                  <Ionicons
                    name={liked[index] ? "heart" : "heart-outline"}
                    size={22}
                    color={liked[index] ? "#ff3b30" : "#fff"}
                  />
                </TouchableOpacity>

                <View style={styles.topRow}>
                  <Image source={res.image} style={styles.foodImage} />

                  <View style={styles.verticalDivider} />

                  <View style={{ flex: 1 }}>
                    <Text style={styles.resName}>{res.name}</Text>

                    <View style={styles.ratingRow}>
                      <View style={styles.ratingBox}>
                        <Text style={styles.ratingText}>
                          {res.rating}/5
                        </Text>
                      </View>

                      <Text style={styles.reviewText}>
                        ({res.reviews} reviews)
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.divider} />

                {res.items.map((item, i) => {
                  const key = `${res.name}-${item.name}`;
                  const qty = cart[key] || 0;

                  return (
                    <View key={i} style={styles.itemRow}>
                      <Text style={styles.itemName}>
                        {qty > 0 ? `${qty}x ` : ""} {item.name}
                      </Text>

                      <View style={styles.priceRow}>
                        <Text style={styles.price}>₹ {item.price}</Text>

                        {qty === 0 ? (
                          <TouchableOpacity
                            style={styles.addBtn}
                            onPress={() => addItem(key)}
                          >
                            <Text style={styles.plus}>+</Text>
                          </TouchableOpacity>
                        ) : (
                          <View style={styles.counter}>
                            <TouchableOpacity
                              onPress={() => removeItem(key)}
                            >
                              <Text style={styles.counterText}>-</Text>
                            </TouchableOpacity>

                            <Text style={styles.qty}>{qty}</Text>

                            <TouchableOpacity
                              onPress={() => addItem(key)}
                            >
                              <Text style={styles.counterText}>+</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          ))}
        </ScrollView>

        {getTotalItems() > 0 && (
          <View style={styles.cartBar}>
            <Text style={styles.cartText}>
              {getTotalItems()} Items added
            </Text>

            <TouchableOpacity onPress={handleViewCart}>
              <Text style={styles.viewCart}>View Cart &gt;</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Reorder;

const styles = StyleSheet.create({
  background: { flex: 1 },

  safe: {
    flex: 1,
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 20,
    color: "#ffffff",
    marginBottom: 15,
    fontFamily: "CrimsonText-Bold",
    textDecorationLine: "underline",
  },

  cardWrapper: { marginBottom: 18 },

  card: {
    borderRadius: 25,
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
  },

  heartBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 18,
  },

  verticalDivider: {
    width: 1,
    height: 60,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginHorizontal: 12,
  },

  resName: {
    fontSize: 20,
    color: "#5A2D0C",
    fontFamily: "CrimsonText-Bold",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  ratingBox: {
    backgroundColor: "#DF9A59",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },

  ratingText: {
    fontSize: 10,
    fontFamily: "CrimsonText-SemiBold",
  },

  reviewText: {
    marginLeft: 8,
    color: "#ffffff",
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginVertical: 12,
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  itemName: {
    color: "#fff",
    fontSize: 16,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  price: {
    color: "#fff",
    marginRight: 10,
  },

  addBtn: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  plus: { color: "#fff", fontSize: 18 },

  counter: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 6,
    borderRadius: 6,
  },

  counterText: {
    color: "#fff",
    fontSize: 18,
    paddingHorizontal: 6,
  },

  qty: {
    color: "#fff",
    paddingHorizontal: 4,
  },

  cartBar: {
    position: "absolute",
    bottom: 100,
    left: 16,
    right: 16,
    backgroundColor: "#1E8C6A",
    borderRadius: 25,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cartText: {
    color: "#fff",
    fontSize: 16,
  },

  viewCart: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
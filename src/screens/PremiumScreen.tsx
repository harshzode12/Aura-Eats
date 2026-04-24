import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

import CommonHeader from "../components/CommonHeader";

type Props = {
  selectedAddressType: "home" | "office";
  currentAddress: any;
  onPressLocation: () => void;
};

const PremiumScreen = ({
  selectedAddressType,
  currentAddress,
  onPressLocation,
}: Props) => {
  const [liked, setLiked] = useState<{ [key: number]: boolean }>({});
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // ✅ NEW

  const toggleLike = (index: number) => {
    setLiked((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const restaurants = [
    {
      name: "King’s Corner",
      desc: "Paneer Afghani, Dal Tadka, Jeera Rice, 2 Tawa Roti, Pickle & Raita.",
      image: require("../../assets/images/food1.jpg"),
    },
    {
      name: "Glorious Cloud Kitchen",
      desc: "Paneer Handi, Dal Makhani, Rice, 2 Butter Naan, Onion Salad.",
      image: require("../../assets/images/food2.jpg"),
    },
    {
      name: "The Privilege",
      desc: "Mix Veg sabzi, Basmati Rice & Dal, 2 Butter Roti, Gulab Jamun.",
      image: require("../../assets/images/food3.jpg"),
    },
    {
      name: "Lia’s Kitchen",
      desc: "Dum Aloo, Jeera Rice & Dal Fry, 2 Chapati, Curd.",
      image: require("../../assets/images/food4.jpg"),
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/bg.png")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 120 }}>
            
            {/* Header */}
            <CommonHeader
              selectedAddressType={selectedAddressType}
              currentAddress={currentAddress}
              onPressLocation={onPressLocation}
            />

            {/* Premium Card */}
            <View style={styles.card}>
              <BlurView
                style={[StyleSheet.absoluteFill, { zIndex: 0 }]}
                blurType="light"
                blurAmount={25}
                reducedTransparencyFallbackColor="rgba(255,255,255,0.9)"
              />

              <View style={{ zIndex: 1 }}>
                <Image
                  source={require("../../assets/images/auraeats.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />

                <View style={styles.row}>
                  <View>
                    <Text style={styles.label}>Days Left</Text>
                    <Text style={styles.value}>20</Text>
                  </View>

                  <View>
                    <Text style={styles.label}>Valid Till</Text>
                    <Text style={styles.value}>01 Jan</Text>
                  </View>

                  <View>
                    <Text style={styles.label}>Status</Text>
                    <Text style={styles.value}>Active</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.extendBtn}>
                  <Text style={{ color: "#000" }}>Extend +</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Section Title */}
            <Text style={styles.sectionTitle}>
              Choose Restaurant for Tomorrow
            </Text>

            {/* Restaurant Cards */}
            {restaurants.map((item, index) => (
              <View key={index} style={styles.restaurantCard}>
                <BlurView
                  style={[StyleSheet.absoluteFill, { zIndex: 0 }]}
                  blurType="light"
                  blurAmount={25}
                  reducedTransparencyFallbackColor="rgba(255,255,255,0.9)"
                />

                <View style={styles.restaurantContent}>
                  <Image source={item.image} style={styles.restaurantImage} />

                  <View style={styles.verticalLine} />

                  <View style={styles.textContainer}>
                    <Text style={styles.restaurantTitle}>{item.name}</Text>

                    <Text style={styles.restaurantDesc} numberOfLines={2}>
                      {item.desc}
                    </Text>

                    {/* ✅ UPDATED BUTTON */}
                    <TouchableOpacity
                      style={[
                        styles.selectBtn,
                        selectedIndex === index && styles.selectedBtn,
                      ]}
                      onPress={() => setSelectedIndex(index)}
                    >
                      <Text style={styles.selectText}>
                        {selectedIndex === index ? "Selected" : "Select"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Heart Icon */}
                <TouchableOpacity
                  style={styles.heartIcon}
                  onPress={() => toggleLike(index)}
                >
                  <Ionicons
                    name={liked[index] ? "heart" : "heart-outline"}
                    size={22}
                    color={liked[index] ? "#F26565" : "#ffffff"}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default PremiumScreen;

const styles = StyleSheet.create({
  card: {
    height: 160,
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "#1E5242",
    padding: 20,
    justifyContent: "center",
    marginBottom: 30,
  },

  logo: {
    width: 160,
    height: 60,
    marginBottom: 30,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    color: "#00432E",
    fontSize: 16,
    fontFamily: "CrimsonText-Regular",
  },

  value: {
    color: "#00432E",
    fontSize: 14,
    fontFamily: "CrimsonText-Bold",
    textAlign: "center",
  },

  extendBtn: {
    position: "absolute",
    right: 20,
    top: 20,
    borderWidth: 1.5,
    borderColor: "#09533D",
    backgroundColor: "#B0D7CB99",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  sectionTitle: {
    fontSize: 18,
    marginTop: -10,
    marginBottom: 20,
    color: "#ffffff",
    fontFamily: "CrimsonText-Bold",
    textDecorationLine: "underline",
  },

  restaurantCard: {
    height: 120,
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ffffff",
    marginBottom: 20,
    position: "relative",
    paddingHorizontal: 15,
    justifyContent: "center",
  },

  restaurantContent: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },

  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ffffff",
  },

  verticalLine: {
    width: 1.5,
    height: 80,
    backgroundColor: "rgba(255,255,255,0.6)",
    marginHorizontal: 15,
    borderRadius: 2,
  },

  textContainer: {
    flex: 1,
  },

  restaurantTitle: {
    color: "#492000",
    fontSize: 15,
    fontFamily: "CrimsonText-SemiBold",
    marginBottom: 6,
  },

  restaurantDesc: {
    color: "#EDEDED",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
    paddingRight: 25,
    fontFamily: "CrimsonText-Regular",
  },

  selectBtn: {
    backgroundColor: "#692D00",
    paddingVertical: 2,
    paddingHorizontal: 25,
    borderRadius: 3.5,
    alignSelf: "flex-start",
    borderWidth: 0.5,
    borderColor: "#ffffff",
  },

  selectedBtn: {
    backgroundColor: "#ffffff", // ✅ Selected color
    borderColor: "#ffffff",
  },

  selectText: {
    color: "#fff",
    fontSize: 10,
    fontFamily: "CrimsonText-Bold",
  },

  heartIcon: {
    position: "absolute",
    right: 18,
    top: 18,
    zIndex: 5,
    elevation: 10,
  },
});
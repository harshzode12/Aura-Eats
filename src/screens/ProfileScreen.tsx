import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CommonHeader from "../components/CommonHeader";
import GlassBottomTab, { TabKey } from "../components/GlassBottomTab";
import SuperetteLocation from "../components/SuperetteLocation";

const ProfileScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<TabKey>("home");

  const [locationModalVisible, setLocationModalVisible] = useState(false);

  const [selectedAddressType, setSelectedAddressType] =
    useState<"office" | "home">("office");

  const [addresses, setAddresses] = useState({
    home: { address: "" },
    office: { address: "2nd floor - 228, vip rd..." },
  });

  const currentAddress = addresses[selectedAddressType];

  const openLocation = () => {
    setLocationModalVisible(true);
  };

  const switchTab = (tab: TabKey) => {
    setActiveTab(tab);
    navigation.navigate("HomeScreen", { screen: tab });
  };

  const orders = [
    {
      id: 1,
      name: "Taj Hotel",
      rating: "4.8",
      reviews: "2914",
      items: [
        { name: "Panner Angara", price: 190 },
        { name: "Tawa Roti", price: 120 },
        { name: "Jeera rice & dal fry", price: 110 },
      ],
      image: require("../../assets/images/food1.jpg"),
    },
    {
      id: 2,
      name: "Social Blend",
      rating: "4.3",
      reviews: "1438",
      items: [
        { name: "Aglio Olio Pasta", price: 260 },
        { name: "Spaghetti", price: 190 },
      ],
      image: require("../../assets/images/pasta.jpg"),
    },
  ];

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />

      <ImageBackground
        source={require("../../assets/images/bg.png")}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 16 }}>
          
          {/* ✅ HEADER */}
          <CommonHeader
            selectedAddressType={selectedAddressType}
            currentAddress={currentAddress}
            onPressLocation={openLocation}
            onPressProfile={() => {}}
          />

          {/* 🔥 CONTENT */}
          <ScrollView showsVerticalScrollIndicator={false}>
            
            {/* PROFILE */}
            <View style={styles.profileSection}>
              <Image
                source={require("../../assets/images/profile.png")}
                style={styles.avatar}
              />

              <Text style={styles.name}>Harsh Zode</Text>
              <Text style={styles.info}>9913092341</Text>
              <Text style={styles.info}>hpzode@gmail.com</Text>
            </View>

            {/* ORDERS */}
            <Text style={styles.heading}>Past Orders</Text>

            {orders.map((order) => (
              <View key={order.id} style={styles.card}>
                
                <View style={styles.row}>
                  <Image source={order.image} style={styles.foodImage} />

                  <View style={{ flex: 1 }}>
                    <Text style={styles.hotelName}>{order.name}</Text>
                    <Text style={styles.rating}>
                      {order.rating}/5 ({order.reviews} reviews)
                    </Text>
                  </View>

                  <Text style={styles.heart}>❤️</Text>
                </View>

                <View style={styles.divider} />

                {order.items.map((item, index) => (
                  <View key={index} style={styles.itemRow}>
                    <Text style={styles.itemText}>
                      1x {item.name}
                    </Text>

                    <View style={styles.priceRow}>
                      <Text style={styles.price}>₹ {item.price}</Text>

                      <TouchableOpacity style={styles.addBtn}>
                        <Text style={{ color: "#fff" }}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            ))}

          </ScrollView>

          {/* 🔻 BOTTOM TAB */}
          <GlassBottomTab active={activeTab} onChange={switchTab} />

        </SafeAreaView>

        {/* 📍 LOCATION MODAL */}
        <SuperetteLocation
          visible={locationModalVisible}
          onClose={() => setLocationModalVisible(false)}
          selectedAddressType={selectedAddressType}
          setSelectedAddressType={setSelectedAddressType}
          addresses={addresses}
          setAddresses={setAddresses}
        />
      </ImageBackground>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
    marginBottom: 10,
  },

  name: {
    fontSize: 26,
    color: "#fff",
    fontFamily: "CrimsonText-Bold",
  },

  info: {
    color: "#eee",
    marginTop: 4,
  },

  heading: {
    fontSize: 18,
    color: "#fff",
    marginVertical: 10,
    textDecorationLine: "underline",
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 24,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  foodImage: {
    width: 70,
    height: 70,
    borderRadius: 16,
    marginRight: 10,
  },

  hotelName: {
    fontSize: 18,
    color: "#fff",
  },

  rating: {
    color: "#ddd",
    marginTop: 4,
  },

  heart: {
    fontSize: 20,
  },

  divider: {
    height: 1,
    backgroundColor: "#aaa",
    marginVertical: 10,
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },

  itemText: {
    color: "#fff",
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
    backgroundColor: "#5fa89b",
    width: 26,
    height: 26,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
});
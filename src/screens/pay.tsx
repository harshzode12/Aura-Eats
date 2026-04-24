import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

import CommonHeader from "../components/CommonHeader";
import GlassBottomTab, { TabKey } from "../components/GlassBottomTab";
import Ionicons from "react-native-vector-icons/Ionicons";

import Video from "react-native-video";

type Props = NativeStackScreenProps<RootStackParamList, "Pay">;

const Pay = ({ route, navigation }: Props) => {
  const [cart, setCart] = useState(route.params.cartItems || []);
  const [activeTab, setActiveTab] = useState<TabKey>("cart");

  // 🎬 VIDEO STATE
  const [showVideo, setShowVideo] = useState(false);

  /* TAB NAVIGATION */
  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    navigation.navigate("Home", {
      screen: tab,
    });
  };

  /* INCREASE */
  const increaseQty = (id: string) => {
    setCart((prev: any[]) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  /* DECREASE */
  const decreaseQty = (id: string) => {
    setCart((prev: any[]) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  /* TOTAL */
  const itemsTotal = useMemo(() => {
    return cart.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );
  }, [cart]);

  const deliveryFee = cart.length > 0 ? 20 : 0;
  const gst = cart.length > 0 ? 30 : 0;
  const grandTotal = itemsTotal + deliveryFee + gst;

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>

        <View style={{ flex: 1, paddingHorizontal: 16 }}>

          {/* HEADER */}
          <CommonHeader
            selectedAddressType="office"
            currentAddress={{ address: "2nd floor - 228 vip road..." }}
            onPressLocation={() => {}}
          />

          <Text style={styles.title}>Orders</Text>

          {/* EMPTY CART */}
          {cart.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Your cart is empty 😢</Text>

              <TouchableOpacity
                style={styles.goBackBtn}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.goBackText}>Browse Food</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>

              {cart.map((item: any) => (
                <View key={item.id} style={styles.card}>

                  <Image source={item.image} style={styles.image} />

                  <View style={styles.verticalDivider} />

                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>₹ {item.price}</Text>

                    <View style={styles.qtyContainer}>
                      <TouchableOpacity onPress={() => decreaseQty(item.id)}>
                        <Text style={styles.qtyBtn}>-</Text>
                      </TouchableOpacity>

                      <Text style={styles.qtyText}>
                        {item.quantity}
                      </Text>

                      <TouchableOpacity onPress={() => increaseQty(item.id)}>
                        <Text style={styles.qtyBtn}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}

              {/* COOKING REQUEST */}
              <View style={styles.cookingBox}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="restaurant-outline" size={20} color="#fff" />
                  <Text style={styles.cookingTitle}> Cooking Request</Text>
                </View>

                <TextInput
                  placeholder="Type cooking requests..."
                  placeholderTextColor="#ddd"
                  style={styles.input}
                />
              </View>

              {/* BILL */}
              <View style={styles.billBox}>
                <Text style={styles.billTitle}>To Pay</Text>

                <View style={styles.row}>
                  <Text style={styles.text}>Items Total</Text>
                  <Text style={styles.text}>₹ {itemsTotal}</Text>
                </View>

                <View style={styles.dotted} />

                <View style={styles.row}>
                  <Text style={styles.text}>Delivery Fee</Text>
                  <Text style={styles.text}>₹ {deliveryFee}</Text>
                </View>

                <View style={styles.dotted} />

                <View style={styles.row}>
                  <Text style={styles.text}>GST & Charges</Text>
                  <Text style={styles.text}>₹ {gst}</Text>
                </View>

                <View style={styles.dotted} />

                <View style={styles.row}>
                  <Text style={styles.grand}>Grand Total</Text>
                  <Text style={styles.grand}>₹ {grandTotal}</Text>
                </View>

                {/* PAY BUTTON */}
                <TouchableOpacity
                  style={styles.payBtn}
                  onPress={() => setShowVideo(true)}
                >
                  <Text style={styles.payText}>Pay</Text>
                </TouchableOpacity>
              </View>

            </ScrollView>
          )}
        </View>

        {/* 🎬 FULL SCREEN VIDEO OVERLAY */}
        {showVideo && (
          <Video
            source={require("../../assets/videos/paymentvideos.mp4")}
            style={[StyleSheet.absoluteFill, { zIndex: 10 }]}
            resizeMode="cover"
            repeat={false}
            onEnd={() => {
              setShowVideo(false);

              // 🔥 NAVIGATE TO ORDER TRACKING
              setTimeout(() => {
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: "OrderTracking",
                    },
                  ],
                });
              }, 300);
            }}
          />
        )}

        {/* BOTTOM TAB */}
        <View style={styles.tabWrapper}>
          <GlassBottomTab active={activeTab} onChange={handleTabChange} />
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
};

export default Pay;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    color: "#fff",
    marginVertical: 10,
    textDecorationLine: "underline",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 25,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },

  image: {
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

  name: {
    color: "#5A2D0C",
    fontSize: 18,
    fontWeight: "bold",
  },

  price: {
    color: "#fff",
    marginVertical: 4,
  },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7a3e0b",
    borderRadius: 10,
    width: 90,
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  qtyBtn: {
    color: "#fff",
    fontSize: 18,
  },

  qtyText: {
    color: "#fff",
  },

  cookingBox: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 15,
    borderRadius: 20,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },

  cookingTitle: {
    color: "#fff",
    fontSize: 16,
  },

  input: {
    marginTop: 10,
    color: "#fff",
  },

  billBox: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },

  billTitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },

  text: {
    color: "#fff",
  },

  dotted: {
    borderStyle: "dashed",
    borderWidth: 0.5,
    borderColor: "#fff",
    marginVertical: 6,
  },

  grand: {
    fontWeight: "bold",
    color: "#fff",
  },

  payBtn: {
    marginTop: 15,
    backgroundColor: "#1E8C6A",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },

  payText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  tabWrapper: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
  },

  goBackBtn: {
    backgroundColor: "#1E8C6A",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },

  goBackText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
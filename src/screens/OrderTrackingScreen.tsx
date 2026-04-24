import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CommonHeader from "../components/CommonHeader";
import GlassBottomTab, { TabKey } from "../components/GlassBottomTab";

const TIMELINE_COLOR = "#012e1f";
const TIMELINE_LIGHT = "rgba(135, 133, 133, 0.66)";

const OrderTrackingScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<TabKey>("home");

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    navigation.navigate("Home", {
      screen: tab,
    });
  };

  const steps = [
    {
      title: "Order Preparing",
      time: "10:38",
      icon: require("../../assets/images/order_preparing.png"),
    },
    {
      title: "Order Prepared",
      time: "10:50",
      icon: require("../../assets/images/order_prepared.png"),
    },
    {
      title: "On the way",
      time: "10:55",
      icon: require("../../assets/images/on_the_way.png"),
    },
    {
      title: "Delivered",
      time: "11:15",
      icon: require("../../assets/images/delivered.png"),
    },
  ];

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

          {/* TEXT */}
          <Text style={styles.track}>Track Order</Text>
          <Text style={styles.date}>Wed, 18 March</Text>
          <Text style={styles.orderId}>Order ID: ORD-A71290</Text>

          <Text style={styles.eta}>ETA: 15 Min</Text>

          {/* TIMELINE */}
          <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
            <View style={styles.timelineContainer}>
              
              <View style={styles.verticalLine} />
              <View style={styles.verticalLineGlow} />

              {steps.map((step, index) => (
                <View key={index} style={styles.stepWrapper}>
                  
                  <View style={styles.dotWrapper}>
                    <View
                      style={[
                        styles.dot,
                        index === steps.length - 1 && styles.lastDot,
                      ]}
                    />
                  </View>

                  <View style={styles.content}>
                    <Image source={step.icon} style={styles.iconImage} />

                    <View style={{ flex: 1 }}>
                      <Text style={styles.title}>{step.title}</Text>
                      <Text style={styles.sub}>
                        Order ID: ORD-A71290
                      </Text>
                    </View>

                    <Text style={styles.time}>{step.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* DELIVERY BOX */}
          <View style={styles.deliveryBox}>
            <View style={styles.deliveryRow}>
              
              <Image
                source={require("../../assets/images/location.png")}
                style={styles.locationIcon}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.deliveryTitle}>Delivery Address</Text>
                <Text style={styles.deliveryText}>Office</Text>
                <Text style={styles.deliverySub}>
                  2nd floor - 228 vip rd, Vesu, Surat.
                </Text>
              </View>

            </View>
          </View>

        </View>

        <GlassBottomTab active={activeTab} onChange={handleTabChange} />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default OrderTrackingScreen;

const styles = StyleSheet.create({
  track: {
    fontSize: 22,
    color: "#fff",
    textDecorationLine: "underline",
    marginTop: 10,
    fontFamily: "CrimsonText-Bold",
  },

  date: {
    color: "#fff",
    marginTop: 5,
    fontFamily: "CrimsonText-Regular",
  },

  orderId: {
    color: "#fff",
    marginBottom: 15,
    fontFamily: "CrimsonText-Regular",
  },

  eta: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 20,
    fontFamily: "CrimsonText-Bold",
  },

  timelineContainer: {
    position: "relative",
    paddingLeft: 40,
    marginTop: 10,
  },

  verticalLine: {
    position: "absolute",
    left: 20,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: TIMELINE_COLOR,
    borderRadius: 2,
  },

  verticalLineGlow: {
    position: "absolute",
    left: 21,
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: TIMELINE_LIGHT,
  },

  stepWrapper: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 90,
  },

  dotWrapper: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: TIMELINE_COLOR,
    borderWidth: 2,
    borderColor: TIMELINE_COLOR,
    marginRight: 78,
  },

  lastDot: {
    backgroundColor: "#fff",
    borderColor: "#fff",
  },

  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  iconImage: {
    width: 28,
    height: 28,
    marginRight: 16,
    marginLeft: -30,
    resizeMode: "contain",
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "CrimsonText-Bold",
  },

  sub: {
    color: "#ddd",
    fontSize: 12,
    fontFamily: "CrimsonText-Regular",
  },

  time: {
    color: "#fff",
    fontFamily: "CrimsonText-Regular",
  },

  deliveryBox: {
    marginBottom: 120,
    padding: 15,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },

  deliveryRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationIcon: {
    width: 28,
    height: 28,
    marginRight: 10,
    marginBottom: 35,
    tintColor: "#fff",
  },

  deliveryTitle: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "CrimsonText-Bold",
  },

  deliveryText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "CrimsonText-Regular",
  },

  deliverySub: {
    color: "#ffffff",
    fontSize: 14,
    fontFamily: "CrimsonText-Regular",
  },
});
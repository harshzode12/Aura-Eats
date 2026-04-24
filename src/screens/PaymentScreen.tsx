import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Video from "react-native-video";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Payment">;

const PaymentScreen = ({ route, navigation }: Props) => {
  const {
    amount,
    selectedAddressType,
    currentAddress,
  } = route.params;

  const [selectedMethod, setSelectedMethod] = useState("card");
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>

        {/* ✅ NORMAL UI ALWAYS RENDERED */}
        <ScrollView contentContainerStyle={styles.container}>

          <Text style={styles.title}>Complete Payment</Text>

          <View style={styles.amountCard}>
            <Text style={styles.amountLabel}>Total Payable</Text>
            <Text style={styles.amount}>₹ {amount}</Text>
          </View>

          <View style={styles.card}>

            <TouchableOpacity
              style={styles.row}
              onPress={() => setSelectedMethod("card")}
            >
              <View style={styles.radio}>
                {selectedMethod === "card" && <View style={styles.radioFill} />}
              </View>
              <Text style={styles.optionText}>Debit / Credit Card</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.row}
              onPress={() => setSelectedMethod("upi")}
            >
              <View style={styles.radio}>
                {selectedMethod === "upi" && <View style={styles.radioFill} />}
              </View>
              <Text style={styles.optionText}>UPI Payment</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.row}
              onPress={() => setSelectedMethod("gpay")}
            >
              <View style={styles.radio}>
                {selectedMethod === "gpay" && <View style={styles.radioFill} />}
              </View>
              <Text style={styles.optionText}>Google Pay</Text>
            </TouchableOpacity>

          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setPlayVideo(true)}
          >
            <Text style={styles.buttonText}>Pay ₹ {amount}</Text>
          </TouchableOpacity>

        </ScrollView>

        {/* ✅ VIDEO OVERLAY (FIXES GREEN SCREEN) */}
        {playVideo && (
          <Video
            source={require("../../assets/videos/paymentvideos.mp4")}
            style={[StyleSheet.absoluteFill, { zIndex: 10 }]}
            resizeMode="cover"
            repeat={false}
            onEnd={() => {
              setPlayVideo(false);

              setTimeout(() => {
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: "Home",
                      params: {
                        screen: "premium",
                        selectedAddressType,
                        currentAddress,
                      },
                    },
                  ],
                });
              }, 300);
            }}
          />
        )}

      </SafeAreaView>
    </ImageBackground>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },

  title: {
    fontSize: 26,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "CrimsonText-Bold",
    textDecorationLine: "underline",
  },

  amountCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  amountLabel: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },

  amount: {
    color: "#fff",
    fontSize: 32,
    fontFamily: "CrimsonText-Bold",
  },

  card: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    overflow: "hidden",
    marginBottom: 30,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#fff",
    marginRight: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  radioFill: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },

  optionText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "CrimsonText-Regular",
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.4)",
  },

  button: {
    backgroundColor: "#6A2F00",
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "CrimsonText-Bold",
  },
});
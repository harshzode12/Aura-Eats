import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

type Props = {
  selectedAddressType: "office" | "home";
  currentAddress: any;
  onPressLocation: () => void;
  onPressProfile?: () => void;
};

const CommonHeader = ({
  selectedAddressType,
  currentAddress,
  onPressLocation,
  onPressProfile, // ✅ FIXED
}: Props) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.locationRow} onPress={onPressLocation}>
        <Image
          source={require("../../assets/images/location.png")}
          style={styles.locationIcon}
        />

        <View>
          <Text style={styles.location}>
            {selectedAddressType === "home" ? "HOME" : "OFFICE"}
          </Text>

          <Text style={styles.subLocation} numberOfLines={1}>
            {currentAddress?.address || "Add address"}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressProfile}>
        <Image
          source={require("../../assets/images/profile.png")}
          style={styles.profileIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent", // 🔥 IMPORTANT
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -20,
    marginBottom: 20,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "75%",
  },

  locationIcon: {
    width: 40,
    height: 40,
    marginRight: 8,
    resizeMode: "contain",
  },

  location: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },

  subLocation: {
    fontSize: 14,
    color: "#ffffff",
    marginTop: 2,
  },

  profileIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});
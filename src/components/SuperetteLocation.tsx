import React, { useState, useRef } from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from "react-native";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import { BlurView } from "@react-native-community/blur";

const GOOGLE_API_KEY = "AIzaSyBHc6KbyXpgX28SiEEppu_Bt-7L-Ib0X78";

const SuperetteLocation = ({
  visible,
  onClose,
  selectedAddressType,
  setSelectedAddressType,
  addresses,
  setAddresses,
}: any) => {
  const mapRef = useRef<MapView>(null);

  const [address, setAddress] = useState(
    addresses[selectedAddressType]?.address || ""
  );

    useEffect(() => {
    setAddress(addresses[selectedAddressType]?.address || "");
  }, [selectedAddressType, visible]);
  
  const [region, setRegion] = useState({
    latitude: 21.1702,
    longitude: 72.8311,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

const reverseGeocode = async (lat: number, lng: number) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
    );

    const data = await response.json();

    console.log("GEOCODE RESULT:", data);

    if (data.status === "OK") {
      const formatted = data.results[0].formatted_address;
      setAddress(formatted);
    }
  } catch (error) {
    console.log("Reverse Geocode Error:", error);
  }
};

const getCurrentLocation = async () => {

  if (Platform.OS === "android") {

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Location permission denied");
      return;
    }
  } else {
    Geolocation.requestAuthorization("whenInUse");
  }

  Geolocation.getCurrentPosition(
    async (position) => {

      const { latitude, longitude } = position.coords;

      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setRegion(newRegion);

      mapRef.current?.animateToRegion(newRegion, 1000);

      await reverseGeocode(latitude, longitude);

    },
    (error) => {
      console.log("LOCATION ERROR:", error);
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
    }
  );
};

  const handleSave = () => {
    setAddresses({
      ...addresses,
      [selectedAddressType]: { address },
    });

    onClose();
  };

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.modalOverlay}>

        <View style={styles.modalContainer}>
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={30}
          />

          <ScrollView>

            <Text style={styles.modalTitle}>Add Address</Text>

            <View style={styles.typeRow}>

              <TouchableOpacity
                style={[
                  styles.typeButton,
                  selectedAddressType === "home" && styles.activeType,
                ]}
                onPress={() => setSelectedAddressType("home")}
              >
                <Text>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.typeButton,
                  selectedAddressType === "office" && styles.activeType,
                ]}
                onPress={() => setSelectedAddressType("office")}
              >
                <Text>Office</Text>
              </TouchableOpacity>

            </View>

            <TouchableOpacity
              style={styles.locationButton}
              onPress={getCurrentLocation}
            >
              <Text style={{ color: "#fff" }}>
                📍 Use My Current Location
              </Text>
            </TouchableOpacity>

            <View style={styles.mapWrapper}>
              <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
              >
                <Marker coordinate={region} draggable />
              </MapView>
            </View>

            <TextInput
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
              style={styles.input}
            />

            <View style={styles.buttonRow}>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
              >
                <Text style={{ color: "#fff" }}>Save</Text>
              </TouchableOpacity>

            </View>

          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default SuperetteLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent", // 🔥 IMPORTANT
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  modalContainer: {
    width: "92%",
    borderRadius: 24,
    padding: 20,
    overflow: "hidden",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "CrimsonText-Bold",
  },

  typeRow: {
    flexDirection: "row",
    marginBottom: 10,
  },

  typeButton: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    marginHorizontal: 4,
  },

  activeType: {
    backgroundColor: "#DF9A59",
  },

  locationButton: {
    backgroundColor: "#DF9A59",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  mapWrapper: {
    height: 200,
    marginTop: 15,
    borderRadius: 18,
    overflow: "hidden",
  },

  map: {
    flex: 1,
  },

  input: {
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginTop: 12,
    fontFamily:"CrimsonText-Regular"
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 15,
  },

  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#ccc",
    marginRight: 6,
    alignItems: "center",
  },

  saveButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#DF9A59",
    marginLeft: 6,
    alignItems: "center",
  },
});
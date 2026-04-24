import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  StatusBar,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GlassBottomTab, { TabKey } from "../components/GlassBottomTab";
import PremiumScreen from "./PremiumScreen";
import Reorder from "./Reorder";
import Plan from "./Plan";
import HotelMenu from "./hotelmenu";
import SuperetteLocation from "../components/SuperetteLocation";
import HomeContent from "./HomeContent";
import YourMindScreen from "./YourMindScreen";

// ✅ EXPORT THIS (important)
export type ScreenProps = {
  selectedAddressType: "office" | "home";
  currentAddress: { address: string };
  onPressLocation: () => void;
  navigation: any;
  route: any;
};

const HomeScreen = ({ route, navigation }: any) => {
  const initialTab: TabKey = route?.params?.screen || "home";

  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  const [locationModalVisible, setLocationModalVisible] = useState(false);

  const [selectedAddressType, setSelectedAddressType] =
    useState<"office" | "home">(
      route?.params?.selectedAddressType || "home"
    );

  const [addresses, setAddresses] = useState({
    home: {
      address: route?.params?.currentAddress?.address || "",
    },
    office: { address: "" },
  });

  const currentAddress = addresses[selectedAddressType];

  useEffect(() => {
    if (route?.params?.screen) {
      switchTab(route.params.screen);
    }
  }, [route?.params?.screen]);

  const openLocation = () => {
    setLocationModalVisible(true);
  };

  // 🔥 Smooth animation
  const switchTab = (tab: TabKey) => {
    if (tab === activeTab) return;

    const direction = tab > activeTab ? 1 : -1;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 120,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: -40 * direction,
        duration: 120,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setActiveTab(tab);

      translateX.setValue(40 * direction);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 220,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.spring(translateX, {
          toValue: 0,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

// ✅ Pass common props
const props: ScreenProps = {
  selectedAddressType,
  currentAddress,
  onPressLocation: openLocation,
  navigation,
  route,
};

const renderScreen = () => {
  switch (activeTab) {
    case "home":
      return <HomeContent {...props} setActiveTab={switchTab} navigation={navigation} />;

    case "yourmind":
      return <YourMindScreen {...props} />;

    case "premium":
      return <PremiumScreen {...props} />;

    case "cart":
      return <Reorder {...props} />;

    case "plan":
      return <Plan {...props} />;

    case "hotelmenu":
      return <HotelMenu {...props} />;

    default:
      return null;
  }
};

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <ImageBackground
        source={require("../../assets/images/bg.png")}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          
          {/* 🔥 Animated Screen */}
          <Animated.View
            style={{
              flex: 1,
              opacity: fadeAnim,
              transform: [{ translateX }],
            }}
          >
            {renderScreen()}
          </Animated.View>

          {/* 🔻 Bottom Tab */}
          <GlassBottomTab active={activeTab} onChange={switchTab} />
        </SafeAreaView>

        {/* 📍 Location Modal */}
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

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "transparent",
},
  background: { flex: 1 },

  safeArea: {
    flex: 1,
    justifyContent: "space-between",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },

  locationRow: {
    
    flexDirection: "row",
    alignItems: "center",
  },

  locationIcon: {
    width: 40,
    height: 40,
    marginRight: 8,
    resizeMode: "contain",
  },

  location: {
    fontSize: 20,
    color: "#ffffff",
    fontFamily: "CrimsonText-Bold",
  },

  subLocation: {
    fontSize: 16,
    color: "#ffffff",
    marginTop: 2,
    fontFamily: "CrimsonText-Regular",
  },

  profileIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },

  searchWrapper: {
    marginTop: 22,
    width: "100%",
  },

  searchContainer: {
    height: 55,
    marginTop: -20,
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.9)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },

  searchContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    flex: 1,
  },

  searchIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
    resizeMode: "contain",
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    padding: 0,
    fontFamily: "CrimsonText-Regular",
  },

  sectionTitle: {
    fontSize: 20,
    marginTop: 28,
    marginBottom: 14,
    color: "#ffffff",
    textDecorationLine: "underline",
    fontFamily: "CrimsonText-Bold",
  },

    favoriteCard: {
    width: 114,
    height: 114,
    borderRadius: 28,
    marginRight: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ffffff",
  },

  favoriteImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  favoriteOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "45%",
    backgroundColor: "rgba(21, 21, 21, 0.51)",
  },

  heartContainer: {
    position: "absolute",
    top: 10,
    right: 16,
  },

  heartIcon: {
    fontSize: 16,
  },

  favoriteTextContainer: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 16,
  },

  favoriteTitle: {
    fontSize: 12,
    marginLeft: -2,
    color: "#fff0e8",
    fontFamily: "CrimsonText-Bold",
  },

  favoriteBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  smallRatingBadge: {
  flexDirection: "row",
  alignItems: "center",
  marginLeft: -4,
  backgroundColor: "#DF9A59",
  paddingHorizontal: 2,
  paddingVertical: 2,

  borderTopLeftRadius: 6,
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
  borderTopRightRadius: 0,
  },

  smallRatingText: {
    fontSize: 8,
    color: "#6A3914",
    fontFamily: "CrimsonText-Bold",
  },

  smallSlash: {
    fontSize: 5,
    color: "#6A3914",
    marginLeft: 2,
    marginTop: 2,
    fontFamily: "CrimsonText-SemiBold",
  },

  favoriteReviewText: {
    marginLeft: 4,
    fontSize: 9,
    color: "#fff",
    fontFamily: "CrimsonText-Regular",
  },

  circleWrapper: {
    width: 114,
    height: 114,
    borderRadius: 57,
    marginRight: 14,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.9)",
  },

  circleImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  circleOverlay: {
    position: "absolute",
    bottom: -10,
    width: "100%",
    height: "45%",
    backgroundColor: "rgba(60, 60, 60, 0.24)",
  },

  circleText: {
    position: "absolute",
    bottom: 14,
    alignSelf: "center",
    fontSize: 16,
    color: "#ffffff",
    fontFamily: "CrimsonText-Bold",
  },

  topPickWrapper: {
    marginTop: 10,
    width: "100%",
  },

  topPickCard: {
    height: 100,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.9)",
  },

  topPickContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    flex: 1,
  },

  topPickImage: {
    width: 72,
    height: 72,
    borderRadius: 18,
    marginRight: 14,
  },

  hotelName: {
    fontSize: 17,
    color: "#6A3914",
    fontFamily: "CrimsonText-Bold",
  },

  /* ⭐ RATING BADGE */
ratingBadge: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#DF9A59",
  paddingHorizontal: 12,
  paddingVertical: 6,

  borderTopLeftRadius: 15,
  borderBottomLeftRadius: 15,
  borderBottomRightRadius: 15,
  borderTopRightRadius: 0,   // 👈 make this sharp

  alignSelf: "flex-start",
  marginTop: 6,
},

  ratingNumber: {
    fontSize: 18,
    color: "#6A3914",
    fontFamily: "CrimsonText-Bold",
  },

  ratingOutOf: {
    fontSize: 14,
    color: "#6A3914",
    marginLeft: 3,
    fontFamily: "CrimsonText-SemiBold",
  },

  ratingRow: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 6,
},

  reviewText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#6A3914",
    fontFamily: "CrimsonText-Regular",
  },

/* ================= MODAL ================= */

modalOverlay: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.4)",
},

modalContainer: {
  width: "90%",
  borderRadius: 24,
  padding: 20,
  overflow: "hidden",
  borderWidth: 1.5,
  borderColor: "rgba(255,255,255,0.8)",
},

  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    color: "#000",
    textAlign: "center",
    fontFamily: "CrimsonText-Bold",
  },

addressTypeRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 15,
},

addressTypeButton: {
  flex: 1,
  padding: 10,
  borderRadius: 12,
  alignItems: "center",
  marginHorizontal: 5,
  borderWidth: 1,
  borderColor: "#ccc",
},

activeAddressType: {
  backgroundColor: "#DF9A59",
  borderColor: "#DF9A59",
},

  addressTypeText: {
    color: "#000",
    fontFamily: "CrimsonText-SemiBold",
  },

  modalInput: {
    height: 45,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontFamily: "CrimsonText-Regular",
  },

modalButtonRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 10,
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

  cancelText: {
    fontFamily: "CrimsonText-SemiBold",
  },

  saveText: {
    color: "#fff",
    fontFamily: "CrimsonText-SemiBold",
  },

topPickHeart: {
  position: "absolute",
  top: 14,
  right: 18,
  zIndex: 10,
},

topPickHeartIcon: {
  fontSize: 22,
  color: "#ffffff",
},

premiumCard: {
  marginTop: -20,
  marginBottom: -40,
  marginHorizontal: -20,
  width: "100%",
  alignItems: "center",
},

premiumImage: {
  width: "110%",
  height: 240,
  justifyContent: "center",
  alignItems: "center",
},

premiumContent: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},

subscribeButton: {
  width: 120,
  height: 30,
  borderRadius: 40,
  borderWidth: 1,
  borderColor: "#E8E8E8",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 90,
  marginLeft: 35,
},

subscribeText: {
  fontSize: 16,
  color: "#E8E8E8",
  fontFamily: "CrimsonText-Regular",
  letterSpacing: 1,
},
});
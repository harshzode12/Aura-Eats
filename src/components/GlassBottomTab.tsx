import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { BlurView } from "@react-native-community/blur";

export type TabKey = "home" | "premium" | "cart" | "plan" | "hotelmenu" | "yourmind";;

type Props = {
  active: TabKey;
  onChange: (key: TabKey) => void;
};

const tabs: { key: TabKey; icon: any }[] = [
  { key: "premium", icon: require("../../assets/images/premium.png") },
  { key: "home", icon: require("../../assets/images/home.png") },
  { key: "cart", icon: require("../../assets/images/cart.png") },
];

const GlassBottomTab = ({ active, onChange }: Props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        
        {/* 🔥 Smooth Blur */}
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={25}
          reducedTransparencyFallbackColor="rgba(255,255,255,0.9)"
        />

        <View style={styles.row}>
          {tabs.map((tab) => {
            const isActive = active === tab.key;

            const scaleAnim = useRef(new Animated.Value(1)).current;

            const handlePress = () => {
              Animated.sequence([
                Animated.timing(scaleAnim, {
                  toValue: 0.85,
                  duration: 80,
                  useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                  toValue: 1,
                  friction: 4,
                  useNativeDriver: true,
                }),
              ]).start();

              onChange(tab.key);
            };

            return (
              <TouchableOpacity
                key={tab.key}
                activeOpacity={0.8}
                onPress={handlePress}
                style={styles.tabButton}
              >
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                  {isActive ? (
                    <View style={styles.activeCircle}>
                      <Image source={tab.icon} style={styles.activeIcon} />
                    </View>
                  ) : (
                    <Image source={tab.icon} style={styles.icon} />
                  )}
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default GlassBottomTab;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },

  container: {
    width: "92%",
    height: 75,
    borderRadius: 40,
    overflow: "hidden",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },

  row: {
    flexDirection: "row",
    flex: 1,
  },

  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  activeCircle: {
    width: 85,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#B9B9B966",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
  },

  icon: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    opacity: 0.8,
  },

  activeIcon: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
});
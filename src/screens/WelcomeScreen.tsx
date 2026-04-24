import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Animated,
} from "react-native";
import GoSlider from "../components/GoSlider";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation<any>();
  const progress = useRef(new Animated.Value(0)).current;

  const screenOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.6],
    extrapolate: "clamp",
  });

  const textOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.3],
    extrapolate: "clamp",
  });

  return (
    <ImageBackground
      source={require("../../assets/images/welcome-bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* DARK OVERLAY */}
      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: "#000", opacity: screenOpacity },
        ]}
      />

      {/* CONTENT */}
      <View style={styles.centerWrapper}>
        <View style={styles.card}>
          <Animated.Text style={[styles.title, { opacity: textOpacity }]}>
            Something new every day
          </Animated.Text>

          <Animated.Text style={[styles.text, { opacity: textOpacity }]}>
            Choose a different kitchen daily or order food anytime you want.
          </Animated.Text>

          <Animated.Text style={[styles.text, { opacity: textOpacity }]}>
            Enjoy fresh variety without changing your routine.
          </Animated.Text>

          <Animated.Text style={[styles.text, { opacity: textOpacity }]}>
            No cooking, no boredom, no compromises.
          </Animated.Text>

          <Animated.Text style={[styles.text, { opacity: textOpacity }]}>
            Just fresh meals delivered to you.
          </Animated.Text>
        </View>
      </View>

      {/* SLIDER */}
      <View style={styles.sliderWrapper}>
        <GoSlider
          onComplete={() => {
            progress.setValue(0); // 🔥 RESET animation
            navigation.replace("Home");
          }}
          onProgress={progress}
        />
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent", // 🔥 IMPORTANT
  },
  background: {
    flex: 1,
    paddingHorizontal: 20,
  },
  centerWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 22,
    paddingVertical: 26,
    paddingHorizontal: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 14,
  },
  text: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 8,
    fontFamily: "CrimsonText-Regular",
  },
  sliderWrapper: {
    alignItems: "center",
    marginBottom: 40,
  },
});
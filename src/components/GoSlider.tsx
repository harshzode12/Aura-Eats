import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";

const WIDTH = Dimensions.get("window").width - 60;
const HEIGHT = 90;
const KNOB = 80;
const MAX = WIDTH - KNOB - 6;

type GoSliderProps = {
  onComplete: () => void;
  onProgress: Animated.Value;
};

const GoSlider = ({ onComplete, onProgress }: GoSliderProps) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (_, g) => {
        if (g.dx >= 0 && g.dx <= MAX) {
          translateX.setValue(g.dx);
          onProgress.setValue(g.dx / MAX); // 🔥 drive screen + text
        }
      },

      onPanResponderRelease: (_, g) => {
        if (g.dx > MAX * 0.85) {
          Animated.timing(translateX, {
            toValue: MAX,
            duration: 200,
            useNativeDriver: true,
          }).start(onComplete);
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();

          Animated.timing(onProgress, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.wrapper}>
      <View style={styles.track} />

      <View style={styles.centerText}>
        <Text style={styles.hintText}>Slide to continue</Text>
      </View>

      <Animated.View
        style={[styles.knob, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.knobText}>Go</Text>
      </Animated.View>
    </View>
  );
};

export default GoSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent", // 🔥 IMPORTANT
  },
  wrapper: {
    width: WIDTH,
    height: HEIGHT,
    justifyContent: "center",
  },

  track: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: HEIGHT / 2,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },

  centerText: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  hintText: {
    color: "#fff",
    fontSize: 20,
    opacity: 0.9,
  },

  knob: {
    position: "absolute",
    left: 6,
    width: KNOB,
    height: KNOB,
    borderRadius: KNOB / 2,
    backgroundColor: "#0E7C5B",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  knobText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});

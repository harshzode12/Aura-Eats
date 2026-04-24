import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Video from "react-native-video";
import { useNavigation } from "@react-navigation/native";

const VideoSplashScreen = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Welcome");
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Video
        source={require("../../assets/videos/splash_screen.mp4")}
        style={styles.video}
        resizeMode="cover"
        repeat={false}
        muted={false}
        controls={false}
        onEnd={() => navigation.replace("Welcome")}
        onError={() => navigation.replace("Welcome")}
      />
    </View>
  );
};

export default VideoSplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent", // 🔥 IMPORTANT
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
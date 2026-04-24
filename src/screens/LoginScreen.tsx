import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image source={require("../../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
      <Image source={require("../../assets/images/auraeats.png")} style={styles.brandText} resizeMode="contain" />

      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <TextInput placeholder="Name" placeholderTextColor="#0F4F3A" style={styles.input} value={name} onChangeText={setName} />
        <TextInput placeholder="Password" placeholderTextColor="#0F4F3A" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Payment", { amount: 15999 })}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#003F2C",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 140,
    height: 140,
    marginBottom: -20,
  },

  brandText: {
    width: 260,
    height: 90,
    marginBottom: 20,
  },

  card: {
    width: "85%",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#cfe7da",
    padding: 25,
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    color: "#fff",
    marginBottom: 20,
    fontFamily: "CrimsonText-Bold",
    textDecorationLine: "underline",
  },

  input: {
    width: "100%",
    backgroundColor: "#CDE7B0",
    borderRadius: 40,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 16,
    fontSize: 18,
    color: "#0F4F3A",
    fontFamily: "CrimsonText-Regular",
    textAlign: "center",
  },

  button: {
    backgroundColor: "#6A2F00",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "CrimsonText-SemiBold",
  },
});
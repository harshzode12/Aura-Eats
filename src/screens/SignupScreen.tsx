import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignupScreen = ({ route, navigation }: any) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { selectedPlan } = route.params || { selectedPlan: "3" };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("../../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
        <Image source={require("../../assets/images/auraeats.png")} style={styles.brandText} resizeMode="contain" />

        <View style={styles.card}>
          <Text style={styles.title}>Sign Up</Text>

          <TextInput placeholder="Name" placeholderTextColor="#0F4F3A" style={styles.input} value={name} onChangeText={setName} />
          <TextInput placeholder="Phone No." placeholderTextColor="#0F4F3A" style={styles.input} keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
          <TextInput placeholder="E-mail" placeholderTextColor="#0F4F3A" style={styles.input} value={email} onChangeText={setEmail} />
          <TextInput placeholder="Create Password" placeholderTextColor="#0F4F3A" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
          <TextInput placeholder="Confirm Password" placeholderTextColor="#0F4F3A" style={styles.input} secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginText}>Already have an account ?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Payment", { amount: selectedPlan === "1" ? 5999 : selectedPlan === "3" ? 15999 : 25999 })}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#003F2C",
  },

  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  logo: {
    width: 200,
    height: 140,
    marginBottom: 20,
  },

  brandText: {
    width: 220,
    height: 80,
    marginBottom: 20,
},

  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#fff",
    padding: 20,
  },

  title: {
    textAlign: "center",
    fontSize: 28,
    color: "#fff",
    marginBottom: 20,
    fontFamily: "CrimsonText-Bold",
    textDecorationLine: "underline",
  },

  input: {
    backgroundColor: "#CDE7B0",
    borderRadius: 40,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 14,
    fontSize: 16,
    color: "#0F4F3A",
    fontFamily: "CrimsonText-Regular", // ✅ added
  },

  loginText: {
    textAlign: "center",
    color: "#fff",
    marginTop: 5,
    marginBottom: 15,
    textDecorationLine: "underline",
    fontStyle: "italic",
    fontFamily: "CrimsonText-Regular",
  },

  button: {
    backgroundColor: "#6A2F00",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "CrimsonText-SemiBold", // ✅ better than fontWeight
  },
});
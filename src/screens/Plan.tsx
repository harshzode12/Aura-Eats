import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CommonHeader from "../components/CommonHeader";
import { useNavigation } from "@react-navigation/native";

type Props = {
  selectedAddressType: "office" | "home";
  currentAddress: any;
  onPressLocation: () => void;
};

const Plan = ({ selectedAddressType, currentAddress, onPressLocation }: any) => {
  const navigation = useNavigation<any>();
  const [selectedPlan, setSelectedPlan] = useState("3");
  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>

        <ScrollView contentContainerStyle={styles.container}>

          {/* Common Header */}
          <CommonHeader
            selectedAddressType={selectedAddressType}
            currentAddress={currentAddress}
            onPressLocation={onPressLocation}
          />

          {/* Title */}
          <Image
            source={require("../../assets/images/premiumAura.png")}
            style={styles.titleImage}
            resizeMode="contain"
            />

          <Text style={styles.subtitle}>
            Try a new restaurant every day with{"\n"} one subscription
          </Text>

          {/* PLAN CARD */}
          <View style={styles.planCard}>

            {/* 1 Month */}
            <TouchableOpacity
              style={styles.planRow}
              onPress={() => setSelectedPlan("1")}
            >
              <View style={styles.radio}>
                {selectedPlan === "1" && <View style={styles.radioFill} />}
              </View>

              <View>
                <Text style={styles.planTitle}>1 Month</Text>
                <Text style={styles.planPrice}>₹ 5999</Text>
              </View>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider} />

            {/* 3 Month */}
            <TouchableOpacity
              style={styles.planRow}
              onPress={() => setSelectedPlan("3")}
            >
              <View style={styles.radio}>
                {selectedPlan === "3" && <View style={styles.radioFill} />}
              </View>

              <View>
                <Text style={styles.planTitle}>3 Months</Text>
                <Text style={styles.planPrice}>₹ 15999</Text>
              </View>

              <View style={styles.bestValueContainer}>
                <View style={styles.bestValue}>
                  <Text style={styles.bestValueText}>Best Value</Text>
                </View>

                <View style={styles.bestValueArrow} />
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* 6 Month */}
            <TouchableOpacity
              style={styles.planRow}
              onPress={() => setSelectedPlan("6")}
            >
              <View style={styles.radio}>
                {selectedPlan === "6" && <View style={styles.radioFill} />}
              </View>

              <View>
                <Text style={styles.planTitle}>6 Months</Text>
                <Text style={styles.planPrice}>₹ 25999</Text>
              </View>
            </TouchableOpacity>

          </View>

          {/* WHAT'S INCLUDED */}
          <Text style={styles.includeTitle}>What's included</Text>

          {[
            "Daily meal from a different restaurant",
            "Free delivery on selected orders",
            "Access to special meal combos",
            "Change your restaurant anytime",
            "Extra discounts on additional orders",
            "Priority order processing",
            "Early access to new restaurants",
          ].map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.check}>✓</Text>
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}

          {/* BUTTON */}
           <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("Signup", { selectedPlan })
              }
            >
              <Text style={styles.buttonText}>Get Full Access</Text>
            </TouchableOpacity>

        </ScrollView>

      </SafeAreaView>
    </ImageBackground>
  );
};

export default Plan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent", // 🔥 IMPORTANT
    paddingHorizontal: 18
  },


titleImage: {
width: 260,
height: 80,
alignSelf: "center",
marginTop: -20,
},

subtitle:{
textAlign:"center",
color:"#fff",
fontSize:16,
marginTop:-10,
marginBottom:20,
fontFamily:"CrimsonText-Regular"
},

planCard:{
borderRadius:20,
borderWidth:1,
borderColor:"#ffffff",
overflow:"hidden"
},

planRow:{
flexDirection:"row",
alignItems:"center",
padding:5,
},

radio:{
width:22,
height:22,
borderRadius:11,
borderWidth:2,
borderColor:"#fff",
marginRight:14,
justifyContent:"center",
alignItems:"center"
},

radioFill:{
width:10,
height:10,
borderRadius:5,
backgroundColor:"#fff"
},

planTitle:{
color:"#fff",
fontSize:18,
fontFamily:"CrimsonText-Bold"
},

planPrice:{
color:"#fff",
fontSize:16
},

divider:{
height:1,
backgroundColor:"rgba(255,255,255,0.5)"
},

bestValueContainer:{
flexDirection:"row",
alignSelf:"flex-end",
marginBottom:5,
marginLeft:100
},

bestValue:{
backgroundColor:"#0F4F3A",
paddingHorizontal:20,
paddingVertical:6,
borderTopLeftRadius:10,
borderBottomLeftRadius:10,
justifyContent:"center"
},

bestValueArrow:{
width:0,
height:0,
borderTopWidth:16,
borderBottomWidth:16,
borderLeftWidth:16,
borderTopColor:"transparent",
borderBottomColor:"transparent",
borderLeftColor:"#0F4F3A"
},

bestValueText:{
color:"#fff",
fontWeight:"600",
fontSize:14,
marginBottom:2,
},

includeTitle:{
marginTop:30,
fontSize:20,
color:"#fff",
textDecorationLine:"underline",
fontFamily:"CrimsonText-Bold"
},

listItem:{
flexDirection:"row",
alignItems:"center",
marginTop:6
},

check:{
color:"#fff",
fontSize:20,
marginRight:10
},

listText:{
color:"#fff",
fontSize:15,
flex:1,
lineHeight:18
},

button:{
marginTop:20,
backgroundColor:"#6A2F00",
padding:18,
borderRadius:30,
alignItems:"center"
},

buttonText:{
color:"#fff",
fontSize:18,
fontFamily:"CrimsonText-Bold"
}

});
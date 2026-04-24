import React from "react";
import { StatusBar, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import VideoSplashScreen from "./screens/VideoSplashScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import Signup from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import PaymentScreen from "./screens/PaymentScreen";
import YourMindScreen from "./screens/YourMindScreen";
import Pay from "./screens/pay";
import OrderTrackingScreen from "./screens/OrderTrackingScreen";
import ProfileScreen from "./screens/ProfileScreen"; // ✅ ADDED

import { TabKey } from "./components/GlassBottomTab";

// ✅ TYPES
export type RootStackParamList = {
  Video: undefined;
  Welcome: undefined;

  Home: {
    screen?: TabKey;
    selectedAddressType?: "office" | "home";
    currentAddress?: any;
  };

  Signup: undefined;
  Login: undefined;

  yourmind: {
    selectedAddressType: "office" | "home";
    currentAddress: any;
  };

  Pay: {
    cartItems: {
      id: string;
      name: string;
      price: number;
      image: any;
      quantity: number;
    }[];
  };

  Payment: {
    amount: number;
    selectedAddressType: "office" | "home";
    currentAddress: any;
  };

  OrderTracking: undefined;

  ProfileScreen: undefined; // ✅ ADDED
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuraTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
    card: "transparent",
    text: "#ffffff",
    border: "transparent",
  },
};

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#0f2e2b" }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <NavigationContainer theme={AuraTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: "fade",
            contentStyle: { backgroundColor: "transparent" },
          }}
        >
          <Stack.Screen name="Video" component={VideoSplashScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={Signup} />

          <Stack.Screen name="yourmind" component={YourMindScreen} />
          <Stack.Screen name="Pay" component={Pay} />

          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />

          {/* ✅ PROFILE */}
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
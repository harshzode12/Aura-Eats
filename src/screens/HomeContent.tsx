import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import styles from "../styles/HomeContent.styles";

import CommonHeader from "../components/CommonHeader";

// ✅ Tab type
type TabKey =
  | "home"
  | "premium"
  | "cart"
  | "plan"
  | "hotelmenu"
  | "yourmind";

// ✅ Props
type Props = {
  setActiveTab: (tab: TabKey) => void;
  selectedAddressType: "home" | "office";
  currentAddress: any;
  onPressLocation: () => void;
  navigation: any; // 👈 ADD THIS
};

const HomeContent = ({
  setActiveTab,
  selectedAddressType,
  currentAddress,
  onPressLocation,
  navigation,
}: Props) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* ================= HEADER ================= */}
      <CommonHeader
        selectedAddressType={selectedAddressType}
        currentAddress={currentAddress}
        onPressLocation={onPressLocation}
        onPressProfile={() => navigation.navigate("ProfileScreen")} // ✅ FIXED
      />

      {/* ================= SEARCH ================= */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={25}
            reducedTransparencyFallbackColor="rgba(255,255,255,0.9)"
          />

          <View style={styles.searchContent}>
            <Image
              source={require("../../assets/images/search.png")}
              style={styles.searchIcon}
            />

            <TextInput
              placeholder="What are you craving today?"
              placeholderTextColor="rgba(255,255,255,0.6)"
              style={styles.searchInput}
            />
          </View>
        </View>
      </View>

      {/* ================= PREMIUM CARD ================= */}
      <TouchableOpacity
        style={styles.premiumCard}
        onPress={() => setActiveTab("plan")}
      >
        <Image
          source={require("../../assets/images/premiumCard.png")}
          style={styles.premiumImage}
          resizeMode="stretch"
        />

        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={() => setActiveTab("plan")}
        >
          <Text style={styles.subscribeText}>Subscribe Now</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* ================= FAVORITES ================= */}
      <Text style={styles.sectionTitle}>Your Favorites</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[1, 2, 3].map((_, index) => (
          <TouchableOpacity
            key={index}
            style={styles.favoriteCard}
            onPress={() => setActiveTab("hotelmenu")}
          >
            <Image
              source={require("../../assets/images/burger.png")}
              style={styles.favoriteImage}
            />

            <View style={styles.favoriteOverlay} />

            <View style={styles.favoriteTextContainer}>
              <Text style={styles.favoriteTitle}>Burger King</Text>

              <View style={styles.favoriteBottomRow}>
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>4.8 / 5</Text>
                </View>
                <Text style={styles.reviewText}>(2914)</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ================= CATEGORIES ================= */}
      <TouchableOpacity onPress={() => setActiveTab("yourmind")}>
        <Text style={styles.sectionTitle}>What’s on your mind?</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {["Dessert", "Cake", "Pastry"].map((title, index) => (
            <View key={index} style={styles.circleWrapper}>
              <Image
                source={require("../../assets/images/cake.png")}
                style={styles.circleImage}
              />
              <View style={styles.circleOverlay} />
              <Text style={styles.circleText}>{title}</Text>
            </View>
          ))}
        </ScrollView>
      </TouchableOpacity>

      {/* ================= TOP PICKS ================= */}
      <Text style={styles.sectionTitle}>Top Picks</Text>

      <TouchableOpacity
        style={styles.topPickCard}
        onPress={() => setActiveTab("hotelmenu")}
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={30}
        />

        <View style={styles.topPickContent}>
          <Image
            source={require("../../assets/images/pizza.png")}
            style={styles.topPickImage}
          />

          <View>
            <Text style={styles.hotelName}>Taj Hotel</Text>

            <View style={styles.ratingRow}>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>4.8 / 5</Text>
              </View>

              <Text style={styles.reviewText}>2914 reviews</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HomeContent;
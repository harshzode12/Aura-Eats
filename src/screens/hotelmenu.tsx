import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "@react-native-community/blur";
import { useNavigation } from "@react-navigation/native";
import CommonHeader from "../components/CommonHeader";

type Props = {
  selectedAddressType: "office" | "home";
  currentAddress: any;
  onPressLocation: () => void;
};

const HotelMenu = ({
  selectedAddressType,
  currentAddress,
  onPressLocation
}: Props) => {

  const navigation = useNavigation<any>();
  const [cart, setCart] = useState<any>({});

  const dishes = [
    {
      id: 1,
      name: "Dal Makhani",
      price: 169,
      rating: "4.8",
      reviews: "394 reviews",
      image: require("../../assets/images/dal.png")
    },
    {
      id: 2,
      name: "Tawa Pulav",
      price: 220,
      rating: "4.6",
      reviews: "284 reviews",
      image: require("../../assets/images/pulav.png")
    },
    {
      id: 3,
      name: "Margherita Pizza",
      price: 260,
      rating: "4.5",
      reviews: "192 reviews",
      image: require("../../assets/images/Margherita pizza.png")
    },
    {
      id: 4,
      name: "Paneer Tikka",
      price: 240,
      rating: "4.1",
      reviews: "152 reviews",
      image: require("../../assets/images/paneer.png")
    }
  ];

  const addItem = (id: number) => {
    setCart((prev: any) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : 1
    }));
  };

  const removeItem = (id: number) => {
    setCart((prev: any) => {
      if (!prev[id]) return prev;
      const updated = { ...prev };
      updated[id] -= 1;
      if (updated[id] === 0) delete updated[id];
      return updated;
    });
  };

   const totalItems = Object.values(cart).reduce((sum: number, val: any) => sum + val, 0);

  const getCartItems = () => {
    return Object.keys(cart).map((id) => {
      const item = dishes.find((d) => d.id === Number(id));
      return {
        id: id.toString(),
        name: item?.name,
        price: item?.price,
        image: item?.image,
        quantity: cart[id]
      };
    });
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >

          {/* HEADER */}
          <CommonHeader
            selectedAddressType={selectedAddressType}
            currentAddress={currentAddress}
            onPressLocation={onPressLocation}
          />

          {/* SEARCH */}
          <View style={styles.searchWrapper}>
            <View style={styles.searchContainer}>
              <BlurView
                style={StyleSheet.absoluteFill}
                blurType="light"
                blurAmount={25}
              />

              <View style={styles.searchContent}>
                <Image
                  source={require("../../assets/images/search.png")}
                  style={styles.searchIcon}
                />

                <TextInput
                  placeholder="What are you craving today ?"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  style={styles.searchInput}
                />
              </View>
            </View>
          </View>

          {/* HOTEL CARD */}
          <View style={styles.hotelCard}>
            <View style={styles.hotelRow}>
              <Image
                source={require("../../assets/images/pizza.png")}
                style={styles.hotelImage}
              />

              <View style={styles.hotelDivider} />

              <View style={{ flex: 1 }}>
                <Text style={styles.hotelName}>Taj Hotel</Text>

                <View style={styles.ratingRow}>
                  <View style={styles.ratingBadge}>
                    <Text style={styles.ratingText}>4.8</Text>
                    <Text style={styles.ratingSlash}>/5</Text>
                  </View>

                  <Text style={styles.reviewText}>
                    (2914 reviews)
                  </Text>
                </View>

                <Text style={styles.distance}>
                  Vesu, 6.2 km
                </Text>

                <Text style={styles.time}>
                  🕒 Estimated Time 15-20 min
                </Text>
              </View>
            </View>
          </View>

          {/* TOP DISHES */}
          <Text style={styles.sectionTitle}>
            Top Dishes
          </Text>

          {dishes.map((item) => {
            const qty = cart[item.id] || 0;

            return (
              <View key={item.id} style={styles.dishCard}>

                <Image source={item.image} style={styles.dishImage} />

                <View style={styles.dishDivider} />

                <View style={{ flex: 1 }}>

                  <Text style={styles.dishTitle}>
                    {item.name}
                  </Text>

                  <View style={styles.ratingRow}>
                    <View style={styles.ratingBadge}>
                      <Text style={styles.ratingText}>
                        {item.rating}
                      </Text>
                      <Text style={styles.ratingSlash}>/5</Text>
                    </View>

                    <Text style={styles.reviewText}>
                      ({item.reviews})
                    </Text>
                  </View>

                  <Text style={styles.price}>
                    ₹ {item.price}
                  </Text>

                  {/* BUTTON LOGIC */}
                  {qty === 0 ? (
                    <TouchableOpacity
                      style={styles.orderBtn}
                      onPress={() => addItem(item.id)}
                    >
                      <Text style={styles.orderText}>Order</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.qtyContainer}>
                      <TouchableOpacity onPress={() => removeItem(item.id)}>
                        <Text style={styles.qtyBtn}>-</Text>
                      </TouchableOpacity>

                      <Text style={styles.qtyText}>{qty}</Text>

                      <TouchableOpacity onPress={() => addItem(item.id)}>
                        <Text style={styles.qtyBtn}>+</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* 🔥 VIEW CART BAR */}
        {totalItems > 0 && (
          <View style={styles.cartBar}>
            <Text style={styles.cartText}>
              {totalItems} Items added
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Pay", {
                  cartItems: getCartItems()
                })
              }
            >
              <Text style={styles.viewCart}>View Cart &gt;</Text>
            </TouchableOpacity>
          </View>
        )}

      </SafeAreaView>
    </ImageBackground>
  );
};

export default HotelMenu;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent", // 🔥 IMPORTANT
    padding:18,
    paddingBottom:120
  },

/* SEARCH */

searchWrapper:{
marginTop:10
},

searchContainer:{
height:55,
borderRadius:30,
overflow:"hidden",
borderWidth:1.5,
borderColor:"rgba(255,255,255,0.9)",
justifyContent:"center"
},

searchContent:{
flexDirection:"row",
alignItems:"center",
paddingHorizontal:18
},

searchIcon:{
width:22,
height:22,
marginRight:10
},

searchInput:{
flex:1,
fontSize:16,
color:"#000",
fontFamily:"CrimsonText-Regular"
},

/* HOTEL CARD */

hotelCard:{
borderRadius:24,
borderWidth:1.5,
borderColor:"#fff",
marginTop:20,
padding:16
},

hotelRow:{
flexDirection:"row",
alignItems:"center"
},

hotelImage:{
width:120,
height:120,
borderRadius:22
},

hotelDivider:{
  width:1,
  height:110,
  backgroundColor:"#fff",
  marginHorizontal:14
},

hotelName:{
fontSize:24,
color:"#6A3914",
fontFamily:"CrimsonText-Bold"
},

ratingRow:{
flexDirection:"row",
alignItems:"center",
marginTop:4
},

ratingBadge:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#DF9A59",
paddingHorizontal:8,
paddingVertical:4,
borderTopLeftRadius:12,
borderBottomLeftRadius:12,
borderBottomRightRadius:12
},

ratingText:{
color:"#6A3914",
fontSize:10,
fontFamily:"CrimsonText-Bold"
},

ratingSlash:{
color:"#6A3914",
fontSize:10,
marginLeft:2
},

reviewText:{
marginLeft:8,
color:"#6A3914",
fontSize:12,
fontFamily:"CrimsonText-Regular"
},

distance:{
marginTop:6,
color:"#6A3914",
fontFamily:"CrimsonText-Regular"
},

timeRow:{
flexDirection:"row",
alignItems:"center",
marginTop:6
},

clock:{
marginRight:6
},

time:{
color:"#6A3914",
fontFamily:"CrimsonText-Regular"
},

heart:{
position:"absolute",
top:10,
right:14,
zIndex:10
},

/* TOP DISHES */

sectionTitle:{
fontSize:22,
color:"#fff",
marginTop:30,
textDecorationLine:"underline",
fontFamily:"CrimsonText-Bold"
},

dishCard:{
flexDirection:"row",
alignItems:"center",
borderWidth:1.5,
borderColor:"#fff",
borderRadius:24,
padding:10,
height:120,
marginTop:16
},

dishImage:{
width:90,
height:90,
borderRadius:18
},

dishDivider:{
  width:1,
  height:90,
  backgroundColor:"#fff",
  marginHorizontal:12
},

dishTitle:{
fontSize:18,
color:"#6A3914",
fontFamily:"CrimsonText-Bold"
},

price:{
marginTop:4,
fontSize:14,
color:"#fff",
fontFamily:"CrimsonText-Regular"
},

orderBtn:{
marginTop:6,
backgroundColor:"#7A3600",
paddingVertical:4,
paddingHorizontal:25,
borderRadius:5,
alignSelf:"flex-start"
},

orderText:{
color:"#fff",
fontSize:10,
fontFamily:"CrimsonText-Bold"
},

qtyContainer: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#7A3600",
  borderRadius: 6,
  marginTop: 6,
  paddingHorizontal: 10,
  paddingVertical: 4,
  alignSelf: "flex-start"
},

qtyBtn: {
  color: "#fff",
  fontSize: 18,
  paddingHorizontal: 10
},

qtyText: {
  color: "#fff",
  fontSize: 14,
  fontFamily: "CrimsonText-Bold"
},

cartBar: {
  position: "absolute",
  bottom: 80,
  left: 20,
  right: 20,
  backgroundColor: "#1E8C63",
  borderRadius: 30,
  flexDirection: "row",
  justifyContent: "space-between",
  paddingVertical: 16,
  paddingHorizontal: 20,
  alignItems: "center"
},

cartText: {
  color: "#fff",
  fontSize: 16,
  fontFamily: "CrimsonText-Bold"
},

viewCart: {
  color: "#fff",
  fontSize: 16,
  fontFamily: "CrimsonText-Bold"
},

});
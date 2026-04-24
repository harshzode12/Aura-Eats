import {
  StyleSheet,
} from "react-native";
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingTop: 45,
    paddingBottom: 140,
    flexGrow: 1,
  },

  /* ================= SEARCH ================= */
  searchWrapper: {
    marginTop: 22,
    width: "100%",
  },

  searchContainer: {
    height: 55,
    marginTop: -20,
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.9)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },

  searchContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    flex: 1,
  },

  searchIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
    resizeMode: "contain",
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    padding: 0,
    fontFamily: "CrimsonText-Regular",
  },

  /* ================= PREMIUM CARD ================= */
  premiumCard: {
    marginTop: -10,
    marginBottom: -40,
    marginHorizontal: 0,
    width: "100%",
    alignItems: "center",
  },

  premiumImage: {
    width: "120%",
    height: 260,
  },

  subscribeButton: {
    position: "absolute",
    bottom: 60,
    backgroundColor: "#0F4F3A",
    paddingHorizontal: 24,
    paddingVertical: 7,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },

  subscribeText: {
    fontSize: 14,
    color: "#E8E8E8",
    fontFamily: "CrimsonText-Regular",
    letterSpacing: 1,
  },

  /* ================= SECTION TITLE ================= */
  sectionTitle: {
    fontSize: 20,
    marginTop: 28,
    marginBottom: 14,
    color: "#ffffff",
    textDecorationLine: "underline",
    fontFamily: "CrimsonText-Bold",
  },

  /* ================= FAVORITES ================= */
  favoriteCard: {
    width: 114,
    height: 114,
    borderRadius: 28,
    marginRight: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ffffff",
  },

  favoriteImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  favoriteOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "45%",
    backgroundColor: "rgba(21, 21, 21, 0.51)",
  },

  favoriteTextContainer: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 16,
  },

  favoriteTitle: {
    fontSize: 12,
    marginLeft: -2,
    color: "#fff0e8",
    fontFamily: "CrimsonText-Bold",
  },

  favoriteBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DF9A59",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  ratingText: {
    fontSize: 10,
    color: "#6A3914",
    fontFamily: "CrimsonText-Bold",
  },

  reviewText: {
    marginLeft: 4,
    fontSize: 10,
    color: "#fff",
    fontFamily: "CrimsonText-Regular",
  },

  /* ================= CATEGORIES ================= */
  circleWrapper: {
    width: 114,
    height: 114,
    borderRadius: 57,
    marginRight: 14,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.9)",
  },

  circleImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  circleOverlay: {
    position: "absolute",
    bottom: -10,
    width: "100%",
    height: "45%",
    backgroundColor: "rgba(60, 60, 60, 0.24)",
  },

  circleText: {
    position: "absolute",
    bottom: 14,
    alignSelf: "center",
    fontSize: 16,
    color: "#ffffff",
    fontFamily: "CrimsonText-Bold",
  },

  /* ================= TOP PICKS ================= */
  topPickCard: {
    height: 100,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.9)",
    marginTop: 10,
  },

  topPickContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    flex: 1,
  },

  topPickImage: {
    width: 72,
    height: 72,
    borderRadius: 18,
    marginRight: 14,
  },

  hotelName: {
    fontSize: 17,
    color: "#6A3914",
    fontFamily: "CrimsonText-Bold",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
});

export default styles;
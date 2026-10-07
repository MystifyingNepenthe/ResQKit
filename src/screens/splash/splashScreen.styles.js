import { StyleSheet } from "react-native";

import { COLORS, SPACING } from "../../design";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.xl,
  },

  logoContainer: {
    alignItems: "center",
  },

  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  logoImage: {
    width: 120,
    height: 120,
  },

  logoText: {
    marginTop: SPACING.lg,
    fontSize: 34,
    fontWeight: "800",
    color: COLORS.white,
  },

  tagline: {
    marginTop: SPACING.sm,
    fontSize: 15,
    textAlign: "center",
    color: COLORS.white,
  },

  footer: {
    paddingBottom: SPACING.xl,
    textAlign: "center",
    fontSize: 13,
    color: COLORS.white,
  },
});
import { StyleSheet } from "react-native";

import { COLORS, SPACING } from "../../design";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.xl,
  },

  logoCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  logoImage: {
    width: 92,
    height: 92,
  },

  title: {
    marginTop: SPACING.lg,
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.text,
  },

  subtitle: {
    marginTop: SPACING.sm,
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: "center",
  },

  loader: {
    marginTop: SPACING.xl,
  },
});
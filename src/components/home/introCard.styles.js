import { StyleSheet } from "react-native";

import {
  COLORS,
  SPACING,
  RADIUS,
  SHADOWS,
} from "../../design";

export default StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,

    marginHorizontal: SPACING.lg,

    marginTop: SPACING.md,

    borderRadius: RADIUS.lg,

    overflow: "hidden",

    ...SHADOWS.small,
  },

  imageContainer: {
    height: 120,

    backgroundColor: COLORS.primaryLight,

    justifyContent: "center",

    alignItems: "center",
  },

  content: {
    padding: SPACING.md,
  },

  title: {
    fontSize: 18,

    fontWeight: "700",

    color: COLORS.text,
  },

  subtitle: {
    marginTop: 6,

    color: COLORS.textSecondary,

    fontSize: 14,
  },

  footer: {
    marginTop: SPACING.md,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  duration: {
    color: COLORS.textSecondary,

    fontWeight: "600",
  },

  watch: {
    color: COLORS.primary,

    fontWeight: "700",
  },
});
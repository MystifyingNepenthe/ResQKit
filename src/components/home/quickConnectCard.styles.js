import { StyleSheet } from "react-native";

import {
  COLORS,
  SPACING,
  RADIUS,
  SHADOWS,
} from "../../design";

export default StyleSheet.create({
  card: {
    backgroundColor: COLORS.primary,

    marginHorizontal: SPACING.lg,

    marginTop: SPACING.lg,

    borderRadius: RADIUS.lg,

    padding: SPACING.md,

    ...SHADOWS.small,
  },

  title: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "700",
  },

  subtitle: {
    color: COLORS.white,
    opacity: 0.9,
    marginTop: 3,
    fontSize: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.xs,
  },
});
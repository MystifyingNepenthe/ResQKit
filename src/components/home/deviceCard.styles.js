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

    marginTop: SPACING.lg,

    borderRadius: RADIUS.lg,

    padding: SPACING.xxs,

    ...SHADOWS.small,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 4,
    marginBottom: SPACING.sm,
    color: COLORS.textSecondary,
    fontSize: 15,
  },

  info: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: SPACING.xxs,
  },

  battery: {
    marginTop: 4,
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.text,
  },

  divider: {
    marginVertical: SPACING.xs,
  },
});
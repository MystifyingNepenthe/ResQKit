import { StyleSheet } from "react-native";

import {
  COLORS,
  SPACING,
  RADIUS,
} from "../../design";

export default StyleSheet.create({
  card: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",

    marginBottom: SPACING.lg,
  },

  iconContainer: {
    width: 46,
    height: 46,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: RADIUS.md,

    backgroundColor: COLORS.primaryLight,

    marginRight: SPACING.md,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",

    color: COLORS.text,

    marginBottom: SPACING.xs,
  },

  description: {
    fontSize: 14,
    lineHeight: 20,

    color: COLORS.textSecondary,
  },

  message: {
    marginTop: SPACING.md,

    fontSize: 13,
    fontWeight: "600",

    color: COLORS.primary,
  },

  errorMessage: {
    color: COLORS.error,
  },
});
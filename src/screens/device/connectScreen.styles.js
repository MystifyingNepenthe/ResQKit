import { StyleSheet } from "react-native";

import {
  COLORS,
  SPACING,
  RADIUS,
} from "../../design";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    flex: 1,

    justifyContent: "center",

    paddingHorizontal: SPACING.lg,
  },

  iconContainer: {
    width: 90,
    height: 90,

    alignSelf: "center",

    alignItems: "center",
    justifyContent: "center",

    borderRadius: RADIUS.round,

    backgroundColor: COLORS.primaryLight,

    marginBottom: SPACING.lg,
  },

  title: {
    textAlign: "center",

    fontSize: 28,
    fontWeight: "700",

    color: COLORS.text,
  },

  subtitle: {
    marginTop: SPACING.sm,
    marginBottom: SPACING.xl,

    textAlign: "center",

    fontSize: 16,

    color: COLORS.textSecondary,
  },

  card: {
    marginBottom: SPACING.lg,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",

    color: COLORS.text,

    marginBottom: SPACING.sm,
  },

  description: {
    fontSize: 14,
    lineHeight: 20,

    color: COLORS.textSecondary,

    marginBottom: SPACING.lg,
  },

  skip: {
    textAlign: "center",

    fontSize: 15,
    fontWeight: "600",

    color: COLORS.primary,
  },
});
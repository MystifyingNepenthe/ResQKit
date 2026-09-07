import { StyleSheet } from "react-native";

import {
  COLORS,
  SPACING,
} from "../../design";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",

    color: COLORS.text,
  },

  subtitle: {
    marginTop: SPACING.sm,
    marginBottom: SPACING.lg,

    fontSize: 16,

    color: COLORS.textSecondary,
  },

  card: {
    marginBottom: SPACING.lg,
  },

  input: {
    marginBottom: SPACING.md,
  },

  optionalText: {
    fontSize: 13,

    color: COLORS.textSecondary,
  },

  error: {
    marginBottom: SPACING.md,

    textAlign: "center",

    color: COLORS.error,
  },

  button: {
    marginBottom: SPACING.lg,
  },

  loginLink: {
    textAlign: "center",

    fontSize: 15,
    fontWeight: "600",

    color: COLORS.primary,
  },
});
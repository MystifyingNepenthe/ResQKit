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
    paddingTop: SPACING.lg,
  },

  subtitle: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,

    fontSize: 16,

    color: COLORS.textSecondary,
  },

  card: {
    marginHorizontal: SPACING.lg,
  },

  languageRow: {
    minHeight: 58,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  language: {
    fontSize: 16,
    fontWeight: "600",

    color: COLORS.text,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
});
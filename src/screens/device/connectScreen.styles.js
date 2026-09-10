import {
  StyleSheet,
} from "react-native";

import {
  COLORS,
  SPACING,
  RADIUS,
} from "../../design";

export default StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor:
      COLORS.background,
  },

  content: {
    flex: 1,

    justifyContent:
      "center",

    paddingHorizontal:
      SPACING.lg,

    paddingVertical:
      SPACING.xl,
  },

  iconContainer: {
    width: 92,
    height: 92,

    alignSelf:
      "center",

    alignItems:
      "center",

    justifyContent:
      "center",

    borderRadius:
      RADIUS.round,

    backgroundColor:
      COLORS.primaryLight,

    marginBottom:
      SPACING.lg,
  },

  title: {
    textAlign:
      "center",

    fontSize: 28,

    fontWeight:
      "700",

    color:
      COLORS.text,
  },

  subtitle: {
    marginTop:
      SPACING.sm,

    marginBottom:
      SPACING.xl,

    paddingHorizontal:
      SPACING.sm,

    textAlign:
      "center",

    fontSize: 14,

    lineHeight: 21,

    color:
      COLORS.textSecondary,
  },

  card: {
    marginBottom:
      SPACING.lg,
  },

  deviceHeader: {
    flexDirection:
      "row",

    alignItems:
      "center",
  },

  deviceIcon: {
    width: 52,
    height: 52,

    alignItems:
      "center",

    justifyContent:
      "center",

    borderRadius:
      RADIUS.md,

    backgroundColor:
      COLORS.surface,

    marginRight:
      SPACING.md,
  },

  deviceInfo: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 18,

    fontWeight:
      "700",

    color:
      COLORS.text,
  },

  deviceStatus: {
    marginTop:
      SPACING.xs,

    fontSize: 13,

    color:
      COLORS.textSecondary,
  },

  divider: {
    height: 1,

    backgroundColor:
      COLORS.border,

    marginVertical:
      SPACING.lg,
  },

  instructionRow: {
    flexDirection:
      "row",

    alignItems:
      "center",

    marginBottom:
      SPACING.md,
  },

  instructionText: {
    flex: 1,

    marginLeft:
      SPACING.sm,

    fontSize: 14,

    lineHeight: 20,

    color:
      COLORS.text,
  },

  buttonContainer: {
    marginTop:
      SPACING.md,
  },

  skip: {
    textAlign:
      "center",

    fontSize: 15,

    fontWeight:
      "600",

    color:
      COLORS.primary,
  },

  skipDisabled: {
    opacity: 0.4,
  },

  skipDescription: {
    marginTop:
      SPACING.sm,

    paddingHorizontal:
      SPACING.lg,

    textAlign:
      "center",

    fontSize: 12,

    lineHeight: 18,

    color:
      COLORS.textSecondary,
  },
});
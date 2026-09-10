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
    alignItems: "center",
    justifyContent: "space-between",
  },

  deviceInfo: {
    flexDirection: "row",
    alignItems: "center",
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

  titleContainer: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",

    color: COLORS.text,

    marginBottom: SPACING.xs,
  },

  batteryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",

    color: COLORS.textSecondary,
  },

  batteryValue: {
    fontSize: 15,
    fontWeight: "700",

    color: COLORS.text,
  },

  lastSync: {
    marginTop: SPACING.sm,

    fontSize: 13,

    color: COLORS.textSecondary,
  },

  disconnectedText: {
    marginTop: SPACING.lg,

    fontSize: 14,
    lineHeight: 20,

    color: COLORS.textSecondary,
  },

  buttonContainer: {
    marginTop: SPACING.lg,
  },
});
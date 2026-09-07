import { StyleSheet } from "react-native";

import {
  COLORS,
  SPACING,
  SHADOWS,
} from "../../design";

export default StyleSheet.create({
  container: {
    height: 30,

    backgroundColor: COLORS.primaryLight,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    paddingHorizontal: SPACING.lg,

    ...SHADOWS.small,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
    marginLeft: SPACING.md,
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
  },
});
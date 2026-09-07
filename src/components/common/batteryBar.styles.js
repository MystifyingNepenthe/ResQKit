import { StyleSheet } from "react-native";

import {
  COLORS,
  SPACING,
  RADIUS,
} from "../../design";

export default StyleSheet.create({
  container: {
    marginTop: SPACING.sm,
  },

  background: {
    width: "100%",
    height: 8,

    backgroundColor: COLORS.border,

    borderRadius: RADIUS.sm,

    overflow: "hidden",
  },

  fill: {
    height: "100%",
    borderRadius: RADIUS.sm,
  },

  text: {
    marginTop: 6,

    fontSize: 13,

    color: COLORS.textSecondary,
  },
});
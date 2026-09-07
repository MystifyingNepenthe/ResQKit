import { StyleSheet } from "react-native";

import {
  COLORS,
  SPACING,
} from "../../design";

export default StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
  },

  title: {
    marginBottom: SPACING.md,

    fontSize: 18,
    fontWeight: "700",

    color: COLORS.text,
  },
});
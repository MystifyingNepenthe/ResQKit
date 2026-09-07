import { StyleSheet } from "react-native";

import {
  COLORS,
  SPACING,
  RADIUS,
} from "../../design";

export default StyleSheet.create({
  container: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: COLORS.white,

    borderWidth: 1,

    borderColor: COLORS.border,

    borderRadius: RADIUS.md,

    marginHorizontal: SPACING.lg,

    marginTop: SPACING.lg,

    paddingHorizontal: SPACING.sm,

    height: 35,
  },

  input: {
    flex: 1,

    marginLeft: SPACING.sm,

    fontSize: 16,

    color: COLORS.text,
  },
});
import { StyleSheet } from "react-native";

import {
  COLORS,
  SPACING,
  RADIUS,
} from "../../design";

export default StyleSheet.create({
  chip: {
    alignSelf: "flex-start",

    paddingVertical: 6,

    paddingHorizontal: 14,

    borderRadius: RADIUS.xl,
  },

  text: {
    color: COLORS.white,

    fontWeight: "700",

    fontSize: 13,
  },
});
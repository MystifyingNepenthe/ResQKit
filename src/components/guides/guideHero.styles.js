import {
  StyleSheet,
} from "react-native";

import {
  COLORS,
  RADIUS,
  SPACING,
} from "../../design";

export default StyleSheet.create({
  container: {
    height: 190,

    position: "relative",

    overflow: "hidden",

    borderRadius:
      RADIUS.xl,

    backgroundColor:
      COLORS.surface,
  },

  compact: {
    height: 125,

    borderBottomLeftRadius: 0,

    borderBottomRightRadius: 0,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",

    left: 0,
    right: 0,
    bottom: 0,

    paddingHorizontal:
      SPACING.md,

    paddingTop:
      SPACING.xl,

    paddingBottom:
      SPACING.md,

    backgroundColor:
      "rgba(15, 40, 55, 0.38)",
  },

  title: {
    fontSize: 22,

    lineHeight: 27,

    fontWeight: "800",

    color:
      COLORS.white,
  },
});
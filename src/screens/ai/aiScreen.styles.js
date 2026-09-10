import {
  StyleSheet,
} from "react-native";

import {
  COLORS,
  SPACING,
} from "../../design";

export default StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor:
      COLORS.background,
  },

  scrollView: {
    flex: 1,
  },

  content: {
    flexGrow: 1,

    paddingTop:
      SPACING.md,

    paddingBottom:
      SPACING.lg,
  },

  emptyContent: {
    justifyContent:
      "center",
  },
});
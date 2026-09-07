import { StyleSheet } from "react-native";

import {
  COLORS,
  SPACING,
} from "../../design";

export default StyleSheet.create({

  card: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },

  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  title: {
    marginLeft: SPACING.md,
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.text,
  },

});
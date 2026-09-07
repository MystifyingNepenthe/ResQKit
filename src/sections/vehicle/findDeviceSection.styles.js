import { StyleSheet } from "react-native";

import {
  COLORS,
  SPACING,
} from "../../design";

export default StyleSheet.create({
  card: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
  },

  description: {
    marginBottom: SPACING.md,
    color: COLORS.textSecondary,
    fontSize: 14,
  },
});
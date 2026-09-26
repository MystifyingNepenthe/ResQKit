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

  newChatRow: {
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
  },

  newChatButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.sm,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: COLORS.white,
  },

  newChatText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 6,
  },
});
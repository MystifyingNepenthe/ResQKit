import { StyleSheet } from "react-native";
import { COLORS, RADIUS, SPACING } from "../../design";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  item: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.white,
  },
  itemActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  itemPressed: {
    opacity: 0.78,
  },
  label: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "600",
  },
  labelActive: {
    color: COLORS.white,
  },
});

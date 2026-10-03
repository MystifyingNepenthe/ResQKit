import { StyleSheet } from "react-native";
import { COLORS, RADIUS, SHADOWS, SPACING } from "../../design";

export default StyleSheet.create({
  section: { marginTop: SPACING.lg, paddingHorizontal: SPACING.lg },
  title: { color: COLORS.text, fontSize: 18, fontWeight: "800", marginBottom: SPACING.sm },
  grid: { gap: SPACING.sm },
  action: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  actionPressed: { opacity: 0.78, transform: [{ scale: 0.995 }] },
  iconWrap: { width: 44, height: 44, borderRadius: RADIUS.md, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.surface },
  textWrap: { flex: 1, marginLeft: SPACING.md, marginRight: SPACING.sm },
  label: { color: COLORS.text, fontSize: 15, fontWeight: "800" },
  subtitle: { color: COLORS.textSecondary, fontSize: 12, lineHeight: 17, marginTop: 2 },
});

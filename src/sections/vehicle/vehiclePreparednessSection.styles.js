import { StyleSheet } from "react-native";
import { COLORS, RADIUS, SPACING } from "../../design";

export default StyleSheet.create({
  card: { marginHorizontal: SPACING.lg, marginTop: SPACING.md },
  header: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: SPACING.md, marginBottom: SPACING.sm },
  title: { color: COLORS.text, fontSize: 17, fontWeight: "800" },
  subtitle: { color: COLORS.textSecondary, fontSize: 12, marginTop: 3 },
  scoreBadge: { minWidth: 54, paddingHorizontal: 10, paddingVertical: 7, borderRadius: RADIUS.round, alignItems: "center", backgroundColor: COLORS.primaryLight },
  scoreText: { color: COLORS.primaryDark, fontSize: 12, fontWeight: "800" },
  row: { flexDirection: "row", alignItems: "center", minHeight: 56, paddingVertical: 8, borderTopWidth: 1, borderTopColor: COLORS.border },
  check: { width: 30, height: 30, borderRadius: 15, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.surface },
  checkComplete: { backgroundColor: COLORS.success, borderColor: COLORS.success },
  rowBody: { flex: 1, marginLeft: SPACING.sm },
  rowTitle: { color: COLORS.text, fontSize: 13, fontWeight: "700" },
  rowSubtitle: { color: COLORS.textSecondary, fontSize: 11, marginTop: 2 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: SPACING.sm, marginTop: SPACING.md },
  actionButton: { minHeight: 42, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md },
  actionText: { color: COLORS.primary, fontSize: 12, fontWeight: "800" },
});

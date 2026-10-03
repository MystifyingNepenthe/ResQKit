import { StyleSheet } from "react-native";
import { COLORS, RADIUS, SPACING } from "../../design";

export default StyleSheet.create({
  card: { marginHorizontal: SPACING.lg, marginTop: SPACING.lg },
  header: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: SPACING.md },
  title: { color: COLORS.text, fontSize: 18, fontWeight: "800" },
  subtitle: { color: COLORS.textSecondary, fontSize: 13, lineHeight: 18, marginTop: 4, maxWidth: 245 },
  progressBadge: { minWidth: 54, paddingHorizontal: 10, paddingVertical: 7, borderRadius: RADIUS.round, backgroundColor: COLORS.primaryLight, alignItems: "center" },
  progressText: { color: COLORS.primaryDark, fontWeight: "800", fontSize: 13 },
  progressTrack: { height: 7, borderRadius: RADIUS.round, backgroundColor: COLORS.border, overflow: "hidden", marginTop: SPACING.md },
  progressFill: { height: "100%", borderRadius: RADIUS.round, backgroundColor: COLORS.primary },
  rows: { marginTop: SPACING.sm },
  row: { minHeight: 58, flexDirection: "row", alignItems: "center", paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  rowPressed: { opacity: 0.68 },
  rowIcon: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
  rowIconComplete: { backgroundColor: COLORS.success, borderColor: COLORS.success },
  rowBody: { flex: 1, marginLeft: SPACING.sm, marginRight: SPACING.sm },
  rowTitle: { color: COLORS.text, fontSize: 14, fontWeight: "700" },
  rowSubtitle: { color: COLORS.textSecondary, fontSize: 12, marginTop: 2 },
  offlineStatus: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: SPACING.md, padding: SPACING.sm, borderRadius: RADIUS.md, backgroundColor: "#ECF8F3" },
  offlineText: { flex: 1, color: COLORS.text, fontSize: 12, lineHeight: 17, fontWeight: "600" },
});

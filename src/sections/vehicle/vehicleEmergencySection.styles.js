import { StyleSheet } from "react-native";
import { COLORS, RADIUS, SPACING } from "../../design";

export default StyleSheet.create({
  card: { marginHorizontal: SPACING.lg, marginTop: SPACING.md },
  header: { flexDirection: "row", alignItems: "flex-start", gap: SPACING.md },
  headerIcon: { width: 46, height: 46, borderRadius: RADIUS.md, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.primaryLight },
  headerBody: { flex: 1 },
  title: { color: COLORS.text, fontSize: 17, fontWeight: "800" },
  subtitle: { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18, marginTop: 3 },
  rows: { marginTop: SPACING.md },
  row: { minHeight: 54, flexDirection: "row", alignItems: "center", borderTopWidth: 1, borderTopColor: COLORS.border, paddingVertical: SPACING.sm },
  rowIcon: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.surface },
  rowBody: { flex: 1, marginLeft: SPACING.sm },
  label: { color: COLORS.textSecondary, fontSize: 11, fontWeight: "700" },
  value: { color: COLORS.text, fontSize: 14, fontWeight: "700", marginTop: 2 },
  copyButton: { minHeight: 44, marginTop: SPACING.md, borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.border, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7 },
  copyText: { color: COLORS.primary, fontSize: 13, fontWeight: "800" },
});

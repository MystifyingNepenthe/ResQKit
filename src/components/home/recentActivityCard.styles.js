import { StyleSheet } from "react-native";
import { COLORS, RADIUS, SPACING } from "../../design";

export default StyleSheet.create({
  card: { marginHorizontal: SPACING.lg, marginTop: SPACING.lg },
  row: { flexDirection: "row", alignItems: "center" },
  iconWrap: { width: 44, height: 44, borderRadius: RADIUS.md, backgroundColor: COLORS.surface, alignItems: "center", justifyContent: "center" },
  body: { flex: 1, marginHorizontal: SPACING.md },
  title: { color: COLORS.text, fontSize: 16, fontWeight: "800" },
  description: { color: COLORS.textSecondary, fontSize: 13, lineHeight: 18, marginTop: 3 },
});

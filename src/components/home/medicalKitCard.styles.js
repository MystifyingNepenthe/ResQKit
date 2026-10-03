import { StyleSheet } from "react-native";
import { COLORS, RADIUS, SPACING } from "../../design";

export default StyleSheet.create({
  card: { marginHorizontal: SPACING.lg, marginTop: SPACING.lg },
  pressed: { opacity: 0.82 },
  header: { flexDirection: "row", alignItems: "center" },
  iconWrap: { width: 54, height: 54, borderRadius: RADIUS.lg, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.primaryLight },
  body: { flex: 1, marginLeft: SPACING.md, marginRight: SPACING.sm },
  eyebrow: { color: COLORS.primary, fontSize: 10, letterSpacing: 0.8, fontWeight: "900" },
  title: { color: COLORS.text, fontSize: 17, lineHeight: 22, fontWeight: "800", marginTop: 2 },
  description: { color: COLORS.textSecondary, fontSize: 12, lineHeight: 17, marginTop: 4 },
  footer: { flexDirection: "row", alignItems: "center", marginTop: SPACING.md, paddingTop: SPACING.md, borderTopWidth: 1, borderTopColor: COLORS.border },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.textSecondary },
  statusDotReady: { backgroundColor: COLORS.success },
  footerText: { color: COLORS.textSecondary, fontSize: 12, marginLeft: 7, flex: 1 },
  linkText: { color: COLORS.primary, fontSize: 12, fontWeight: "800" },
});

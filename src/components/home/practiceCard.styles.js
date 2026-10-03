import { StyleSheet } from "react-native";
import { COLORS, RADIUS, SHADOWS, SPACING } from "../../design";

export default StyleSheet.create({
  card: { flexDirection: "row", alignItems: "center", marginHorizontal: SPACING.lg, marginTop: SPACING.lg, padding: SPACING.md, borderRadius: RADIUS.lg, backgroundColor: COLORS.primaryDark, ...SHADOWS.medium },
  pressed: { opacity: 0.84 },
  iconWrap: { width: 48, height: 48, borderRadius: RADIUS.md, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.14)" },
  body: { flex: 1, marginHorizontal: SPACING.md },
  eyebrow: { color: COLORS.primaryLight, fontSize: 10, fontWeight: "800", letterSpacing: 0.7 },
  title: { color: COLORS.white, fontSize: 15, fontWeight: "800", lineHeight: 20, marginTop: 3 },
  subtitle: { color: "rgba(255,255,255,0.82)", fontSize: 12, lineHeight: 17, marginTop: 4 },
});

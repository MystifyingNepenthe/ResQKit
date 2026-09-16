import { StyleSheet } from "react-native";
import { COLORS, RADIUS, SHADOWS, SPACING } from "../../design";

export default StyleSheet.create({
  card: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,

    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.primary,

    ...SHADOWS.medium,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconWrap: {
    width: 48,
    height: 48,

    alignItems: "center",
    justifyContent: "center",

    marginRight: SPACING.md,

    borderRadius: RADIUS.md,
    backgroundColor: "rgba(255,255,255,0.16)",
  },

  body: {
    flex: 1,
  },

  title: {
    color: COLORS.white,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: "800",
  },

  subtitle: {
    marginTop: SPACING.xs,

    color: "rgba(255,255,255,0.90)",
    fontSize: 13,
    lineHeight: 18,
  },

  actionButton: {
    minHeight: 46,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    marginTop: SPACING.md,
    paddingHorizontal: SPACING.md,

    borderRadius: RADIUS.md,
    backgroundColor: COLORS.white,
  },

  actionButtonPressed: {
    opacity: 0.88,
  },

  actionText: {
    marginRight: SPACING.sm,

    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
  },
});

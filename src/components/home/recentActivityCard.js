import { Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import PrimaryCard from "../common/primaryCard";
import useLocale from "../../hooks/useLocale";
import { COLORS } from "../../design";
import styles from "./recentActivityCard.styles";

export default function RecentActivityCard({ record, onPress }) {
  const { language, pick } = useLocale();
  const closedAt = record?.closedAt ? new Date(record.closedAt) : null;
  const hasRecord = Boolean(record && closedAt && !Number.isNaN(closedAt.getTime()));
  const formatted = hasRecord
    ? closedAt.toLocaleString(String(language).toLowerCase().startsWith("en") ? "en-GB" : "ro-RO", { dateStyle: "medium", timeStyle: "short" })
    : null;

  return (
    <Pressable onPress={onPress}>
      <PrimaryCard style={styles.card}>
        <View style={styles.row}>
          <View style={styles.iconWrap}>
            <MaterialCommunityIcons name={hasRecord ? "history" : "clipboard-text-clock-outline"} size={24} color={COLORS.primary} />
          </View>
          <View style={styles.body}>
            <Text style={styles.title}>{pick("Ultima activitate", "Recent activity")}</Text>
            <Text style={styles.description}>
              {hasRecord
                ? pick(`Ultima intervenție încheiată: ${formatted}`, `Last completed intervention: ${formatted}`)
                : pick("Nu ai încă intervenții încheiate. Istoricul va apărea aici.", "You do not have any completed interventions yet. History will appear here.")}
            </Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
        </View>
      </PrimaryCard>
    </Pressable>
  );
}

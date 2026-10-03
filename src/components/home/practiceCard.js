import { Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import useLocale from "../../hooks/useLocale";
import { COLORS } from "../../design";
import styles from "./practiceCard.styles";

export default function PracticeCard({ onPress }) {
  const { pick } = useLocale();

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons name="school-outline" size={28} color={COLORS.white} />
      </View>
      <View style={styles.body}>
        <Text style={styles.eyebrow}>{pick("ÎNVAȚĂ ȘI EXERSEAZĂ", "LEARN & PRACTICE")}</Text>
        <Text style={styles.title}>{pick("Exersează protocoalele înainte de o urgență", "Practice protocols before an emergency")}</Text>
        <Text style={styles.subtitle}>{pick("Folosește aceiași pași fixați ca în modul Intervenție, fără apel 112 și fără salvare în istoric.", "Use the same fixed steps as Intervention mode, without calling 112 or saving to history.")}</Text>
      </View>
      <MaterialCommunityIcons name="arrow-right-circle" size={28} color={COLORS.white} />
    </Pressable>
  );
}

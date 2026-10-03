import { Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import useLocale from "../../hooks/useLocale";
import { COLORS } from "../../design";
import styles from "./quickActionsCard.styles";

function Action({ icon, label, subtitle, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.action, pressed && styles.actionPressed]}
    >
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons name={icon} size={24} color={COLORS.primary} />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={22} color={COLORS.textSecondary} />
    </Pressable>
  );
}

export default function QuickActionsCard({ onFirstAid, onCheckKit }) {
  const { pick } = useLocale();

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{pick("Acțiuni rapide", "Quick actions")}</Text>
      <View style={styles.grid}>
        <Action
          icon="medical-bag"
          label={pick("Prim ajutor", "First aid")}
          subtitle={pick("Deschide ghidurile", "Open first-aid guides")}
          onPress={onFirstAid}
        />
        <Action
          icon="clipboard-check-outline"
          label={pick("Verifică trusa", "Check kit")}
          subtitle={pick("Actualizează componentele", "Update available supplies")}
          onPress={onCheckKit}
        />
      </View>
    </View>
  );
}

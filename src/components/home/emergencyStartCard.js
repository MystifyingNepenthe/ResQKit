import { Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import PrimaryCard from "../common/primaryCard";
import useLocale from "../../hooks/useLocale";
import { COLORS } from "../../design";
import styles from "./emergencyStartCard.styles";

export default function EmergencyStartCard({
  hasActiveIncident = false,
  onPress,
}) {
  const { pick } = useLocale();

  const title = hasActiveIncident
    ? pick("Continuă intervenția", "Continue intervention")
    : pick("Începe o intervenție", "Start an intervention");

  const subtitle = hasActiveIncident
    ? pick(
        "Ai o sesiune activă salvată pe dispozitiv.",
        "You have an active session saved on this device."
      )
    : pick(
        "Triaj rapid și protocoale de prim ajutor pas cu pas.",
        "Quick triage and step-by-step first-aid protocols."
      );

  const actionLabel = hasActiveIncident
    ? pick("Continuă", "Continue")
    : pick("Începe", "Start");

  return (
    <PrimaryCard style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons
            name="car-emergency"
            size={28}
            color={COLORS.white}
          />
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.actionButton,
          pressed && styles.actionButtonPressed,
        ]}
        onPress={onPress}
      >
        <Text style={styles.actionText}>{actionLabel}</Text>
        <MaterialCommunityIcons
          name="arrow-right"
          size={20}
          color={COLORS.primary}
        />
      </Pressable>
    </PrimaryCard>
  );
}

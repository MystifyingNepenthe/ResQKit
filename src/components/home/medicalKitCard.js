import { Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import PrimaryCard from "../common/primaryCard";
import useApp from "../../hooks/useApp";
import useLocale from "../../hooks/useLocale";
import { KIT_ITEMS } from "../../data/kitItems";
import { COLORS } from "../../design";
import styles from "./medicalKitCard.styles";

export default function MedicalKitCard({ onPress }) {
  const { activeKit } = useApp();
  const { language, pick } = useLocale();

  const lastUpdated = activeKit?.lastChecked || activeKit?.updatedAt;
  const formatted = lastUpdated
    ? new Intl.DateTimeFormat(String(language).toLowerCase().startsWith("en") ? "en-GB" : "ro-RO", {
        dateStyle: "medium",
      }).format(new Date(lastUpdated))
    : null;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.pressed]}>
      <PrimaryCard style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconWrap}>
            <MaterialCommunityIcons name="medical-bag" size={28} color={COLORS.primary} />
          </View>
          <View style={styles.body}>
            <Text style={styles.eyebrow}>{pick("TRUSA MEDICALĂ", "MEDICAL KIT")}</Text>
            <Text style={styles.title}>
              {activeKit ? activeKit.label : pick("Configurează trusa ta", "Set up your kit")}
            </Text>
            <Text style={styles.description}>
              {activeKit
                ? pick(
                    `${activeKit.itemCodes?.length || 0} din ${KIT_ITEMS.length} componente disponibile${formatted ? ` · actualizată ${formatted}` : ""}`,
                    `${activeKit.itemCodes?.length || 0} of ${KIT_ITEMS.length} supplies available${formatted ? ` · updated ${formatted}` : ""}`
                  )
                : pick(
                    "Salvează componentele disponibile pentru a fi încărcate automat într-o intervenție.",
                    "Save available supplies so they load automatically during an intervention."
                  )}
            </Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
        </View>

        <View style={styles.footer}>
          <View style={[styles.statusDot, activeKit && styles.statusDotReady]} />
          <Text style={styles.footerText}>
            {activeKit
              ? pick("Trusă activă", "Active kit")
              : pick("Nicio trusă activă", "No active kit")}
          </Text>
          <Text style={styles.linkText}>
            {activeKit
              ? pick("Actualizează componentele", "Update supplies")
              : pick("Configurează", "Set up")}
          </Text>
        </View>
      </PrimaryCard>
    </Pressable>
  );
}

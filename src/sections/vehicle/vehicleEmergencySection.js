import { Alert, Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Clipboard from "expo-clipboard";

import PrimaryCard from "../../components/common/primaryCard";
import useApp from "../../hooks/useApp";
import useLocale from "../../hooks/useLocale";
import { COLORS } from "../../design";
import styles from "./vehicleEmergencySection.styles";

function EmergencyRow({ icon, label, value }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowIcon}>
        <MaterialCommunityIcons name={icon} size={18} color={COLORS.primary} />
      </View>
      <View style={styles.rowBody}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value} numberOfLines={2}>{value || "—"}</Text>
      </View>
    </View>
  );
}

export default function VehicleEmergencySection() {
  const { vehicle, safetyProfile } = useApp();
  const { pick } = useLocale();

  async function copyDetails() {
    const lines = [
      `${pick("Vehicul", "Vehicle")}: ${vehicle?.model || "—"}`,
      `${pick("Număr înmatriculare", "License plate")}: ${vehicle?.plate || "—"}`,
      `VIN: ${vehicle?.vin || "—"}`,
      `${pick("Contact de urgență", "Emergency contact")}: ${safetyProfile?.emergencyContactName || "—"} ${safetyProfile?.emergencyContactPhone || ""}`.trim(),
    ];
    await Clipboard.setStringAsync(lines.join("\n"));
    Alert.alert(pick("Date copiate", "Details copied"), pick("Informațiile vehiculului au fost copiate.", "Vehicle information was copied."));
  }

  return (
    <PrimaryCard style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <MaterialCommunityIcons name="car-info" size={25} color={COLORS.primary} />
        </View>
        <View style={styles.headerBody}>
          <Text style={styles.title}>{pick("Informații pentru urgență", "Emergency information")}</Text>
          <Text style={styles.subtitle}>
            {pick("Date utile pe care le poți transmite rapid în timpul unui incident.", "Useful details you can quickly share during an incident.")}
          </Text>
        </View>
      </View>

      <View style={styles.rows}>
        <EmergencyRow icon="car" label={pick("Vehicul", "Vehicle")} value={vehicle?.model} />
        <EmergencyRow icon="card-account-details-outline" label={pick("Număr înmatriculare", "License plate")} value={vehicle?.plate} />
        <EmergencyRow icon="phone-outline" label={pick("Contact de urgență", "Emergency contact")} value={[safetyProfile?.emergencyContactName, safetyProfile?.emergencyContactPhone].filter(Boolean).join(" · ")} />
      </View>

      <Pressable style={styles.copyButton} onPress={copyDetails}>
        <MaterialCommunityIcons name="content-copy" size={18} color={COLORS.primary} />
        <Text style={styles.copyText}>{pick("Copiază datele", "Copy details")}</Text>
      </Pressable>
    </PrimaryCard>
  );
}

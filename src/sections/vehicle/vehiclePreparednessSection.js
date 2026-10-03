import { Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import PrimaryCard from "../../components/common/primaryCard";
import useApp from "../../hooks/useApp";
import useLocale from "../../hooks/useLocale";
import { COLORS } from "../../design";
import styles from "./vehiclePreparednessSection.styles";

function CheckRow({ complete, title, subtitle }) {
  return (
    <View style={styles.row}>
      <View style={[styles.check, complete && styles.checkComplete]}>
        <MaterialCommunityIcons
          name={complete ? "check" : "minus"}
          size={16}
          color={complete ? COLORS.white : COLORS.textSecondary}
        />
      </View>
      <View style={styles.rowBody}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

export default function VehiclePreparednessSection({ onOpenKit, onOpenAccount }) {
  const { vehicle, activeKit, safetyProfile } = useApp();
  const { pick } = useLocale();

  const vehicleReady = Boolean(vehicle?.model?.trim() && vehicle?.plate?.trim());
  const kitReady = Boolean(activeKit?.itemCodes?.length);
  const contactReady = Boolean(safetyProfile?.emergencyContactName?.trim() && safetyProfile?.emergencyContactPhone?.trim());
  const done = [vehicleReady, kitReady, contactReady, true].filter(Boolean).length;

  return (
    <PrimaryCard style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{pick("Pregătire auto", "Vehicle readiness")}</Text>
          <Text style={styles.subtitle}>{pick(`${done}/4 elemente pregătite`, `${done}/4 items ready`)}</Text>
        </View>
        <View style={styles.scoreBadge}>
          <Text style={styles.scoreText}>{Math.round((done / 4) * 100)}%</Text>
        </View>
      </View>

      <CheckRow
        complete={vehicleReady}
        title={pick("Datele vehiculului", "Vehicle details")}
        subtitle={vehicleReady ? pick("Model și număr completate", "Model and plate completed") : pick("Completează modelul și numărul", "Add model and license plate")}
      />
      <CheckRow
        complete={kitReady}
        title={pick("Trusă medicală activă", "Active medical kit")}
        subtitle={kitReady ? pick(`${activeKit.itemCodes.length} componente salvate`, `${activeKit.itemCodes.length} supplies saved`) : pick("Configurează componentele trusei", "Configure kit supplies")}
      />
      <CheckRow
        complete={contactReady}
        title={pick("Contact de urgență", "Emergency contact")}
        subtitle={contactReady ? pick("Disponibil în profil", "Available in profile") : pick("Adaugă un contact de urgență", "Add an emergency contact")}
      />
      <CheckRow
        complete
        title={pick("Protocoale de prim ajutor", "First-aid protocols")}
        subtitle={pick("Disponibile local în aplicație", "Available locally in the app")}
      />

      <View style={styles.actions}>
        <Pressable style={styles.actionButton} onPress={onOpenKit}>
          <MaterialCommunityIcons name="medical-bag" size={18} color={COLORS.primary} />
          <Text style={styles.actionText}>{pick("Actualizează trusa", "Update kit")}</Text>
        </Pressable>
        {!vehicleReady || !contactReady ? (
          <Pressable style={styles.actionButton} onPress={onOpenAccount}>
            <MaterialCommunityIcons name="account-edit-outline" size={18} color={COLORS.primary} />
            <Text style={styles.actionText}>{pick("Completează datele", "Complete details")}</Text>
          </Pressable>
        ) : null}
      </View>
    </PrimaryCard>
  );
}

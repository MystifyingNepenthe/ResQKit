import { useEffect, useMemo, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Location from "expo-location";

import PrimaryCard from "../common/primaryCard";
import useApp from "../../hooks/useApp";
import useLocale from "../../hooks/useLocale";
import { COLORS } from "../../design";
import styles from "./readinessCard.styles";

function ReadinessRow({ icon, title, subtitle, complete, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <View style={[styles.rowIcon, complete && styles.rowIconComplete]}>
        <MaterialCommunityIcons
          name={complete ? "check" : icon}
          size={18}
          color={complete ? COLORS.white : COLORS.primary}
        />
      </View>
      <View style={styles.rowBody}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowSubtitle}>{subtitle}</Text>
      </View>
      {onPress ? (
        <MaterialCommunityIcons
          name="chevron-right"
          size={22}
          color={COLORS.textSecondary}
        />
      ) : null}
    </Pressable>
  );
}

export default function ReadinessCard({ onOpenSafetyProfile, onOpenConsent }) {
  const { safetyProfile, consent } = useApp();
  const { pick } = useLocale();
  const [locationGranted, setLocationGranted] = useState(false);

  useEffect(() => {
    let alive = true;
    void Location.getForegroundPermissionsAsync()
      .then((result) => {
        if (alive) setLocationGranted(Boolean(result?.granted));
      })
      .catch(() => {
        if (alive) setLocationGranted(false);
      });
    return () => { alive = false; };
  }, []);

  const profileReady = Boolean(safetyProfile?.displayName?.trim());
  const contactReady = Boolean(
    safetyProfile?.emergencyContactName?.trim() &&
    safetyProfile?.emergencyContactPhone?.trim()
  );
  const consentReady = Boolean(consent?.disclaimerAcknowledged);

  const setupChecks = useMemo(
    () => [profileReady, contactReady, locationGranted, consentReady],
    [profileReady, contactReady, locationGranted, consentReady]
  );
  const completedSetupSteps = setupChecks.filter(Boolean).length;
  const totalSetupSteps = setupChecks.length;
  const progress = Math.round((completedSetupSteps / totalSetupSteps) * 100);

  async function requestLocation() {
    let result;
    try {
      result = await Location.requestForegroundPermissionsAsync();
    } catch {
      result = { granted: false };
    }
    setLocationGranted(Boolean(result?.granted));
    if (!result?.granted) {
      Alert.alert(
        pick("Locație indisponibilă", "Location unavailable"),
        pick(
          "Poți activa permisiunea din setările telefonului atunci când vrei să folosești localizarea într-o intervenție.",
          "You can enable permission in your phone settings when you want to use location during an intervention."
        )
      );
    }
  }

  return (
    <PrimaryCard style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            {pick("Pregătire pentru urgență", "Emergency readiness")}
          </Text>
          <Text style={styles.subtitle}>
            {pick(
              "Completează elementele esențiale înainte de a avea nevoie de ele.",
              "Complete the essentials before you need them."
            )}
          </Text>
        </View>
        <View style={styles.progressBadge}>
          <Text style={styles.progressText}>{completedSetupSteps}/{totalSetupSteps}</Text>
        </View>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${completedSetupSteps}/{totalSetupSteps}` }]} />
      </View>

      <View style={styles.rows}>
        <ReadinessRow
          icon="account-heart-outline"
          title={pick("Profil de siguranță", "Safety profile")}
          subtitle={profileReady ? pick("Completat", "Completed") : pick("Adaugă datele de bază", "Add basic information")}
          complete={profileReady}
          onPress={onOpenSafetyProfile}
        />
        <ReadinessRow
          icon="phone-outline"
          title={pick("Contact de urgență", "Emergency contact")}
          subtitle={contactReady ? pick("Completat", "Completed") : pick("Adaugă nume și telefon", "Add a name and phone number")}
          complete={contactReady}
          onPress={onOpenSafetyProfile}
        />
        <ReadinessRow
          icon="map-marker-outline"
          title={pick("Permisiune locație", "Location permission")}
          subtitle={locationGranted ? pick("Activă", "Enabled") : pick("Apasă pentru activare", "Tap to enable")}
          complete={locationGranted}
          onPress={requestLocation}
        />
        <ReadinessRow
          icon="shield-check-outline"
          title={pick("Consimțământ și siguranță", "Consent and safety")}
          subtitle={consentReady ? pick("Confirmat", "Confirmed") : pick("Revizuiește înainte de intervenție", "Review before an intervention")}
          complete={consentReady}
          onPress={onOpenConsent}
        />
      </View>

      <View style={styles.offlineStatus}>
        <MaterialCommunityIcons name="download-circle-outline" size={18} color={COLORS.success} />
        <Text style={styles.offlineText}>
          {pick("Protocoalele fixe sunt disponibile local în aplicație.", "Fixed protocols are available locally in the app.")}
        </Text>
      </View>
    </PrimaryCard>
  );
}

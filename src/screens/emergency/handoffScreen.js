import { useMemo, useState } from "react";
import { Alert, ScrollView, Share, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Chip, Switch, TextInput } from "react-native-paper";
import * as Clipboard from "expo-clipboard";
import * as Location from "expo-location";
import AppScreenHeader from "../../components/common/appScreenHeader/appScreenHeader";
import PrimaryCard from "../../components/common/primaryCard";
import KitScanner from "../../components/emergency/kitScanner";
import useApp from "../../hooks/useApp";
import useLocale from "../../hooks/useLocale";
import { ROUTES } from "../../constants/routes";
import { buildIncidentBrief } from "../../services/briefService";
import { createInstitutionalSession } from "../../services/institutionalService";
import styles from "./emergencyScreen.styles";

export default function HandoffScreen({ navigation }) {
  const { incident, updateIncident, safetyProfile, consent, settings, logInstitutional } = useApp();
  const { language, pick } = useLocale();
  const [locating, setLocating] = useState(false);
  const [locationNote, setLocationNote] = useState(incident?.locationNote || "");
  const brief = useMemo(() => buildIncidentBrief(incident, safetyProfile, Boolean(incident?.includeHealthData), language), [incident, safetyProfile, language]);
  const hazards = [
    ["traffic", pick("trafic", "traffic")],
    ["fire", pick("foc", "fire")],
    ["electricity", pick("curent electric", "electricity")],
    ["gas", pick("gaze", "gas")],
    ["toxic", pick("substanțe toxice", "toxic substances")],
    ["water", pick("apă", "water")],
    ["unstable", pick("obiecte instabile", "unstable objects")],
  ];

  if (!incident) {
    return (
      <SafeAreaView style={styles.container}>
        <AppScreenHeader title={pick("Predare informații", "Handoff")} navigation={navigation} showMenu={false} />
        <View style={styles.content}><Text style={styles.title}>{pick("Nu există o sesiune activă.", "There is no active session.")}</Text></View>
      </SafeAreaView>
    );
  }

  async function captureLocation() {
    setLocating(true);
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== "granted") throw new Error(pick("Permisiunea pentru locație nu a fost acordată.", "Location permission was not granted."));
      const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      updateIncident({ latitude: pos.coords.latitude, longitude: pos.coords.longitude, accuracy: pos.coords.accuracy, locationFixAt: new Date().toISOString() });
    } catch (error) {
      Alert.alert(pick("Locație indisponibilă", "Location unavailable"), error.message);
    } finally {
      setLocating(false);
    }
  }

  async function ensureSession() {
    if (!settings.realDataMode) {
      logInstitutional({ action: "session.create", mode: "simulated", detail: pick("Mod simulat: nu s-au trimis date către backend.", "Simulated mode: no data were sent to the backend."), ok: true });
      return null;
    }
    if (incident.backendSessionId) return incident.backendSessionId;
    try {
      const active = incident.victims?.find((v) => v.id === incident.activeVictimId) || incident.victims?.[0];
      const session = await createInstitutionalSession(active?.situation || null);
      updateIncident({ backendSessionId: session.id, sessionCode: session.join_code || null });
      logInstitutional({ action: "session.create", mode: "real", detail: pick(`Sesiune ${session.id} creată`, `Session ${session.id} created`), ok: true });
      return session.id;
    } catch (error) {
      logInstitutional({ action: "session.create", mode: "real", detail: error.message, ok: false });
      Alert.alert(pick("Backend indisponibil", "Backend unavailable"), error.message);
      return null;
    }
  }

  function toggleHazard(id) {
    const current = incident.hazards || [];
    const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
    updateIncident({ hazards: next });
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppScreenHeader title={pick("Predă informațiile", "Handoff information")} navigation={navigation} showMenu={false} showNotifications={false} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>{pick("Echipajul a sosit, predă ce știi", "The crew has arrived — hand over what you know")}</Text>
        <Text style={styles.subtitle}>{pick("Rezumatul este construit automat numai din informațiile înregistrate în sesiune.", "The summary is built automatically only from information recorded in this session.")}</Text>

        <PrimaryCard style={{ marginTop: 24, marginBottom: 16 }}>
          <Text style={styles.sectionTitle}>{pick("Locație", "Location")}</Text>
          <Text style={styles.muted}>{incident.latitude != null ? `${Number(incident.latitude).toFixed(5)}, ${Number(incident.longitude).toFixed(5)}${incident.accuracy ? ` · ±${Math.round(incident.accuracy)} m` : ""}` : pick("Nu există încă o poziție GPS.", "No GPS position has been recorded yet.")}</Text>
          <Button style={{ marginTop: 10 }} mode="outlined" icon="crosshairs-gps" loading={locating} onPress={captureLocation}>{pick("Actualizează locația", "Update location")}</Button>
          <TextInput style={{ marginTop: 12 }} mode="outlined" label={pick("Reper / descriere locație", "Landmark / location description")} value={locationNote} onChangeText={setLocationNote} onBlur={() => updateIncident({ locationNote: locationNote.trim() })} />
        </PrimaryCard>

        <PrimaryCard style={{ marginBottom: 16 }}>
          <Text style={styles.sectionTitle}>{pick("Pericole observate", "Observed hazards")}</Text>
          <View style={styles.chips}>
            {hazards.map(([id, label]) => <Chip key={id} selected={(incident.hazards || []).includes(id)} onPress={() => toggleHazard(id)}>{label}</Chip>)}
          </View>
        </PrimaryCard>

        <PrimaryCard style={{ marginBottom: 16 }}>
          <KitScanner context="other" selected={incident.kitItems || []} onChange={(items, source) => updateIncident({ kitItems: items, kitSource: source })} />
          <TextInput style={{ marginTop: 12 }} mode="outlined" label={pick("Materiale selectate manual (separate prin virgulă)", "Manually selected materials (comma-separated)")} value={(incident.kitItems || []).join(", ")} onChangeText={(value) => updateIncident({ kitItems: value.split(",").map((item) => item.trim()).filter(Boolean), kitSource: "manual" })} />
        </PrimaryCard>

        <PrimaryCard style={{ marginBottom: 16 }}>
          <View style={styles.row}>
            <View style={styles.flex}>
              <Text style={styles.listTitle}>{pick("Include datele medicale din profil", "Include health data from profile")}</Text>
              <Text style={styles.listDescription}>{consent.healthDataConsent ? pick("Partajarea este controlată separat pentru această sesiune.", "Sharing is controlled separately for this session.") : pick("Necesită consimțământ pentru date medicale.", "Requires consent for health data.")}</Text>
            </View>
            <Switch disabled={!consent.healthDataConsent} value={Boolean(incident.includeHealthData)} onValueChange={(value) => updateIncident({ includeHealthData: value })} />
          </View>
        </PrimaryCard>

        <PrimaryCard style={{ marginBottom: 16 }}>
          <Text style={styles.sectionTitle}>{pick("Rezumat automat", "Automatic summary")}</Text>
          <Text selectable style={styles.code}>{brief}</Text>
          <View style={styles.actions}>
            <Button mode="outlined" icon="content-copy" onPress={async () => { await Clipboard.setStringAsync(brief); Alert.alert(pick("Copiat", "Copied"), pick("Rezumatul a fost copiat.", "The summary was copied.")); }}>{pick("Copiază", "Copy")}</Button>
            <Button mode="outlined" icon="share-variant" onPress={() => Share.share({ message: brief })}>{pick("Partajează", "Share")}</Button>
          </View>
        </PrimaryCard>

        {settings.realDataMode ? (
          <PrimaryCard style={{ marginBottom: 16 }}>
            <Text style={styles.sectionTitle}>{pick("Sesiune instituțională de prototip", "Prototype institutional session")}</Text>
            <Text style={styles.muted}>{pick("Acest mod comunică doar cu backend-ul ResQKit. Nu reprezintă o conexiune reală la infrastructura 112.", "This mode communicates only with the ResQKit backend. It is not a real connection to 112 infrastructure.")}</Text>
            <Button style={{ marginTop: 12 }} mode="outlined" onPress={ensureSession}>{incident.backendSessionId ? `${pick("Sesiune", "Session")}: ${incident.sessionCode || incident.backendSessionId}` : pick("Creează sesiune backend", "Create backend session")}</Button>
          </PrimaryCard>
        ) : null}

        <View style={styles.actions}>
          <Button mode="outlined" onPress={() => navigation.navigate(ROUTES.VICTIMS)}>{pick("Gestionează victimele", "Manage people")}</Button>
          <Button mode="outlined" icon="comment-text-outline" onPress={() => navigation.navigate(ROUTES.INTERVIEW)}>{pick("Interviu opțional pentru raport", "Optional report interview")}</Button>
          <Button mode="contained" onPress={() => navigation.navigate(ROUTES.REPORT)}>{pick("Generează raportul", "Generate report")}</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

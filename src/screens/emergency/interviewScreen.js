import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, TextInput } from "react-native-paper";
import AppScreenHeader from "../../components/common/appScreenHeader/appScreenHeader";
import useApp from "../../hooks/useApp";
import useLocale from "../../hooks/useLocale";
import { getInterviewPrompts, generateCEIM } from "../../services/ceimService";
import { appendSessionEvent } from "../../services/institutionalService";
import { ROUTES } from "../../constants/routes";
import styles from "./emergencyScreen.styles";

export default function InterviewScreen({ navigation }) {
  const { incident, updateIncident, settings, logInstitutional } = useApp();
  const { language, pick } = useLocale();
  const prompts = getInterviewPrompts(language);
  const initial = Object.fromEntries((incident?.interviewAnswers || []).map((a) => [a.promptId, a.answerText]));
  const [answers, setAnswers] = useState(initial);
  const [loading, setLoading] = useState(false);

  async function generate() {
    if (!incident) return;
    const interviewAnswers = prompts.map((prompt) => ({ promptId: prompt.id, promptText: prompt.prompt, answerText: (answers[prompt.id] || "").trim(), answeredAt: new Date().toISOString() })).filter((item) => item.answerText);
    const updated = { ...incident, interviewAnswers };
    updateIncident({ interviewAnswers });
    setLoading(true);
    try {
      const result = await generateCEIM(updated);
      updateIncident({ ceimReport: result.ceim, ceimDegraded: Boolean(result.degraded), ceimGeneratedAt: new Date().toISOString() });
      if (settings.realDataMode && incident.backendSessionId) {
        await appendSessionEvent(incident.backendSessionId, "ceim_report_generated", { ceim: result.ceim, degraded: result.degraded });
        logInstitutional({ action: "ceim.generate", mode: "real", detail: pick("Raport CEIM generat și logat", "CEIM report generated and logged"), ok: true });
      } else {
        logInstitutional({ action: "ceim.generate", mode: "simulated", detail: pick("Raport CEIM generat; nu a fost trimis într-o sesiune instituțională", "CEIM report generated; it was not sent in an institutional session"), ok: true });
      }
      navigation.replace(ROUTES.REPORT);
    } catch (error) {
      Alert.alert(pick("Raport indisponibil", "Report unavailable"), error.message || pick("Nu s-a putut genera raportul. Poți continua la rezumatul determinist.", "The report could not be generated. You can continue to the deterministic summary."));
      navigation.navigate(ROUTES.REPORT);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppScreenHeader title={pick("Interviu pentru raport", "Report interview")} navigation={navigation} showMenu={false} showNotifications={false} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>{pick("Detalii opționale despre scenă", "Optional scene details")}</Text>
        <Text style={styles.subtitle}>{pick("Întrebările sunt fixe. Răspunsurile libere sunt folosite doar pentru structurarea raportului CEIM; nu modifică protocolul medical.", "The questions are fixed. Free-text answers are used only to structure the CEIM report; they do not change the medical protocol.")}</Text>
        <View style={{ marginTop: 24 }}>
          {prompts.map((prompt) => (
            <View key={prompt.id} style={styles.card}>
              <Text style={styles.listTitle}>{prompt.prompt}</Text>
              <TextInput style={{ marginTop: 10 }} mode="outlined" multiline value={answers[prompt.id] || ""} onChangeText={(value) => setAnswers((prev) => ({ ...prev, [prompt.id]: value }))} placeholder={pick("Opțional", "Optional")} />
            </View>
          ))}
        </View>
        <Button mode="contained" loading={loading} disabled={loading} onPress={generate}>{pick("Generează CEIM", "Generate CEIM")}</Button>
        <Button style={{ marginTop: 8 }} mode="text" onPress={() => navigation.navigate(ROUTES.REPORT)}>{pick("Sari peste interviu", "Skip interview")}</Button>
      </ScrollView>
    </SafeAreaView>
  );
}

import { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Checkbox, ProgressBar } from "react-native-paper";
import EmergencyScreenHeader from "../../components/emergency/emergencyScreenHeader/emergencyScreenHeader";
import Emergency112Banner from "../../components/emergency/emergency112Banner";
import useApp from "../../hooks/useApp";
import useLocale from "../../hooks/useLocale";
import { TRIAGE_INJURIES } from "../../utils/triage";
import { COLORS } from "../../design";
import styles from "./emergencyScreen.styles";

export default function TriageScreen({ navigation }) {
  const { incident, updateActiveVictim } = useApp();
  const { language, pick } = useLocale();
  const active = incident?.victims?.find((v) => v.id === incident.activeVictimId) || incident?.victims?.[0];
  const [step, setStep] = useState(0);
  const [responsive, setResponsive] = useState(active?.responsive || "");
  const [breathing, setBreathing] = useState(active?.breathing || "");
  const [injuries, setInjuries] = useState(active?.injuries || []);
  const options = useMemo(() => TRIAGE_INJURIES.map((item) => ({ ...item, label: language === "en" ? item.en : item.ro })), [language]);

  function saveAndClose() {
    updateActiveVictim({
      responsive,
      breathing,
      injuries,
      chokingFlag: injuries.includes("choking") ? "yes" : "no",
      bleedingFlag: injuries.includes("bleeding") ? "yes" : "no",
      triageUpdatedAt: new Date().toISOString(),
    });
    navigation.goBack();
  }

  function answerResponsive(value) { setResponsive(value); setStep(1); }
  function answerBreathing(value) { setBreathing(value); setStep(2); }
  function toggleInjury(value) {
    if (value === "unknown") {
      setInjuries(injuries.includes("unknown") ? [] : ["unknown"]);
      return;
    }
    const withoutUnknown = injuries.filter((item) => item !== "unknown");
    setInjuries(withoutUnknown.includes(value) ? withoutUnknown.filter((item) => item !== value) : [...withoutUnknown, value]);
  }

  const choice = (value, label, selected, onPress, danger = false) => (
    <Button
      key={value}
      mode={selected ? "contained" : "outlined"}
      buttonColor={selected && danger ? COLORS.error : undefined}
      style={{ flex: 1 }}
      contentStyle={{ minHeight: 52 }}
      onPress={onPress}
    >
      {label}
    </Button>
  );

  return (
    <SafeAreaView style={styles.container}>
      <EmergencyScreenHeader title={pick("Triaj rapid", "Quick triage")} navigation={navigation} showMenu={false} showNotifications={false} />
      <Emergency112Banner />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>{pick("Pas", "Step")} {step + 1}/3</Text>
        <ProgressBar progress={(step + 1) / 3} color={COLORS.primary} style={{ height: 7, borderRadius: 6, marginBottom: 22 }} />

        {step === 0 ? (
          <>
            <Text style={styles.title}>{pick("Victima răspunde când o strigi și o atingi ușor?", "Does the person respond when you shout and tap them?")}</Text>
            <View style={[styles.row, { marginTop: 24 }]}> 
              {choice("yes", pick("Da", "Yes"), responsive === "yes", () => answerResponsive("yes"))}
              {choice("no", pick("Nu", "No"), responsive === "no", () => answerResponsive("no"), true)}
              {choice("unsure", pick("Nu știu", "Unsure"), responsive === "unsure", () => answerResponsive("unsure"))}
            </View>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <Text style={styles.title}>{pick("Respiră normal?", "Are they breathing normally?")}</Text>
            <Text style={styles.subtitle}>{pick("Respirația anormală sau gâfâitul nu se consideră respirație normală.", "Abnormal gasping is not normal breathing.")}</Text>
            <View style={[styles.row, { marginTop: 24 }]}> 
              {choice("yes", pick("Da", "Yes"), breathing === "yes", () => answerBreathing("yes"))}
              {choice("no", pick("Nu", "No"), breathing === "no", () => answerBreathing("no"), true)}
              {choice("unsure", pick("Nu știu", "Unsure"), breathing === "unsure", () => answerBreathing("unsure"))}
            </View>
            <Button style={{ marginTop: 16 }} mode="text" onPress={() => setStep(0)}>{pick("Înapoi", "Back")}</Button>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <Text style={styles.title}>{pick("Ce observi?", "What do you see?")}</Text>
            <Text style={styles.subtitle}>{pick("Poți selecta mai multe. Aceste răspunsuri sunt folosite pentru ordonarea deterministă a victimelor, fără AI.", "You can select more than one. These answers are used for deterministic victim prioritization, without AI.")}</Text>
            <View style={{ marginTop: 20 }}>
              {options.map((option) => {
                const checked = injuries.includes(option.id);
                return (
                  <View key={option.id} style={[styles.card, { flexDirection: "row", alignItems: "center", paddingVertical: 8 }]}> 
                    <Checkbox status={checked ? "checked" : "unchecked"} onPress={() => toggleInjury(option.id)} />
                    <Text style={[styles.value, { flex: 1 }]} onPress={() => toggleInjury(option.id)}>{option.label}</Text>
                  </View>
                );
              })}
            </View>
            <Button mode="contained" disabled={!injuries.length} onPress={saveAndClose}>{pick("Salvează triajul", "Save triage")}</Button>
            <Button style={{ marginTop: 8 }} mode="text" onPress={() => setStep(1)}>{pick("Înapoi", "Back")}</Button>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

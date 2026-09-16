import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppScreenHeader from "../../components/common/appScreenHeader/appScreenHeader";
import Emergency112Banner from "../../components/emergency/emergency112Banner";
import EmergencyChoiceCard from "../../components/emergency/emergencyChoiceCard";
import useApp from "../../hooks/useApp";
import useLocale from "../../hooks/useLocale";
import { getSituationStart, getSituations } from "../../data/protocols/protocolData";
import { ROUTES } from "../../constants/routes";
import styles from "./emergencyScreen.styles";

export default function SituationSelectionScreen({ navigation }) {
  const { incident, updateActiveVictim } = useApp();
  const { language, pick } = useLocale();
  const active = incident?.victims?.find((v) => v.id === incident.activeVictimId) || incident?.victims?.[0];
  const situations = getSituations(language);

  function choose(situation) {
    const protocolNodeId = getSituationStart(situation, active?.ageProfile || "adult");
    updateActiveVictim({ situation, protocolNodeId, status: "in_progress" });
    navigation.navigate(incident?.kitReviewedAt ? ROUTES.PROTOCOL : ROUTES.KIT_PREPARATION, { nextRoute: ROUTES.PROTOCOL });
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppScreenHeader title={pick("Tipul situației", "Situation type")} navigation={navigation} showMenu={false} showNotifications={false} />
      <Emergency112Banner />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{pick("Ce s-a întâmplat?", "What happened?")}</Text>
        <Text style={styles.subtitle}>{pick("Alege ce se potrivește cel mai bine. Dacă nu ești sigur, prima opțiune acoperă și cazurile neclare.", "Choose the option that fits best. If you are not sure, the first option also covers unclear situations.")}</Text>
        <Text style={styles.sectionTitle}>{active?.label || pick("Victima", "Person")}</Text>
        {situations.map((item, index) => (
          <EmergencyChoiceCard key={item.id} icon={item.icon} title={item.label} danger={index === 0} onPress={() => choose(item.id)} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

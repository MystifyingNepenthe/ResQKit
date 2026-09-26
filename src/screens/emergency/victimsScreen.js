import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import EmergencyScreenHeader from "../../components/emergency/emergencyScreenHeader/emergencyScreenHeader";
import Emergency112Banner from "../../components/emergency/emergency112Banner";
import PrimaryCard from "../../components/common/primaryCard";
import useApp from "../../hooks/useApp";
import useLocale from "../../hooks/useLocale";
import { rankVictims, urgencyLabel, victimUrgencyRank } from "../../utils/triage";
import { ROUTES } from "../../constants/routes";
import styles from "./emergencyScreen.styles";

export default function VictimsScreen({ navigation }) {
  const { incident, addVictim, selectVictim } = useApp();
  const { language, pick } = useLocale();
  const ranked = rankVictims(incident?.victims || []);

  function open(victim) {
    selectVictim(victim.id);
    if (!victim.ageProfile) navigation.navigate(ROUTES.AGE_SELECTION);
    else if (!victim.situation) navigation.navigate(ROUTES.SITUATION_SELECTION);
    else navigation.navigate(ROUTES.PROTOCOL);
  }

  function triage(victim) {
    selectVictim(victim.id);
    navigation.navigate(ROUTES.TRIAGE);
  }

  return (
    <SafeAreaView style={styles.container}>
      <EmergencyScreenHeader title={pick("Victime", "People")} navigation={navigation} showMenu={false} showNotifications={false} />
      <Emergency112Banner />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{pick("Victimele din această sesiune", "People in this session")}</Text>
        <Text style={styles.subtitle}>{pick("Ordinea este calculată determinist din triaj: lipsa respirației, lipsa răspunsului, sufocarea sau hemoragia urcă victima în listă. AI-ul nu stabilește prioritatea.", "The order is calculated deterministically from triage: absent breathing, unresponsiveness, choking, or heavy bleeding move a person higher in the list. AI does not set priority.")}</Text>

        <View style={{ marginTop: 24 }}>
          {ranked.map((victim, index) => {
            const rank = victimUrgencyRank(victim);
            return (
              <PrimaryCard key={victim.id} style={{ marginBottom: 12 }}>
                <View style={styles.row}>
                  <View style={styles.flex}>
                    <Text style={styles.listTitle}>#{index + 1} · {victim.label || `${pick("Victima", "Person")} ${victim.number}`}</Text>
                    <Text style={styles.listDescription}>{urgencyLabel(rank, language)} · {victim.ageProfile || pick("vârstă nealeasă", "age not selected")} · {victim.situation || pick("situație nealeasă", "situation not selected")}</Text>
                  </View>
                  <View style={styles.badge}><Text style={styles.badgeText}>{victim.status}</Text></View>
                </View>
                <View style={[styles.actions, { marginTop: 12 }]}>
                  <Button mode="outlined" icon="clipboard-pulse-outline" onPress={() => triage(victim)}>{pick("Triaj rapid", "Quick triage")}</Button>
                  <Button mode="contained" icon="arrow-right" onPress={() => open(victim)}>{pick("Deschide protocolul", "Open protocol")}</Button>
                </View>
              </PrimaryCard>
            );
          })}
        </View>

        <Button mode="outlined" icon="account-plus" onPress={() => {
          addVictim();
          Alert.alert(
            pick("Victimă adăugată", "Person added"),
            pick("Completează vârsta și situația pentru noua victimă. Poți face și triajul rapid din lista victimelor.", "Select the age and situation for the new person. You can also run quick triage from the people list."),
            [{ text: pick("Continuă", "Continue"), onPress: () => navigation.navigate(ROUTES.AGE_SELECTION) }]
          );
        }}>{pick("Adaugă o victimă", "Add a person")}</Button>
        <Button style={{ marginTop: 12 }} mode="contained" onPress={() => navigation.navigate(ROUTES.HANDOFF)}>{pick("Mergi la predarea informațiilor", "Go to handoff")}</Button>
      </ScrollView>
    </SafeAreaView>
  );
}

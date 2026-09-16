import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import AppScreenHeader from "../../components/common/appScreenHeader/appScreenHeader";
import EmergencyChoiceCard from "../../components/emergency/emergencyChoiceCard";
import useApp from "../../hooks/useApp";
import useLocale from "../../hooks/useLocale";
import { ROUTES } from "../../constants/routes";
import styles from "./emergencyScreen.styles";

export default function VictimsScreen({ navigation }) {
  const { incident, addVictim, selectVictim } = useApp();
  const { pick } = useLocale();

  function open(victim) {
    selectVictim(victim.id);
    if (!victim.ageProfile) navigation.navigate(ROUTES.AGE_SELECTION);
    else if (!victim.situation) navigation.navigate(ROUTES.SITUATION_SELECTION);
    else navigation.navigate(ROUTES.PROTOCOL);
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppScreenHeader title={pick("Victime", "People")} navigation={navigation} showMenu={false} showNotifications={false} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{pick("Victimele din această sesiune", "People in this session")}</Text>
        <Text style={styles.subtitle}>{pick("Fiecare victimă își păstrează separat vârsta, situația și progresul în protocol.", "Each person keeps a separate age profile, situation, and protocol progress.")}</Text>
        <View style={{ marginTop: 24 }}>
          {(incident?.victims || []).map((victim) => (
            <EmergencyChoiceCard
              key={victim.id}
              icon={victim.status === "done" ? "check-circle-outline" : "account-injury-outline"}
              title={victim.label}
              description={`${victim.ageProfile || pick("vârstă nealeasă", "age not selected")} · ${victim.situation || pick("situație nealeasă", "situation not selected")} · ${victim.status}`}
              selected={victim.id === incident?.activeVictimId}
              onPress={() => open(victim)}
            />
          ))}
        </View>
        <Button mode="outlined" icon="account-plus" onPress={() => { addVictim(); Alert.alert(pick("Victimă adăugată", "Person added"), pick("Completează vârsta și situația pentru noua victimă.", "Select the age and situation for the new person."), [{ text: pick("Continuă", "Continue"), onPress: () => navigation.navigate(ROUTES.AGE_SELECTION) }]); }}>{pick("Adaugă o victimă", "Add a person")}</Button>
        <Button style={{ marginTop: 12 }} mode="contained" onPress={() => navigation.navigate(ROUTES.HANDOFF)}>{pick("Mergi la predarea informațiilor", "Go to handoff")}</Button>
      </ScrollView>
    </SafeAreaView>
  );
}

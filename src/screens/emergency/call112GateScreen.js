import { useEffect } from "react";
import { Alert, Linking, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AppScreenHeader from "../../components/common/appScreenHeader/appScreenHeader";
import useApp from "../../hooks/useApp";
import useLocale from "../../hooks/useLocale";
import { ROUTES } from "../../constants/routes";
import { COLORS } from "../../design";
import styles from "./emergencyScreen.styles";

export default function Call112GateScreen({ navigation }) {
  const { incident, startIncident, updateIncident } = useApp();
  const { pick } = useLocale();
  useEffect(() => {
    if (!incident) startIncident();
  }, [incident, startIncident]);

  const current = incident;

  function continueFlow(status) {
    updateIncident({ called112: status, called112At: new Date().toISOString() });
    navigation.replace(ROUTES.CONTEXT_SELECTION);
  }

  async function call112() {
    updateIncident({ called112: "called", called112At: new Date().toISOString() });
    try {
      await Linking.openURL("tel:112");
    } catch {
      Alert.alert(
        pick("Sună la 112", "Call 112"),
        pick("Telefonul nu a putut porni apelul automat. Apelează manual 112.", "The phone could not start the call automatically. Dial 112 manually.")
      );
    }
  }

  const confirmed = current?.called112 === "called" || current?.called112 === "already_called";

  return (
    <SafeAreaView style={styles.container}>
      <AppScreenHeader title={pick("Apel de urgență", "Emergency call")} navigation={navigation} showMenu={false} showNotifications={false} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={[styles.heroIcon, { backgroundColor: "#FDECEC" }]}>
            <MaterialCommunityIcons name="phone-alert" size={44} color={COLORS.error} />
          </View>
          <Text style={styles.title}>{pick("A fost apelat 112?", "Has 112 been called?")}</Text>
          <Text style={styles.subtitle}>{pick("Confirmă apelul înainte de a continua evaluarea. Poți reveni în aplicație după ce deschizi apelul.", "Confirm the emergency call before continuing the assessment. You can return to the app after opening the call.")}</Text>
        </View>

        <View style={styles.actions}>
          <Button mode="contained" buttonColor={COLORS.error} icon="phone" contentStyle={{ minHeight: 56 }} onPress={call112}>
            {pick("Sună acum la 112", "Call 112 now")}
          </Button>
          <Button mode="outlined" contentStyle={{ minHeight: 52 }} onPress={() => continueFlow("already_called")}>
            {pick("Da, 112 a fost deja apelat", "Yes, 112 was already called")}
          </Button>
          {confirmed ? (
            <Button mode="contained" icon="arrow-right" contentStyle={{ minHeight: 52 }} onPress={() => navigation.replace(ROUTES.CONTEXT_SELECTION)}>
              {pick("Continuă evaluarea", "Continue assessment")}
            </Button>
          ) : null}
        </View>

        <View style={styles.noteBox}>
          <Text style={styles.noteText}>{pick("Aplicația nu este conectată direct la infrastructura 112. Butonul deschide funcția de apel a telefonului.", "The app is not directly connected to 112 infrastructure. The button opens the phone dialer.")}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

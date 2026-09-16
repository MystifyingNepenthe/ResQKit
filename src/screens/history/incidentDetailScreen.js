import { useEffect, useState } from "react";
import { Alert, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import AppScreenHeader from "../../components/common/appScreenHeader/appScreenHeader";
import PrimaryCard from "../../components/common/primaryCard";
import useApp from "../../hooks/useApp";
import useLocale from "../../hooks/useLocale";
import { deleteArchivedIncident, getArchivedIncident } from "../../services/incidentService";
import styles from "../emergency/emergencyScreen.styles";

export default function IncidentDetailScreen({ navigation, route }) {
  const { retainedIncidents, deleteRetained } = useApp();
  const { pick } = useLocale();
  const { source = "local", id } = route.params || {};
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    void (async () => {
      try {
        const value = source === "local" ? retainedIncidents.find((item) => item.id === id) : await getArchivedIncident(id);
        if (alive) setRecord(value || null);
      } catch (error) { Alert.alert(pick("Incident", "Incident"), error.message); }
      finally { if (alive) setLoading(false); }
    })();
    return () => { alive = false; };
  }, [id, retainedIncidents, source, pick]);

  async function remove() {
    try {
      if (source === "local") await deleteRetained(id);
      else await deleteArchivedIncident(id);
      navigation.goBack();
    } catch (error) { Alert.alert(pick("Ștergere eșuată", "Delete failed"), error.message); }
  }

  const display = source === "local" ? record?.incident : record;
  return (
    <SafeAreaView style={styles.container}>
      <AppScreenHeader title={pick("Detalii incident", "Incident details")} navigation={navigation} showMenu={false} />
      <ScrollView contentContainerStyle={styles.content}>
        {loading ? <Text style={styles.muted}>{pick("Se încarcă...", "Loading...")}</Text> : !display ? <Text style={styles.title}>{pick("Incidentul nu mai este disponibil.", "This incident is no longer available.")}</Text> : <PrimaryCard><Text selectable style={styles.code}>{JSON.stringify(display, null, 2)}</Text></PrimaryCard>}
        {display ? <Button style={{ marginTop: 16 }} mode="outlined" textColor="#E74C3C" onPress={() => Alert.alert(pick("Ștergi incidentul?", "Delete this incident?"), pick("Această acțiune nu poate fi anulată.", "This action cannot be undone."), [{ text: pick("Anulează", "Cancel") }, { text: pick("Șterge", "Delete"), style: "destructive", onPress: remove }])}>{pick("Șterge incidentul", "Delete incident")}</Button> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

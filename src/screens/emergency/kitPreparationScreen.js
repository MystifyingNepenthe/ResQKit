import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import EmergencyScreenHeader from "../../components/emergency/emergencyScreenHeader/emergencyScreenHeader";
import Emergency112Banner from "../../components/emergency/emergency112Banner";
import KitScanner from "../../components/emergency/kitScanner";
import KitItemSelector from "../../components/emergency/kitItemSelector";
import PrimaryCard from "../../components/common/primaryCard";
import useApp from "../../hooks/useApp";
import useLocale from "../../hooks/useLocale";
import { KIT_ITEMS } from "../../data/kitItems";
import { ROUTES } from "../../constants/routes";
import { COLORS } from "../../design";
import styles from "./emergencyScreen.styles";

export default function KitPreparationScreen({ navigation, route }) {
  const { incident, updateIncident, activeKit } = useApp();
  const { language, pick } = useLocale();
  const nextRoute = route?.params?.nextRoute || ROUTES.PROTOCOL;
  const selected = incident?.kitItems || [];

  useEffect(() => {
    if (!incident || !activeKit) return;
    const alreadyLinked = incident.activeKitId === activeKit.id;
    if (alreadyLinked || (incident.kitItems || []).length > 0) return;

    updateIncident({
      kitItems: [...(activeKit.itemCodes || [])],
      kitSource: "saved_kit",
      kitReviewedAt: activeKit.lastChecked || activeKit.updatedAt || new Date().toISOString(),
      activeKitId: activeKit.id,
      activeKitLabel: activeKit.label,
    });
  }, [incident?.id, activeKit?.id]);

  function toggle(code) {
    const next = selected.includes(code)
      ? selected.filter((item) => item !== code)
      : [...selected, code];

    updateIncident({
      kitItems: next,
      kitSource: "session_manual",
      kitReviewedAt: new Date().toISOString(),
    });
  }

  function continueToProtocol() {
    updateIncident({ kitReviewedAt: new Date().toISOString() });
    navigation.replace(nextRoute);
  }

  return (
    <SafeAreaView style={styles.container}>
      <EmergencyScreenHeader
        title={pick("Materiale disponibile", "Available supplies")}
        navigation={navigation}
        showMenu={false}
        showNotifications={false}
      />
      <Emergency112Banner />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          {activeKit
            ? pick("Am încărcat trusa ta activă", "Your active kit is loaded")
            : pick("Ce materiale ai la îndemână?", "What supplies do you have?")}
        </Text>
        <Text style={styles.subtitle}>
          {activeKit
            ? pick(
                "Componentele salvate în cont sunt folosite automat pentru această sesiune. Le poți modifica doar pentru incidentul curent fără să schimbi trusa salvată.",
                "Supplies saved in your account are used automatically for this session. You can change them for the current incident without changing the saved kit."
              )
            : pick(
                "Nu ai încă o trusă activă salvată. Poți selecta manual materialele sau le poți identifica folosind camera.",
                "You do not have an active saved kit yet. You can select supplies manually or identify them using the camera."
              )}
        </Text>

        {activeKit ? (
          <PrimaryCard style={{ marginTop: 20, marginBottom: 16, borderWidth: 1, borderColor: COLORS.primary }}>
            <View style={[styles.row, { alignItems: "center" }]}>
              <View style={{ width: 42, height: 42, borderRadius: 14, backgroundColor: COLORS.primaryLight, alignItems: "center", justifyContent: "center", marginRight: 12 }}>
                <MaterialCommunityIcons name="medical-bag" size={23} color={COLORS.primary} />
              </View>
              <View style={styles.flex}>
                <Text style={styles.listTitle}>{activeKit.label}</Text>
                <Text style={styles.listDescription}>
                  {pick(
                    `${selected.length} din ${KIT_ITEMS.length} componente încărcate`,
                    `${selected.length} of ${KIT_ITEMS.length} supplies loaded`
                  )}
                </Text>
              </View>
              <MaterialCommunityIcons name="check-circle" size={24} color={COLORS.success} />
            </View>
          </PrimaryCard>
        ) : null}

        <PrimaryCard style={{ marginBottom: 16, marginTop: activeKit ? 0 : 20 }}>
          <Text style={styles.sectionTitle}>{pick("Verifică sau completează cu camera", "Review or add with camera")}</Text>
          <KitScanner
            context={incident?.context || "other"}
            selected={selected}
            onChange={(items, source) =>
              updateIncident({
                kitItems: items,
                kitSource: source === "camera" ? "session_camera" : source,
                kitReviewedAt: new Date().toISOString(),
              })
            }
          />
        </PrimaryCard>

        <PrimaryCard style={{ marginBottom: 16 }}>
          <Text style={styles.sectionTitle}>
            {pick("Componente disponibile în această sesiune", "Supplies available in this session")}
          </Text>
          <Text style={styles.muted}>
            {pick(
              "Apasă pentru a adăuga sau elimina temporar un material. Trusa salvată nu este modificată.",
              "Tap to temporarily add or remove a supply. Your saved kit is not changed."
            )}
          </Text>
          <KitItemSelector
            selected={selected}
            onToggle={toggle}
            language={language}
          />
        </PrimaryCard>

        <View style={styles.actions}>
          <Button
            mode="contained"
            buttonColor={COLORS.primary}
            icon="arrow-right"
            contentStyle={{ minHeight: 54 }}
            onPress={continueToProtocol}
          >
            {pick("Continuă la protocol", "Continue to protocol")}
          </Button>
          {!activeKit ? (
            <Button mode="text" textColor={COLORS.primary} onPress={continueToProtocol}>
              {pick("Continuă fără materiale", "Continue without supplies")}
            </Button>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

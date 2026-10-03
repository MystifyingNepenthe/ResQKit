import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import AppScreenHeader from "../../components/common/appScreenHeader/appScreenHeader";
import PrimaryCard from "../../components/common/primaryCard";
import PrimaryButton from "../../components/buttons/primaryButtons";
import useApp from "../../hooks/useApp";
import useLocale from "../../hooks/useLocale";
import { getKitItemLabel } from "../../data/kitItems";
import { ROUTES } from "../../constants/routes";
import { COLORS } from "../../design";
import styles from "./registeredKitsScreen.styles";

export default function RegisteredKitsScreen({ navigation }) {
  const {
    registeredKits,
    activeKitId,
    setActiveKitId,
    deleteRegisteredKitLocal,
  } = useApp();
  const { language, pick } = useLocale();

  function removeKit(kit) {
    Alert.alert(
      pick("Ștergi trusa?", "Delete kit?"),
      kit.label,
      [
        { text: pick("Anulează", "Cancel"), style: "cancel" },
        {
          text: pick("Șterge", "Delete"),
          style: "destructive",
          onPress: () => deleteRegisteredKitLocal(kit.id),
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppScreenHeader
        title={pick("Kiturile mele", "My kits")}
        navigation={navigation}
        showMenu={false}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <PrimaryCard style={styles.introCard}>
          <View style={styles.introRow}>
            <View style={styles.introIcon}>
              <MaterialCommunityIcons name="medical-bag" size={28} color={COLORS.primary} />
            </View>
            <View style={styles.introBody}>
              <Text style={styles.introTitle}>
                {pick("Truse salvate local", "Locally saved kits")}
              </Text>
              <Text style={styles.introText}>
                {pick(
                  "Poți salva mai multe truse. Trusa activă este încărcată automat când începi o intervenție.",
                  "You can save multiple kits. The active kit is loaded automatically when you start an intervention."
                )}
              </Text>
            </View>
          </View>
        </PrimaryCard>

        <View style={styles.addButton}>
          <PrimaryButton
            title={pick("Adaugă o trusă nouă", "Add a new kit")}
            onPress={() => navigation.navigate(ROUTES.KIT_CHECK, { createNew: true })}
          />
        </View>

        <Text style={styles.sectionTitle}>{pick("Trusele salvate", "Saved kits")}</Text>

        {registeredKits.length === 0 ? (
          <PrimaryCard style={styles.emptyCard}>
            <MaterialCommunityIcons
              name="medical-bag"
              size={40}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyTitle}>{pick("Nu ai încă nicio trusă", "No saved kits yet")}</Text>
            <Text style={styles.emptyText}>
              {pick(
                "Creează prima trusă și marchează materialele pe care le ai disponibile.",
                "Create your first kit and mark the supplies you have available."
              )}
            </Text>
          </PrimaryCard>
        ) : (
          registeredKits.map((kit) => {
            const active = kit.id === activeKitId;
            const preview = (kit.itemCodes || []).slice(0, 4).map((code) => getKitItemLabel(code, language));
            const updated = kit.lastChecked || kit.updatedAt;
            const formatted = updated
              ? new Intl.DateTimeFormat(language?.startsWith("en") ? "en-GB" : "ro-RO", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(updated))
              : "—";

            return (
              <PrimaryCard key={kit.id} style={[styles.kitCard, active && styles.activeCard]}>
                <View style={styles.kitHeader}>
                  <View style={styles.kitHeaderText}>
                    <View style={styles.titleRow}>
                      <Text style={styles.kitTitle}>{kit.label}</Text>
                      {active ? (
                        <View style={styles.activeBadge}>
                          <MaterialCommunityIcons name="check-circle" size={14} color={COLORS.white} />
                          <Text style={styles.activeBadgeText}>{pick("ACTIVĂ", "ACTIVE")}</Text>
                        </View>
                      ) : null}
                    </View>
                    <Text style={styles.kitMeta}>
                      {pick(
                        `${kit.itemCodes?.length || 0} componente disponibile`,
                        `${kit.itemCodes?.length || 0} available supplies`
                      )}
                    </Text>
                  </View>
                  <MaterialCommunityIcons name="medical-bag" size={30} color={COLORS.primary} />
                </View>

                {kit.locationNote ? (
                  <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="map-marker-outline" size={17} color={COLORS.textSecondary} />
                    <Text style={styles.infoText}>{kit.locationNote}</Text>
                  </View>
                ) : null}

                <View style={styles.infoRow}>
                  <MaterialCommunityIcons name="clock-outline" size={17} color={COLORS.textSecondary} />
                  <Text style={styles.infoText}>
                    {pick("Ultima verificare", "Last checked")}: {formatted}
                  </Text>
                </View>

                {preview.length ? (
                  <Text style={styles.previewText} numberOfLines={2}>
                    {preview.join(" • ")}{(kit.itemCodes?.length || 0) > preview.length ? " • …" : ""}
                  </Text>
                ) : null}

                <View style={styles.actions}>
                  {!active ? (
                    <Pressable style={styles.secondaryButton} onPress={() => setActiveKitId(kit.id)}>
                      <MaterialCommunityIcons name="star-outline" size={18} color={COLORS.primary} />
                      <Text style={styles.secondaryButtonText}>{pick("Setează activă", "Set active")}</Text>
                    </Pressable>
                  ) : null}

                  <Pressable
                    style={styles.secondaryButton}
                    onPress={() => navigation.navigate(ROUTES.KIT_CHECK, { kitId: kit.id })}
                  >
                    <MaterialCommunityIcons name="pencil-outline" size={18} color={COLORS.primary} />
                    <Text style={styles.secondaryButtonText}>{pick("Actualizează", "Update")}</Text>
                  </Pressable>

                  <Pressable style={styles.deleteButton} onPress={() => removeKit(kit)}>
                    <MaterialCommunityIcons name="delete-outline" size={18} color={COLORS.error} />
                  </Pressable>
                </View>
              </PrimaryCard>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

import { useEffect, useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TextInput } from "react-native-paper";

import AppScreenHeader from "../../components/common/appScreenHeader/appScreenHeader";
import PrimaryCard from "../../components/common/primaryCard";
import PrimaryButton from "../../components/buttons/primaryButtons";
import KitScanner from "../../components/emergency/kitScanner";
import KitItemSelector from "../../components/emergency/kitItemSelector";
import useApp from "../../hooks/useApp";
import useLocale from "../../hooks/useLocale";
import { KIT_ITEMS, getKitItemLabel } from "../../data/kitItems";
import { COLORS } from "../../design";
import styles from "./kitCheckScreen.styles";

export default function KitCheckScreen({ navigation, route }) {
  const { language, pick } = useLocale();
  const {
    registeredKits,
    activeKit,
    saveRegisteredKit,
  } = useApp();

  const requestedKit = useMemo(() => {
    const kitId = route?.params?.kitId;
    if (kitId) return registeredKits.find((entry) => entry.id === kitId) || null;
    if (route?.params?.createNew) return null;
    return activeKit || null;
  }, [route?.params?.kitId, route?.params?.createNew, registeredKits, activeKit]);

  const [selected, setSelected] = useState([]);
  const [source, setSource] = useState("manual");
  const [name, setName] = useState("");
  const [locationNote, setLocationNote] = useState("");

  useEffect(() => {
    setSelected(requestedKit?.itemCodes || []);
    setSource(requestedKit?.source || "manual");
    setName(requestedKit?.label || "");
    setLocationNote(requestedKit?.locationNote || "");
  }, [requestedKit?.id]);

  function toggle(code) {
    setSource("manual");
    setSelected((current) =>
      current.includes(code)
        ? current.filter((item) => item !== code)
        : [...current, code]
    );
  }

  function handleScannerChange(items, nextSource) {
    setSelected(Array.isArray(items) ? items : []);
    setSource(nextSource || "camera");
  }

  function reset() {
    setSelected([]);
    setSource("manual");
  }

  function buildKit(existingId = null) {
    return {
      id: existingId || undefined,
      label: name.trim() || pick("Trusa medicală", "Medical kit"),
      kitType: "vehicle",
      locationNote: locationNote.trim(),
      itemCodes: selected,
      source,
      lastChecked: new Date().toISOString(),
    };
  }

  function saveCurrent() {
    const saved = saveRegisteredKit(buildKit(requestedKit?.id || null), { makeActive: true });
    Alert.alert(
      pick("Trusă salvată", "Kit saved"),
      pick(
        `„${saved.label}” este acum trusa activă și va fi încărcată automat în intervenții.`,
        `“${saved.label}” is now the active kit and will be loaded automatically during interventions.`
      ),
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  }

  function saveAsNew() {
    const saved = saveRegisteredKit(buildKit(null), { makeActive: true });
    Alert.alert(
      pick("Trusă nouă salvată", "New kit saved"),
      pick(
        `„${saved.label}” este acum trusa activă.`,
        `“${saved.label}” is now the active kit.`
      ),
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppScreenHeader
        title={requestedKit ? pick("Actualizează trusa", "Update kit") : pick("Trusă medicală nouă", "New medical kit")}
        navigation={navigation}
        showMenu={false}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <PrimaryCard style={styles.identityCard}>
          <View style={styles.titleRow}>
            <View style={styles.titleIcon}>
              <MaterialCommunityIcons name="medical-bag" size={26} color={COLORS.primary} />
            </View>
            <View style={styles.titleBody}>
              <Text style={styles.title}>{pick("Configurează trusa", "Configure your kit")}</Text>
              <Text style={styles.subtitle}>
                {pick(
                  "Selectează manual componentele sau folosește camera, apoi salvează trusa pentru a fi reutilizată automat în sesiuni.",
                  "Select supplies manually or use the camera, then save the kit so it can be reused automatically during sessions."
                )}
              </Text>
            </View>
          </View>

          <TextInput
            mode="outlined"
            label={pick("Denumire trusă", "Kit name")}
            placeholder={pick("Ex: Trusa mașinii", "E.g. Car kit")}
            value={name}
            onChangeText={setName}
            outlineColor={COLORS.border}
            activeOutlineColor={COLORS.primary}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label={pick("Locație / notă", "Location / note")}
            placeholder={pick("Ex: Portbagaj", "E.g. Trunk")}
            value={locationNote}
            onChangeText={setLocationNote}
            outlineColor={COLORS.border}
            activeOutlineColor={COLORS.primary}
            style={styles.input}
          />
        </PrimaryCard>

        <PrimaryCard style={styles.card}>
          <Text style={styles.sectionTitle}>{pick("Recunoaștere cu camera", "Camera recognition")}</Text>
          <Text style={styles.muted}>
            {pick(
              "Scanează trusa, verifică rezultatele și corectează manual orice componentă înainte de salvare.",
              "Scan the kit, review the results, and manually correct any supply before saving."
            )}
          </Text>
          <KitScanner
            context="kit_check"
            selected={selected}
            onChange={handleScannerChange}
          />
        </PrimaryCard>

        <PrimaryCard style={styles.card}>
          <View style={styles.sectionHeader}>
            <View style={styles.flex}>
              <Text style={styles.sectionTitle}>{pick("Componente disponibile", "Available supplies")}</Text>
              <Text style={styles.muted}>
                {pick(
                  "Apasă pe fiecare material pe care îl ai. Selecția folosește culoarea principală ResQKit.",
                  "Tap each supply you have. Selection uses the ResQKit primary color."
                )}
              </Text>
            </View>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{selected.length}/{KIT_ITEMS.length}</Text>
            </View>
          </View>

          <KitItemSelector
            selected={selected}
            onToggle={toggle}
            language={language}
          />

          <Pressable style={styles.resetButton} onPress={reset}>
            <MaterialCommunityIcons name="refresh" size={18} color={COLORS.primary} />
            <Text style={styles.resetText}>{pick("Resetează selecția", "Reset selection")}</Text>
          </Pressable>
        </PrimaryCard>

        <PrimaryCard style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>{pick("Rezumat", "Summary")}</Text>
          <Text style={styles.summaryText}>
            {pick(
              `${selected.length} din ${KIT_ITEMS.length} componente marcate ca disponibile.`,
              `${selected.length} of ${KIT_ITEMS.length} supplies marked as available.`
            )}
          </Text>
          {selected.length ? (
            <Text style={styles.selectedList}>
              {selected.map((code) => getKitItemLabel(code, language)).join(" • ")}
            </Text>
          ) : (
            <Text style={styles.selectedList}>
              {pick("Nu ai selectat încă nicio componentă.", "No supplies selected yet.")}
            </Text>
          )}
          <View style={styles.sourceRow}>
            <MaterialCommunityIcons
              name={source === "camera" ? "camera-check-outline" : "gesture-tap"}
              size={17}
              color={COLORS.textSecondary}
            />
            <Text style={styles.sourceText}>
              {source === "camera"
                ? pick("Ultima selecție provine din scanarea camerei.", "The latest selection came from the camera scan.")
                : pick("Ultima selecție a fost făcută manual.", "The latest selection was made manually.")}
            </Text>
          </View>
        </PrimaryCard>

        <View style={styles.saveArea}>
          <PrimaryButton
            title={requestedKit ? pick("Salvează modificările", "Save changes") : pick("Salvează trusa", "Save kit")}
            onPress={saveCurrent}
          />
          {requestedKit ? (
            <Pressable style={styles.saveAsNewButton} onPress={saveAsNew}>
              <MaterialCommunityIcons name="content-copy" size={18} color={COLORS.primary} />
              <Text style={styles.saveAsNewText}>{pick("Salvează ca trusă nouă", "Save as a new kit")}</Text>
            </Pressable>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import AppScreenHeader from "../../components/common/appScreenHeader/appScreenHeader";
import FloatingAIButton from "../../components/home/aiButton";
import EmergencyStartCard from "../../components/home/emergencyStartCard";
import ReadinessCard from "../../components/home/readinessCard";
import MedicalKitCard from "../../components/home/medicalKitCard";
import QuickActionsCard from "../../components/home/quickActionsCard";
import RecentActivityCard from "../../components/home/recentActivityCard";
import PracticeCard from "../../components/home/practiceCard";
import SearchSection from "../../sections/home/searchSection";
import useApp from "../../hooks/useApp";
import { ROUTES } from "../../constants/routes";
import styles from "./homeScreen.styles";

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const { t } = useTranslation();
  const { incident, consent, retainedIncidents } = useApp();

  function openIntervention() {
    if (!consent.disclaimerAcknowledged) {
      navigation.navigate(ROUTES.CONSENT, { next: ROUTES.INCIDENT_START });
      return;
    }
    navigation.navigate(ROUTES.INCIDENT_START);
  }

  function handleSearchSubmit() {
    const q = search.trim();
    if (!q) return;
    navigation.navigate(ROUTES.GUIDES, { search: q });
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppScreenHeader
        title={t("home.title")}
        navigation={navigation}
        onProfilePress={() => navigation.navigate(ROUTES.ACCOUNT)}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <SearchSection
          search={search}
          setSearch={setSearch}
          onSubmit={handleSearchSubmit}
        />

        <EmergencyStartCard
          hasActiveIncident={Boolean(incident)}
          onPress={openIntervention}
        />

        <ReadinessCard
          onOpenSafetyProfile={() => navigation.navigate(ROUTES.SAFETY_PROFILE)}
          onOpenConsent={() => navigation.navigate(ROUTES.CONSENT, { next: ROUTES.SETTINGS })}
        />

        <MedicalKitCard
          onPress={() => navigation.navigate(ROUTES.KIT_CHECK)}
        />

        <QuickActionsCard
          onFirstAid={() => navigation.navigate(ROUTES.GUIDES, { guideType: "wounds" })}
          onCheckKit={() => navigation.navigate(ROUTES.KIT_CHECK)}
        />

        <PracticeCard onPress={() => navigation.navigate(ROUTES.PRACTICE_HOME)} />

        <RecentActivityCard
          record={retainedIncidents?.[0] || null}
          onPress={() => navigation.navigate(ROUTES.HISTORY)}
        />
      </ScrollView>

      <FloatingAIButton onPress={() => navigation.navigate(ROUTES.AI)} />
    </SafeAreaView>
  );
}

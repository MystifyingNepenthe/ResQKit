import { useState } from "react";

import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import AppHeader from "../../components/common/appHeader/appHeader";
import FloatingAIButton from "../../components/home/aiButton";

import SearchSection from "../../sections/home/searchSection";

import GuideTypeSwitcher from "../../components/guides/guideSwitcher";

import WoundGuidesSection from "../../sections/guides/woundGuidesSection";
import AppGuidesSection from "../../sections/guides/appGuidesSection";

import { ROUTES } from "../../constants/routes";

import styles from "./guidesScreen.styles";

export default function GuidesScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [guideType, setGuideType] = useState("wounds");

  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title={t("guides.title")}
        onMenuPress={() => {}}
        onNotificationPress={() => {}}
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
        />

        <GuideTypeSwitcher
          selected={guideType}
          onChange={setGuideType}
        />

        {guideType === "wounds" ? (
          <WoundGuidesSection />
        ) : (
          <AppGuidesSection />
        )}
      </ScrollView>

      <FloatingAIButton
        onPress={() => navigation.navigate(ROUTES.AI)}
      />
    </SafeAreaView>
  );
}
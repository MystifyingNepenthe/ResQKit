import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import AppHeader from "../../components/common/appHeader/appHeader";

import AIEmptyState from "../../components/ai/aiEmptyState";
import AIMessageInput from "../../components/ai/aiMessageInput";

import QuickActionsSection from "../../sections/ai/quickActionSection";

import { ROUTES } from "../../constants/routes";

import styles from "./aiScreen.styles";

export default function AIScreen({ navigation }) {
  const { t } = useTranslation();

  function handleSend(message) {
    console.log("Mesaj AI:", message);
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title={t("ai.title")}
        onMenuPress={() => {}}
        onNotificationPress={() => {}}
        onProfilePress={() => navigation.navigate(ROUTES.ACCOUNT)}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <AIEmptyState />

        <QuickActionsSection />
      </ScrollView>

      <AIMessageInput
        onSend={handleSend}
        onCameraPress={() => {}}
        onAttachmentPress={() => {}}
      />
    </SafeAreaView>
  );
}
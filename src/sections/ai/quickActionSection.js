import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

import AIQuickAction from "../../components/ai/aiQuickAction";

import styles from "./quickActionSection.styles";

export default function QuickActionsSection() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {t("ai.quickSuggestions")}
      </Text>

      <AIQuickAction
        title={t("ai.analyzeWound")}
        icon="camera-outline"
        onPress={() => {}}
      />

      <AIQuickAction
        title={t("ai.firstAid")}
        icon="medical-bag"
        onPress={() => {}}
      />

      <AIQuickAction
        title={t("ai.checkResQKit")}
        icon="briefcase-medical-outline"
        onPress={() => {}}
      />

      <AIQuickAction
        title={t("ai.askQuestion")}
        icon="message-question-outline"
        onPress={() => {}}
      />
    </View>
  );
}
import {
  View,
  Text,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import {
  useTranslation,
} from "react-i18next";

import {
  COLORS,
} from "../../design";

import styles from "./aiEmptyState.styles";

export default function AIEmptyState() {
  const { t } =
    useTranslation();

  return (
    <View
      style={styles.container}
    >
      <View
        style={
          styles.iconContainer
        }
      >
        <MaterialCommunityIcons
          name="robot-outline"
          size={42}
          color={
            COLORS.primary
          }
        />
      </View>

      <Text style={styles.title}>
        {t("ai.title")}
      </Text>

      <Text
        style={styles.subtitle}
      >
        {t("ai.subtitle")}
      </Text>

      <Text
        style={
          styles.emergencyNote
        }
      >
        În cazul unei urgențe, apelează 112.
      </Text>
    </View>
  );
}
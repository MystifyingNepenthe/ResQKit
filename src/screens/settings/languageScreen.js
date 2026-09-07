import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useTranslation } from "react-i18next";

import AppHeader from "../../components/common/appHeader/appHeader";
import PrimaryCard from "../../components/common/primaryCard";

import { COLORS } from "../../design";

import styles from "./languageScreen.styles";

export default function LanguageScreen({ navigation }) {
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;

  function selectLanguage(language) {
    i18n.changeLanguage(language);
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title={t("settings.language")}
        onMenuPress={() => navigation.goBack()}
        onNotificationPress={() => {}}
        onProfilePress={() => {}}
      />

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          {t("settings.chooseLanguage")}
        </Text>

        <PrimaryCard style={styles.card}>
          <Pressable
            style={styles.languageRow}
            onPress={() => selectLanguage("ro")}
          >
            <Text style={styles.language}>
              Română
            </Text>

            <MaterialCommunityIcons
              name={
                currentLanguage === "ro"
                  ? "radiobox-marked"
                  : "radiobox-blank"
              }
              size={24}
              color={COLORS.primary}
            />
          </Pressable>

          <View style={styles.divider} />

          <Pressable
            style={styles.languageRow}
            onPress={() => selectLanguage("en")}
          >
            <Text style={styles.language}>
              English
            </Text>

            <MaterialCommunityIcons
              name={
                currentLanguage === "en"
                  ? "radiobox-marked"
                  : "radiobox-blank"
              }
              size={24}
              color={COLORS.primary}
            />
          </Pressable>
        </PrimaryCard>
      </View>
    </SafeAreaView>
  );
}
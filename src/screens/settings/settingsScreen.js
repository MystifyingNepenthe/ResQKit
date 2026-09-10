import {
  ScrollView,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  useTranslation,
} from "react-i18next";

import AppScreenHeader from "../../components/common/appScreenHeader/appScreenHeader";
import PrimaryCard from "../../components/common/primaryCard";
import SettingRow from "../../components/settings/settingRow";

import {
  ROUTES,
} from "../../constants/routes";

import styles from "./settingsScreen.styles";

export default function SettingsScreen({
  navigation,
}) {
  const { t, i18n } = useTranslation();

  const currentLanguage =
    i18n.language === "en"
      ? "English"
      : "Română";

  return (
    <SafeAreaView
      style={styles.container}
    >
      <AppScreenHeader
        title={t(
          "settings.title"
        )}
        navigation={navigation}
      />

      <ScrollView
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        <PrimaryCard
          style={styles.card}
        >
          <SettingRow
            icon="account-outline"
            title={t(
              "settings.account"
            )}
            onPress={() =>
              navigation.navigate(
                ROUTES.ACCOUNT
              )
            }
          />

          <SettingRow
            icon="devices"
            title={t(
              "settings.device"
            )}
            onPress={() =>
              navigation.navigate(
                ROUTES.DEVICE_INFO
              )
            }
          />

          <SettingRow
            icon="translate"
            title={t(
              "settings.language"
            )}
            value={
              currentLanguage
            }
            onPress={() =>
              navigation.navigate(
                ROUTES.LANGUAGE
              )
            }
          />
        </PrimaryCard>
      </ScrollView>
    </SafeAreaView>
  );
}
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import AppHeader from "../../components/common/appHeader/appHeader";
import PrimaryCard from "../../components/common/primaryCard";
import SettingRow from "../../components/settings/settingRow";

import useApp from "../../hooks/useApp";

import { ROUTES } from "../../constants/routes";

import styles from "./settingsScreen.styles";

export default function SettingsScreen({ navigation }) {
  const { t, i18n } = useTranslation();

  const { setIsLoggedIn } = useApp();

  const currentLanguage =
    i18n.language === "en"
      ? t("settings.english")
      : t("settings.romanian");

  function handleLogout() {
    setIsLoggedIn(false);

    navigation.reset({
      index: 0,
      routes: [
        {
          name: ROUTES.LOGIN,
        },
      ],
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title={t("settings.title")}
        onMenuPress={() => {}}
        onNotificationPress={() => {}}
        onProfilePress={() =>
          navigation.navigate(ROUTES.ACCOUNT)
        }
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <PrimaryCard style={styles.card}>
          <SettingRow
            icon="account-outline"
            title={t("settings.account")}
            onPress={() =>
              navigation.navigate(ROUTES.ACCOUNT)
            }
          />

          <SettingRow
            icon="devices"
            title={t("settings.device")}
            onPress={() =>
              navigation.navigate(ROUTES.DEVICE_INFO)
            }
          />

          <SettingRow
            icon="translate"
            title={t("settings.language")}
            value={currentLanguage}
            onPress={() =>
              navigation.navigate(ROUTES.LANGUAGE)
            }
          />
        </PrimaryCard>

        <PrimaryCard style={styles.card}>
          <SettingRow
            icon="logout"
            title={t("settings.logout")}
            danger
            onPress={handleLogout}
          />
        </PrimaryCard>
      </ScrollView>
    </SafeAreaView>
  );
}
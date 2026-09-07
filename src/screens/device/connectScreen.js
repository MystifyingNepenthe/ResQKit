import { Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import PrimaryCard from "../../components/common/primaryCard";
import PrimaryButton from "../../components/buttons/primaryButtons";

import useApp from "../../hooks/useApp";

import { COLORS } from "../../design";
import { ROUTES } from "../../constants/routes";

import styles from "./connectScreen.styles";

export default function ConnectDeviceScreen({
  navigation,
}) {
  const { t } = useTranslation();

  const {
    device,
    setDevice,
  } = useApp();

  function handleConnect() {
    setDevice({
      ...device,
      connected: true,
      battery:
        device?.battery ?? 82,
      lastSync: new Date().toISOString(),
    });

    navigation.replace(ROUTES.HOME);
  }

  function handleSkip() {
    setDevice({
      ...device,
      connected: false,
    });

    navigation.replace(ROUTES.HOME);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="bluetooth-connect"
            size={54}
            color={COLORS.primary}
          />
        </View>

        <Text style={styles.title}>
          {t("connect.title")}
        </Text>

        <Text style={styles.subtitle}>
          {t("connect.subtitle")}
        </Text>

        <PrimaryCard style={styles.card}>
          <Text style={styles.cardTitle}>
            ResQKit
          </Text>

          <Text style={styles.description}>
            {t("connect.description")}
          </Text>

          <PrimaryButton
            title={t("connect.connect")}
            onPress={handleConnect}
          />
        </PrimaryCard>

        <Text
          style={styles.skip}
          onPress={handleSkip}
        >
          {t("connect.skip")}
        </Text>
      </View>
    </SafeAreaView>
  );
}
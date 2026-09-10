import { useState } from "react";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import PrimaryCard from "../../components/common/primaryCard";
import PrimaryButton from "../../components/buttons/primaryButtons";

import useApp from "../../hooks/useApp";

import { COLORS } from "../../design";

import styles from "./findDeviceSection.styles";

export default function FindDeviceSection() {
  const { t } = useTranslation();

  const { device } = useApp();

  const [locating, setLocating] = useState(false);
  const [message, setMessage] = useState("");

  function handleLocate() {
    if (!device?.connected) {
      setMessage(t("vehicle.locateDisconnected"));
      return;
    }

    setLocating(true);
    setMessage(t("vehicle.locating"));

    setTimeout(() => {
      setLocating(false);
      setMessage(t("vehicle.locateSuccess"));
    }, 2500);
  }

  return (
    <PrimaryCard style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="volume-high"
            size={26}
            color={COLORS.primary}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {t("vehicle.findResQKit")}
          </Text>

          <Text style={styles.description}>
            {t("vehicle.findDescription")}
          </Text>
        </View>
      </View>

      <PrimaryButton
        title={
          locating
            ? t("vehicle.locatingButton")
            : t("vehicle.locateButton")
        }
        onPress={handleLocate}
        disabled={locating}
      />

      {message ? (
        <Text
          style={[
            styles.message,
            !device?.connected && styles.errorMessage,
          ]}
        >
          {message}
        </Text>
      ) : null}
    </PrimaryCard>
  );
}
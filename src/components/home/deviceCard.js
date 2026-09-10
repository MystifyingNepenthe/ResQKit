import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import PrimaryCard from "../common/primaryCard";
import BatteryBar from "../common/batteryBar";
import StatusChip from "../common/statusChip";

import PrimaryButton from "../buttons/primaryButtons";

import { COLORS } from "../../design";

import styles from "./deviceCard.styles";

export default function DeviceCard({
  connected = false,
  battery = 0,
  lastSync = null,
  onResync,
  onConnect,
}) {
  const { t } = useTranslation();

  const formattedLastSync = lastSync
    ? new Date(lastSync).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <PrimaryCard style={styles.card}>
      <View style={styles.header}>
        <View style={styles.deviceInfo}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="medical-bag"
              size={26}
              color={COLORS.primary}
            />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              ResQKit
            </Text>

            <StatusChip
              connected={connected}
            />
          </View>
        </View>
      </View>

      {connected ? (
        <>
          <View style={styles.batteryHeader}>
            <Text style={styles.label}>
              {t("home.battery")}
            </Text>

            <Text style={styles.batteryValue}>
              {battery}%
            </Text>
          </View>

          <BatteryBar
            percentage={battery}
          />

          {formattedLastSync && (
            <Text style={styles.lastSync}>
              {t("home.lastSync")}: {formattedLastSync}
            </Text>
          )}

          <View style={styles.buttonContainer}>
            <PrimaryButton
              title={t("home.resync")}
              onPress={onResync}
            />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.disconnectedText}>
            {t("home.deviceDisconnected")}
          </Text>

          <View style={styles.buttonContainer}>
            <PrimaryButton
              title={t("home.connectNow")}
              onPress={onConnect}
            />
          </View>
        </>
      )}
    </PrimaryCard>
  );
}
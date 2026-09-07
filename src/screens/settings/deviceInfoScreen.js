import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import AppHeader from "../../components/common/appHeader/appHeader";
import PrimaryCard from "../../components/common/primaryCard";
import SectionTitle from "../../components/common/sectionTitle";
import InfoRow from "../../components/common/infoRow";
import BatteryBar from "../../components/common/batteryBar";

import useApp from "../../hooks/useApp";

import styles from "./deviceInfoScreen.styles";

export default function DeviceInfoScreen({
  navigation,
}) {
  const { t } = useTranslation();

  const { device } = useApp();

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title={t("settings.device")}
        onMenuPress={() => navigation.goBack()}
        onNotificationPress={() => {}}
        onProfilePress={() => {}}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <PrimaryCard style={styles.card}>
          <SectionTitle>
            ResQKit
          </SectionTitle>

          <InfoRow
            label="Firmware"
            value={device.firmware || "--"}
          />

          <InfoRow
            label="Număr de serie"
            value={device.serialNumber || "--"}
          />

          <InfoRow
            label="Bluetooth"
            value={
              device.bluetooth
                ? "Activ"
                : "Inactiv"
            }
          />

          <InfoRow
            label={t("home.battery")}
            value={
              device.connected
                ? `${device.battery}%`
                : "--"
            }
          />

          {device.connected && (
            <BatteryBar
              percentage={device.battery}
            />
          )}
        </PrimaryCard>
      </ScrollView>
    </SafeAreaView>
  );
}
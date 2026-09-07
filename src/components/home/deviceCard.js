import { Text, Divider } from "react-native-paper";
import { useTranslation } from "react-i18next";

import PrimaryCard from "../common/primaryCard";
import SectionTitle from "../common/sectionTitle";
import StatusChip from "../common/statusChip";
import BatteryBar from "../common/batteryBar";
import InfoRow from "../common/infoRow";
import PrimaryButton from "../buttons/primaryButtons";

import formatBattery from "../../utils/formatBattery";

import styles from "./deviceCard.styles";

export default function DeviceCard({
  connected = false,
  battery = 82,
}) {
  const { t } = useTranslation();

  return (
    <PrimaryCard style={styles.card}>
      <SectionTitle>
        {t("home.myResQKit")}
      </SectionTitle>

      <Text style={styles.subtitle}>
        {t("home.deviceStatus")}
      </Text>

      <InfoRow
        label={t("home.status")}
        value=""
      />

      <StatusChip
        connected={connected}
      />

      <Divider style={styles.divider} />

      <InfoRow
        label={t("home.battery")}
        value={
          connected
            ? formatBattery(battery)
            : "--"
        }
      />

      {connected && (
        <BatteryBar
          percentage={battery}
        />
      )}

      <Divider style={styles.divider} />

      <InfoRow
        label={t("home.lastSync")}
        value={
          connected
            ? t("home.justNow")
            : "--"
        }
      />

      <PrimaryButton
        title={
          connected
            ? t("home.resyncNow")
            : t("home.connectNow")
        }
        onPress={() => {}}
      />
    </PrimaryCard>
  );
}
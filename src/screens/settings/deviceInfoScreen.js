import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import AppScreenHeader from "../../components/common/appScreenHeader/appScreenHeader";
import PrimaryCard from "../../components/common/primaryCard";
import SectionTitle from "../../components/common/sectionTitle";
import InfoRow from "../../components/common/infoRow";
import BatteryBar from "../../components/common/batteryBar";
import useApp from "../../hooks/useApp";
import useLocale from "../../hooks/useLocale";
import styles from "./deviceInfoScreen.styles";

export default function DeviceInfoScreen({ navigation }) {
  const { t } = useTranslation();
  const { pick } = useLocale();
  const { device } = useApp();
  return (
    <SafeAreaView style={styles.container}>
      <AppScreenHeader title={t("settings.device")} navigation={navigation} showMenu={false} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <PrimaryCard style={styles.card}>
          <SectionTitle>ResQKit</SectionTitle>
          <InfoRow label={pick("Stare", "Status")} value={device.connected ? t("common.connected") : t("common.disconnected")} />
          <InfoRow label="Firmware" value={device.firmware || "--"} />
          <InfoRow label={pick("Număr de serie", "Serial number")} value={device.serialNumber || "--"} />
          <InfoRow label="Bluetooth" value={device.bluetooth ? pick("Activ", "On") : pick("Inactiv", "Off")} />
          <InfoRow label={t("home.battery")} value={device.connected ? `${device.battery}%` : "--"} />
          {device.connected && <BatteryBar percentage={device.battery} />}
        </PrimaryCard>
      </ScrollView>
    </SafeAreaView>
  );
}

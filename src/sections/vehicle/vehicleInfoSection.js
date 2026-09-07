import { Divider } from "react-native-paper";
import { useTranslation } from "react-i18next";

import PrimaryCard from "../../components/common/primaryCard";
import SectionTitle from "../../components/common/sectionTitle";
import InfoRow from "../../components/common/infoRow";

import vehicle from "../../mock/vehicle";

import styles from "./vehicleInfoSection.styles";

export default function VehicleInformationSection() {
  const { t } = useTranslation();

  return (
    <PrimaryCard style={styles.card}>
      <SectionTitle>
        {t("vehicle.vehicleInformation")}
      </SectionTitle>

      <InfoRow
        label={t("vehicle.model")}
        value={vehicle.model}
      />

      <Divider style={styles.divider} />

      <InfoRow
        label={t("vehicle.licensePlate")}
        value={vehicle.plate}
      />

      <Divider style={styles.divider} />

      <InfoRow
        label={t("vehicle.vin")}
        value={vehicle.vin}
      />
    </PrimaryCard>
  );
}
import { Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

import PrimaryCard from "../../components/common/primaryCard";
import SectionTitle from "../../components/common/sectionTitle";
import PrimaryButton from "../../components/buttons/primaryButtons";

import styles from "./findDeviceSection.styles";

export default function FindDeviceSection() {
  const { t } = useTranslation();

  return (
    <PrimaryCard style={styles.card}>
      <SectionTitle>
        {t("vehicle.locateTitle")}
      </SectionTitle>

      <Text style={styles.description}>
        {t("vehicle.locateDescription")}
      </Text>

      <PrimaryButton
        title={t("vehicle.findResQKit")}
        onPress={() => {}}
      />
    </PrimaryCard>
  );
}
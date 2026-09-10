import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import AppScreenHeader from "../../components/common/appScreenHeader/appScreenHeader";
import FloatingAIButton from "../../components/home/aiButton";

import VehicleInformationSection from "../../sections/vehicle/vehicleInfoSection";
import FindDeviceSection from "../../sections/vehicle/findDeviceSection";

import { ROUTES } from "../../constants/routes";

import styles from "./vehicleScreen.styles";

export default function VehicleScreen({
  navigation,
}) {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <AppScreenHeader
        title={t("vehicle.title")}
        navigation={navigation}
        onProfilePress={() =>
          navigation.navigate(ROUTES.ACCOUNT)
        }
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <VehicleInformationSection />

        <FindDeviceSection />
      </ScrollView>

      <FloatingAIButton
        onPress={() =>
          navigation.navigate(ROUTES.AI)
        }
      />
    </SafeAreaView>
  );
}
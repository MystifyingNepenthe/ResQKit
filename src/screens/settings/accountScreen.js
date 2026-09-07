import { useEffect, useState } from "react";

import {
  ScrollView,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useTranslation } from "react-i18next";

import AppHeader from "../../components/common/appHeader/appHeader";

import InputField from "../../components/input/inputFields";
import PrimaryButton from "../../components/buttons/primaryButtons";
import SectionTitle from "../../components/common/sectionTitle";
import PrimaryCard from "../../components/common/primaryCard";

import useApp from "../../hooks/useApp";

import styles from "./accountScreen.styles";

export default function AccountScreen({ navigation }) {
  const { t } = useTranslation();

  const {
    user,
    setUser,
    vehicle,
    setVehicle,
  } = useApp();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [vin, setVin] = useState("");

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setEmail(user?.email || "");

    setModel(vehicle?.model || "");
    setPlate(vehicle?.plate || "");
    setVin(vehicle?.vin || "");
  }, [user, vehicle]);

  function handleSave() {
    setUser({
      ...user,
      firstName,
      lastName,
      email,
    });

    setVehicle({
      ...vehicle,
      model,
      plate,
      vin,
    });

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title={t("account.title")}
        onMenuPress={() => navigation.goBack()}
        onNotificationPress={() => {}}
        onProfilePress={() => {}}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <PrimaryCard style={styles.card}>
          <SectionTitle>
            {t("account.personalInformation")}
          </SectionTitle>

          <View style={styles.input}>
            <InputField
              label={t("account.firstName")}
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.input}>
            <InputField
              label={t("account.lastName")}
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.input}>
            <InputField
              label={t("account.email")}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
        </PrimaryCard>

        <PrimaryCard style={styles.card}>
          <SectionTitle>
            {t("vehicle.vehicleInformation")}
          </SectionTitle>

          <View style={styles.input}>
            <InputField
              label={t("vehicle.model")}
              value={model}
              onChangeText={setModel}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.input}>
            <InputField
              label={t("vehicle.licensePlate")}
              value={plate}
              onChangeText={setPlate}
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.input}>
            <InputField
              label={t("vehicle.vin")}
              value={vin}
              onChangeText={setVin}
              autoCapitalize="characters"
            />
          </View>
        </PrimaryCard>

        <View style={styles.button}>
          <PrimaryButton
            title={t("common.save")}
            onPress={handleSave}
          />
        </View>

        {saved && (
          <Text style={styles.savedText}>
            {t("account.saved")}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
import { useState } from "react";

import {
  ScrollView,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useTranslation } from "react-i18next";

import InputField from "../../components/input/inputFields";
import PrimaryButton from "../../components/buttons/primaryButtons";
import PrimaryCard from "../../components/common/primaryCard";
import SectionTitle from "../../components/common/sectionTitle";

import useApp from "../../hooks/useApp";

import { ROUTES } from "../../constants/routes";

import styles from "./registerScreen.styles";

export default function RegisterScreen({ navigation }) {
  const { t } = useTranslation();

  const {
    setUser,
    setVehicle,
    setIsLoggedIn,
  } = useApp();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [vin, setVin] = useState("");

  const [error, setError] = useState("");

  function handleRegister() {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      setError(t("auth.completeRequiredFields"));
      return;
    }

    setError("");

    setUser({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      profilePicture: null,
    });

    setVehicle({
      model: model.trim(),
      plate: plate.trim(),
      vin: vin.trim(),
    });

    setIsLoggedIn(true);

    navigation.replace(
      ROUTES.CONNECT_DEVICE
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>
          {t("auth.createAccount")}
        </Text>

        <Text style={styles.subtitle}>
          {t("auth.registerSubtitle")}
        </Text>

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

          <View style={styles.input}>
            <InputField
              label={t("account.password")}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
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

          <Text style={styles.optionalText}>
            {t("auth.vehicleOptional")}
          </Text>
        </PrimaryCard>

        {error ? (
          <Text style={styles.error}>
            {error}
          </Text>
        ) : null}

        <View style={styles.button}>
          <PrimaryButton
            title={t("auth.createAccount")}
            onPress={handleRegister}
          />
        </View>

        <Text
          style={styles.loginLink}
          onPress={() =>
            navigation.navigate(ROUTES.LOGIN)
          }
        >
          {t("auth.alreadyHaveAccount")}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
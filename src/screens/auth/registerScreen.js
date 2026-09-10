import { useState } from "react";

import {
  ScrollView,
  Text,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  useTranslation,
} from "react-i18next";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TextInput } from "react-native-paper";

import InputField from "../../components/input/inputFields";
import PrimaryButton from "../../components/buttons/primaryButtons";
import PrimaryCard from "../../components/common/primaryCard";
import SectionTitle from "../../components/common/sectionTitle";

import useApp from "../../hooks/useApp";

import {
  ROUTES,
} from "../../constants/routes";

import {
  COLORS,
} from "../../design";

import styles from "./registerScreen.styles";

export default function RegisterScreen({
  navigation,
}) {
  const { t } = useTranslation();

  const {
    setUser,
    setVehicle,
    setIsLoggedIn,
  } = useApp();

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [model, setModel] =
    useState("");

  const [plate, setPlate] =
    useState("");

  const [vin, setVin] =
    useState("");

  const [error, setError] =
    useState("");

  function isValidEmail(value) {
    return /\S+@\S+\.\S+/.test(value);
  }

  function handleRegister() {
    const cleanFirstName =
      firstName.trim();

    const cleanLastName =
      lastName.trim();

    const cleanEmail =
      email.trim().toLowerCase();

    const cleanModel =
      model.trim();

    const cleanPlate =
      plate
        .trim()
        .toUpperCase();

    const cleanVin =
      vin
        .trim()
        .toUpperCase();

    if (
      !cleanFirstName ||
      !cleanLastName ||
      !cleanEmail ||
      !password ||
      !confirmPassword
    ) {
      setError(
        t("auth.completeRequiredFields")
      );

      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setError(
        "Introdu o adresă de email validă."
      );

      return;
    }

    if (password.length < 6) {
      setError(
        "Parola trebuie să conțină cel puțin 6 caractere."
      );

      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setError(
        "Parolele introduse nu coincid."
      );

      return;
    }

    if (
      cleanVin &&
      cleanVin.length !== 17
    ) {
      setError(
        "Seria VIN trebuie să conțină 17 caractere."
      );

      return;
    }

    setError("");

    setUser({
      firstName:
        cleanFirstName,

      lastName:
        cleanLastName,

      email:
        cleanEmail,

      profilePicture:
        null,
    });

    setVehicle({
      model:
        cleanModel,

      plate:
        cleanPlate,

      vin:
        cleanVin,
    });

    setIsLoggedIn(true);

    navigation.replace(
      ROUTES.CONNECT_DEVICE
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={
          false
        }
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <MaterialCommunityIcons
              name="medical-bag"
              size={30}
              color={COLORS.primary}
            />
          </View>

          <Text style={styles.brand}>
            ResQKit
          </Text>
        </View>

        <Text style={styles.title}>
          {t("auth.createAccount")}
        </Text>

        <Text style={styles.subtitle}>
          {t("auth.registerSubtitle")}
        </Text>

        <PrimaryCard
          style={styles.card}
        >
          <SectionTitle>
            {t(
              "account.personalInformation"
            )}
          </SectionTitle>

          <View style={styles.input}>
            <InputField
              label={t(
                "account.firstName"
              )}
              value={firstName}
              onChangeText={
                setFirstName
              }
              autoCapitalize="words"
            />
          </View>

          <View style={styles.input}>
            <InputField
              label={t(
                "account.lastName"
              )}
              value={lastName}
              onChangeText={
                setLastName
              }
              autoCapitalize="words"
            />
          </View>

          <View style={styles.input}>
            <InputField
              label={t(
                "account.email"
              )}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              left={
                <TextInput.Icon
                  icon="email-outline"
                />
              }
            />
          </View>

          <View style={styles.input}>
            <InputField
              label={t(
                "account.password"
              )}
              value={password}
              onChangeText={
                setPassword
              }
              secureTextEntry={
                !showPassword
              }
              autoCapitalize="none"
              left={
                <TextInput.Icon
                  icon="lock-outline"
                />
              }
              right={
                <TextInput.Icon
                  icon={
                    showPassword
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  onPress={() =>
                    setShowPassword(
                      current =>
                        !current
                    )
                  }
                />
              }
            />
          </View>

          <View style={styles.input}>
            <InputField
              label="Confirmă parola"
              value={
                confirmPassword
              }
              onChangeText={
                setConfirmPassword
              }
              secureTextEntry={
                !showConfirmPassword
              }
              autoCapitalize="none"
              left={
                <TextInput.Icon
                  icon="lock-check-outline"
                />
              }
              right={
                <TextInput.Icon
                  icon={
                    showConfirmPassword
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  onPress={() =>
                    setShowConfirmPassword(
                      current =>
                        !current
                    )
                  }
                />
              }
            />
          </View>
        </PrimaryCard>

        <PrimaryCard
          style={styles.card}
        >
          <SectionTitle>
            {t(
              "vehicle.vehicleInformation"
            )}
          </SectionTitle>

          <Text
            style={
              styles.sectionDescription
            }
          >
            Poți completa datele vehiculului acum sau le poți adăuga ulterior din Cont.
          </Text>

          <View style={styles.input}>
            <InputField
              label={t(
                "vehicle.model"
              )}
              value={model}
              onChangeText={setModel}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.input}>
            <InputField
              label={t(
                "vehicle.licensePlate"
              )}
              value={plate}
              onChangeText={setPlate}
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.input}>
            <InputField
              label={t(
                "vehicle.vin"
              )}
              value={vin}
              onChangeText={setVin}
              autoCapitalize="characters"
              maxLength={17}
              autoCorrect={false}
            />
          </View>

          <Text
            style={styles.vinCounter}
          >
            {vin.length}/17
          </Text>
        </PrimaryCard>

        {error ? (
          <Text style={styles.error}>
            {error}
          </Text>
        ) : null}

        <View style={styles.button}>
          <PrimaryButton
            title={t(
              "auth.createAccount"
            )}
            onPress={
              handleRegister
            }
          />
        </View>

        <View
          style={
            styles.loginContainer
          }
        >
          <Text
            style={styles.loginText}
          >
            Ai deja un cont?
          </Text>

          <Text
            style={styles.loginLink}
            onPress={() =>
              navigation.navigate(
                ROUTES.LOGIN
              )
            }
          >
            {" "}
            Autentifică-te
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
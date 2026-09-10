import { useEffect, useState } from "react";

import {
  Alert,
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

import AppScreenHeader from "../../components/common/appScreenHeader/appScreenHeader";

import InputField from "../../components/input/inputFields";
import PrimaryButton from "../../components/buttons/primaryButtons";
import SectionTitle from "../../components/common/sectionTitle";
import PrimaryCard from "../../components/common/primaryCard";

import useApp from "../../hooks/useApp";

import styles from "./accountScreen.styles";

export default function AccountScreen({
  navigation,
}) {
  const { t } = useTranslation();

  const {
    user,
    setUser,
    vehicle,
    setVehicle,
  } = useApp();

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [model, setModel] =
    useState("");

  const [plate, setPlate] =
    useState("");

  const [vin, setVin] =
    useState("");

  const [saved, setSaved] =
    useState(false);

  useEffect(() => {
    setFirstName(
      user?.firstName || ""
    );

    setLastName(
      user?.lastName || ""
    );

    setEmail(
      user?.email || ""
    );

    setModel(
      vehicle?.model || ""
    );

    setPlate(
      vehicle?.plate || ""
    );

    setVin(
      vehicle?.vin || ""
    );
  }, [user, vehicle]);

  function validateEmail(value) {
    return /\S+@\S+\.\S+/.test(
      value
    );
  }

  function handleSave() {
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
      !cleanEmail
    ) {
      Alert.alert(
        "Date incomplete",
        "Completează numele, prenumele și adresa de email."
      );

      return;
    }

    if (
      !validateEmail(
        cleanEmail
      )
    ) {
      Alert.alert(
        "Email invalid",
        "Introdu o adresă de email validă."
      );

      return;
    }

    if (
      cleanVin &&
      cleanVin.length !== 17
    ) {
      Alert.alert(
        "VIN invalid",
        "Seria VIN trebuie să conțină 17 caractere."
      );

      return;
    }

    setUser({
      ...user,

      firstName:
        cleanFirstName,

      lastName:
        cleanLastName,

      email:
        cleanEmail,
    });

    setVehicle({
      ...vehicle,

      model:
        cleanModel,

      plate:
        cleanPlate,

      vin:
        cleanVin,
    });

    setFirstName(
      cleanFirstName
    );

    setLastName(
      cleanLastName
    );

    setEmail(
      cleanEmail
    );

    setModel(
      cleanModel
    );

    setPlate(
      cleanPlate
    );

    setVin(
      cleanVin
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <AppScreenHeader
        title={t(
          "account.title"
        )}
        navigation={
          navigation
        }
        showMenu={false}
      />

      <ScrollView
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={
          false
        }
        keyboardShouldPersistTaps="handled"
      >
        <PrimaryCard
          style={styles.card}
        >
          <SectionTitle>
            {t(
              "account.personalInformation"
            )}
          </SectionTitle>

          <View
            style={styles.input}
          >
            <InputField
              label={t(
                "account.firstName"
              )}
              value={
                firstName
              }
              onChangeText={
                setFirstName
              }
              autoCapitalize="words"
            />
          </View>

          <View
            style={styles.input}
          >
            <InputField
              label={t(
                "account.lastName"
              )}
              value={
                lastName
              }
              onChangeText={
                setLastName
              }
              autoCapitalize="words"
            />
          </View>

          <View
            style={styles.input}
          >
            <InputField
              label={t(
                "account.email"
              )}
              value={email}
              onChangeText={
                setEmail
              }
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
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

          <View
            style={styles.input}
          >
            <InputField
              label={t(
                "vehicle.model"
              )}
              value={model}
              onChangeText={
                setModel
              }
              autoCapitalize="words"
            />
          </View>

          <View
            style={styles.input}
          >
            <InputField
              label={t(
                "vehicle.licensePlate"
              )}
              value={plate}
              onChangeText={
                setPlate
              }
              autoCapitalize="characters"
              autoCorrect={false}
            />
          </View>

          <View
            style={styles.input}
          >
            <InputField
              label={t(
                "vehicle.vin"
              )}
              value={vin}
              onChangeText={
                setVin
              }
              autoCapitalize="characters"
              autoCorrect={false}
              maxLength={17}
            />
          </View>
        </PrimaryCard>

        <View
          style={styles.button}
        >
          <PrimaryButton
            title={t(
              "common.save"
            )}
            onPress={
              handleSave
            }
          />
        </View>

        {saved && (
          <Text
            style={
              styles.savedText
            }
          >
            {t(
              "account.saved"
            )}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
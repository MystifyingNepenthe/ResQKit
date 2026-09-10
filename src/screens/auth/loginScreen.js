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

import useApp from "../../hooks/useApp";

import {
  ROUTES,
} from "../../constants/routes";

import {
  COLORS,
} from "../../design";

import styles from "./loginScreen.styles";

export default function LoginScreen({
  navigation,
}) {
  const { t } = useTranslation();

  const {
    setIsLoggedIn,
    device,
  } = useApp();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  function isValidEmail(value) {
    return /\S+@\S+\.\S+/.test(value);
  }

  function handleLogin() {
    const cleanEmail =
      email.trim().toLowerCase();

    if (
      !cleanEmail ||
      !password.trim()
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

    setError("");

    setIsLoggedIn(true);

    if (device?.connected) {
      navigation.replace(
        ROUTES.HOME
      );
    } else {
      navigation.replace(
        ROUTES.CONNECT_DEVICE
      );
    }
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
        <View style={styles.logoArea}>
          <View style={styles.logoCircle}>
            <MaterialCommunityIcons
              name="medical-bag"
              size={38}
              color={COLORS.primary}
            />
          </View>

          <Text style={styles.brand}>
            ResQKit
          </Text>
        </View>

        <Text style={styles.title}>
          {t("auth.welcome")}
        </Text>

        <Text style={styles.subtitle}>
          {t("auth.signInSubtitle")}
        </Text>

        <View style={styles.form}>
          <View style={styles.input}>
            <InputField
              label={t("auth.email")}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              left={
                <TextInput.Icon
                  icon="email-outline"
                />
              }
              error={Boolean(error)}
            />
          </View>

          <View style={styles.input}>
            <InputField
              label={t("auth.password")}
              value={password}
              onChangeText={setPassword}
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
              error={Boolean(error)}
            />
          </View>

          {error ? (
            <Text style={styles.error}>
              {error}
            </Text>
          ) : null}

          <Text
            style={
            styles.forgotPassword
           }
            onPress={() =>
              navigation.navigate(
                ROUTES.FORGOT_PASSWORD
             )
            } 
          >
            {t("auth.forgotPassword")}
          </Text>

          <View style={styles.button}>
            <PrimaryButton
              title={t("auth.signIn")}
              onPress={handleLogin}
            />
          </View>

          <View
            style={
              styles.registerContainer
            }
          >
            <Text
              style={styles.registerText}
            >
              {t("auth.noAccount")}
            </Text>

            <Text
              style={styles.registerLink}
              onPress={() =>
                navigation.navigate(
                  ROUTES.REGISTER
                )
              }
            >
              {" "}
              {t("auth.register")}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
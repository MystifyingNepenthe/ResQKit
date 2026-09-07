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

import useApp from "../../hooks/useApp";

import { ROUTES } from "../../constants/routes";

import styles from "./loginScreen.styles";

export default function LoginScreen({ navigation }) {
  const { t } = useTranslation();

  const {
    setIsLoggedIn,
    device,
  } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  function handleLogin() {
    if (!email.trim() || !password.trim()) {
      setError(t("auth.completeRequiredFields"));
      return;
    }

    setError("");

    setIsLoggedIn(true);

    if (device?.connected) {
      navigation.replace(ROUTES.HOME);
    } else {
      navigation.replace(ROUTES.CONNECT_DEVICE);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>
          {t("auth.welcome")}
        </Text>

        <Text style={styles.subtitle}>
          {t("auth.signInSubtitle")}
        </Text>

        <View style={styles.input}>
          <InputField
            label={t("auth.email")}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.input}>
          <InputField
            label={t("auth.password")}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {error ? (
          <Text style={styles.error}>
            {error}
          </Text>
        ) : null}

        <View style={styles.button}>
          <PrimaryButton
            title={t("auth.signIn")}
            onPress={handleLogin}
          />
        </View>

        <Text
          style={styles.registerLink}
          onPress={() =>
            navigation.navigate(ROUTES.REGISTER)
          }
        >
          {t("auth.noAccount")} {t("auth.register")}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
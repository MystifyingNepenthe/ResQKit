import {
  useState,
} from "react";

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import {
  TextInput,
} from "react-native-paper";

import AppScreenHeader from "../../components/common/appScreenHeader/appScreenHeader";
import InputField from "../../components/input/inputFields";
import PrimaryButton from "../../components/buttons/primaryButtons";

import {
  COLORS,
} from "../../design";

import styles from "./forgotPassword.styles";

export default function ForgotPasswordScreen({
  navigation,
}) {
  const [
    email,
    setEmail,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  const [
    sent,
    setSent,
  ] = useState(false);

  function isValidEmail(value) {
    return /\S+@\S+\.\S+/.test(
      value
    );
  }

  function handleResetPassword() {
    const cleanEmail =
      email.trim().toLowerCase();

    if (!cleanEmail) {
      setError(
        "Introdu adresa de e-mail."
      );

      return;
    }

    if (
      !isValidEmail(
        cleanEmail
      )
    ) {
      setError(
        "Introdu o adresă de e-mail validă."
      );

      return;
    }

    setError("");
    setSent(true);
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <AppScreenHeader
        title="Resetare parolă"
        navigation={navigation}
        showMenu={false}
        showNotifications={false}
        showProfile={false}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
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
          {!sent ? (
            <>
              <View
                style={
                  styles.iconContainer
                }
              >
                <MaterialCommunityIcons
                  name="lock-reset"
                  size={44}
                  color={
                    COLORS.primary
                  }
                />
              </View>

              <Text
                style={
                  styles.title
                }
              >
                Ai uitat parola?
              </Text>

              <Text
                style={
                  styles.subtitle
                }
              >
                Introdu adresa de e-mail asociată contului tău ResQKit.
              </Text>

              <View
                style={
                  styles.input
                }
              >
                <InputField
                  label="Adresă de e-mail"
                  value={email}
                  onChangeText={
                    (value) => {
                      setEmail(
                        value
                      );

                      if (
                        error
                      ) {
                        setError(
                          ""
                        );
                      }
                    }
                  }
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={
                    Boolean(
                      error
                    )
                  }
                  left={
                    <TextInput.Icon
                      icon="email-outline"
                    />
                  }
                />
              </View>

              {error ? (
                <Text
                  style={
                    styles.error
                  }
                >
                  {error}
                </Text>
              ) : null}

              <PrimaryButton
                title="Trimite link de resetare"
                onPress={
                  handleResetPassword
                }
              />

              <Text
                style={
                  styles.helperText
                }
              >
                Vei primi instrucțiunile de resetare pe adresa introdusă.
              </Text>
            </>
          ) : (
            <View
              style={
                styles.successContainer
              }
            >
              <View
                style={
                  styles.successIcon
                }
              >
                <MaterialCommunityIcons
                  name="email-check-outline"
                  size={48}
                  color={
                    COLORS.success
                  }
                />
              </View>

              <Text
                style={
                  styles.title
                }
              >
                Verifică e-mailul
              </Text>

              <Text
                style={
                  styles.subtitle
                }
              >
                Dacă există un cont asociat adresei
              </Text>

              <Text
                style={
                  styles.email
                }
              >
                {email.trim()}
              </Text>

              <Text
                style={
                  styles.subtitle
                }
              >
                vei primi instrucțiuni pentru resetarea parolei.
              </Text>

              <View
                style={
                  styles.backButton
                }
              >
                <PrimaryButton
                  title="Înapoi la autentificare"
                  onPress={() =>
                    navigation.goBack()
                  }
                />
              </View>

              <Text
                style={
                  styles.resend
                }
                onPress={() => {
                  setSent(
                    false
                  );
                }}
              >
                Nu ai primit mesajul? Încearcă din nou
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
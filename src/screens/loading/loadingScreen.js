import { useEffect } from "react";

import {
  ActivityIndicator,
  Text,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import useApp from "../../hooks/useApp";

import {
  ROUTES,
} from "../../constants/routes";

import {
  COLORS,
} from "../../design";

import styles from "./loadingScreen.styles";

export default function LoadingScreen({
  navigation,
}) {
  const {
    isLoggedIn,
    device,
  } = useApp();

  useEffect(() => {
    const timer =
      setTimeout(() => {
        if (!isLoggedIn) {
          navigation.replace(
            ROUTES.LOGIN
          );

          return;
        }

        if (!device?.connected) {
          navigation.replace(
            ROUTES.CONNECT_DEVICE
          );

          return;
        }

        navigation.replace(
          ROUTES.HOME
        );
      }, 1400);

    return () =>
      clearTimeout(timer);
  }, [
    navigation,
    isLoggedIn,
    device?.connected,
  ]);

  return (
    <SafeAreaView
      style={styles.container}
    >
      <View
        style={styles.content}
      >
        <View
          style={styles.logoCircle}
        >
          <MaterialCommunityIcons
            name="medical-bag"
            size={42}
            color={COLORS.primary}
          />
        </View>

        <Text
          style={styles.title}
        >
          ResQKit
        </Text>

        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={styles.loader}
        />

        <Text
          style={styles.loadingText}
        >
          Pregătim aplicația...
        </Text>

        <Text
          style={styles.description}
        >
          Verificăm contul și conexiunea cu dispozitivul.
        </Text>
      </View>
    </SafeAreaView>
  );
}
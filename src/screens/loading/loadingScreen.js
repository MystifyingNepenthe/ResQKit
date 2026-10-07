import { useEffect } from "react";

import { Image, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { ActivityIndicator } from "react-native-paper";

import useApp from "../../hooks/useApp";

import { ROUTES } from "../../constants/routes";

import { COLORS } from "../../design";

import styles from "./loadingScreen.styles";

export default function LoadingScreen({ navigation }) {
  const {
    appReady,
    authReady,
    isLoggedIn,
  } = useApp();

  useEffect(() => {
    if (!appReady || !authReady) {
      return;
    }

    const timer = setTimeout(() => {
      navigation.replace(
        isLoggedIn ? ROUTES.HOME : ROUTES.LOGIN
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [
    appReady,
    authReady,
    isLoggedIn,
    navigation,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoCircle}>
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.logoImage}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.title}>
          ResQKit
        </Text>

        <Text style={styles.subtitle}>
          Se pregătește aplicația...
        </Text>

        <ActivityIndicator
          size="small"
          color={COLORS.primary}
          style={styles.loader}
        />
      </View>
    </SafeAreaView>
  );
}
import { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../../design";
import { ROUTES } from "../../constants/routes";

import styles from "./splashScreen.styles";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(ROUTES.LOADING);
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <MaterialCommunityIcons
              name="medical-bag"
              size={54}
              color={COLORS.white}
            />
          </View>

          <Text style={styles.logoText}>
            ResQKit
          </Text>

          <Text style={styles.tagline}>
            Asistență atunci când contează
          </Text>
        </View>
      </View>

      <Text style={styles.footer}>
        Siguranță. Ghidare. Rapiditate.
      </Text>
    </SafeAreaView>
  );
}
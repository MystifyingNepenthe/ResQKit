import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import PrimaryCard from "../../components/common/primaryCard";
import PrimaryButton from "../../components/buttons/primaryButtons";
import useApp from "../../hooks/useApp";
import useLocale from "../../hooks/useLocale";
import { connectDevice } from "../../services/deviceService";
import { COLORS } from "../../design";
import { ROUTES } from "../../constants/routes";
import styles from "./connectScreen.styles";

export default function ConnectDeviceScreen({ navigation }) {
  const { pick } = useLocale();
  const { device, setDevice } = useApp();
  const [isConnecting, setIsConnecting] = useState(false);

  async function handleConnect() {
    if (isConnecting) return;

    try {
      setIsConnecting(true);
      const result = await connectDevice();

      if (!result?.connected) {
        throw new Error("Device connection failed");
      }

      setDevice({
        ...device,
        connected: true,
        battery: device?.battery ?? 82,
        bluetooth: true,
        lastSync: new Date().toISOString(),
      });

      navigation.replace(ROUTES.HOME);
    } catch {
      Alert.alert(
        pick("Conectare nereușită", "Connection failed"),
        pick(
          "Nu am putut conecta dispozitivul ResQKit. Încearcă din nou.",
          "We could not connect the ResQKit device. Try again."
        )
      );
    } finally {
      setIsConnecting(false);
    }
  }

  function handleSkip() {
    setDevice({ ...device, connected: false });
    navigation.replace(ROUTES.HOME);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="bluetooth-connect"
            size={52}
            color={COLORS.primary}
          />
        </View>

        <Text style={styles.title}>
          {pick("Conectează ResQKit", "Connect ResQKit")}
        </Text>

        <Text style={styles.subtitle}>
          {pick(
            "Conectează dispozitivul la aplicație pentru a avea acces la starea bateriei, sincronizare și funcțiile ResQKit.",
            "Connect the device to the app to access battery status, synchronization, and ResQKit features."
          )}
        </Text>

        <PrimaryCard style={styles.card}>
          <View style={styles.deviceHeader}>
            <View style={styles.deviceIcon}>
              <MaterialCommunityIcons
                name="medical-bag"
                size={28}
                color={COLORS.primary}
              />
            </View>

            <View style={styles.deviceInfo}>
              <Text style={styles.cardTitle}>ResQKit</Text>
              <Text style={styles.deviceStatus}>
                {pick("Pregătit pentru conectare", "Ready to connect")}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.instructionRow}>
            <MaterialCommunityIcons name="bluetooth" size={20} color={COLORS.primary} />
            <Text style={styles.instructionText}>
              {pick("Activează Bluetooth pe telefon.", "Turn on Bluetooth on your phone.")}
            </Text>
          </View>

          <View style={styles.instructionRow}>
            <MaterialCommunityIcons name="power" size={20} color={COLORS.primary} />
            <Text style={styles.instructionText}>
              {pick(
                "Asigură-te că dispozitivul ResQKit este pornit.",
                "Make sure the ResQKit device is powered on."
              )}
            </Text>
          </View>

          <View style={styles.instructionRow}>
            <MaterialCommunityIcons name="access-point" size={20} color={COLORS.primary} />
            <Text style={styles.instructionText}>
              {pick(
                "Ține dispozitivul aproape de telefon.",
                "Keep the device close to your phone."
              )}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton
              title={
                isConnecting
                  ? pick("Se conectează...", "Connecting...")
                  : pick("Conectează ResQKit", "Connect ResQKit")
              }
              onPress={handleConnect}
              loading={isConnecting}
              disabled={isConnecting}
            />
          </View>
        </PrimaryCard>

        <Text
          style={[styles.skip, isConnecting && styles.skipDisabled]}
          onPress={isConnecting ? undefined : handleSkip}
        >
          {pick("Continuă fără dispozitiv", "Continue without device")}
        </Text>

        <Text style={styles.skipDescription}>
          {pick(
            "Poți conecta ResQKit mai târziu din aplicație.",
            "You can connect ResQKit later from the app."
          )}
        </Text>
      </View>
    </SafeAreaView>
  );
}

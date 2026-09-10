import { useState } from "react";

import {
  Alert,
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

import PrimaryCard from "../../components/common/primaryCard";
import PrimaryButton from "../../components/buttons/primaryButtons";

import useApp from "../../hooks/useApp";

import {
  connectDevice,
} from "../../services/deviceService";

import {
  COLORS,
} from "../../design";

import {
  ROUTES,
} from "../../constants/routes";

import styles from "./connectScreen.styles";

export default function ConnectDeviceScreen({
  navigation,
}) {
  const { t } = useTranslation();

  const {
    device,
    setDevice,
  } = useApp();

  const [
    isConnecting,
    setIsConnecting,
  ] = useState(false);

  async function handleConnect() {
    if (isConnecting) {
      return;
    }

    try {
      setIsConnecting(true);

      const result =
        await connectDevice();

      if (!result?.connected) {
        throw new Error(
          "Device connection failed"
        );
      }

      setDevice({
        ...device,

        connected: true,

        battery:
          device?.battery ?? 82,

        bluetooth: true,

        lastSync:
          new Date().toISOString(),
      });

      navigation.replace(
        ROUTES.HOME
      );
    } catch (error) {
      Alert.alert(
        "Conectare nereușită",
        "Nu am putut conecta dispozitivul ResQKit. Încearcă din nou."
      );
    } finally {
      setIsConnecting(false);
    }
  }

  function handleSkip() {
    setDevice({
      ...device,
      connected: false,
    });

    navigation.replace(
      ROUTES.HOME
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <View style={styles.content}>
        <View
          style={
            styles.iconContainer
          }
        >
          <MaterialCommunityIcons
            name="bluetooth-connect"
            size={52}
            color={COLORS.primary}
          />
        </View>

        <Text style={styles.title}>
          Conectează ResQKit
        </Text>

        <Text style={styles.subtitle}>
          Conectează dispozitivul la aplicație pentru a avea acces la starea bateriei, sincronizare și funcțiile ResQKit.
        </Text>

        <PrimaryCard
          style={styles.card}
        >
          <View
            style={
              styles.deviceHeader
            }
          >
            <View
              style={
                styles.deviceIcon
              }
            >
              <MaterialCommunityIcons
                name="medical-bag"
                size={28}
                color={
                  COLORS.primary
                }
              />
            </View>

            <View
              style={
                styles.deviceInfo
              }
            >
              <Text
                style={
                  styles.cardTitle
                }
              >
                ResQKit
              </Text>

              <Text
                style={
                  styles.deviceStatus
                }
              >
                Pregătit pentru conectare
              </Text>
            </View>
          </View>

          <View
            style={
              styles.divider
            }
          />

          <View
            style={
              styles.instructionRow
            }
          >
            <MaterialCommunityIcons
              name="bluetooth"
              size={20}
              color={
                COLORS.primary
              }
            />

            <Text
              style={
                styles.instructionText
              }
            >
              Activează Bluetooth pe telefon.
            </Text>
          </View>

          <View
            style={
              styles.instructionRow
            }
          >
            <MaterialCommunityIcons
              name="power"
              size={20}
              color={
                COLORS.primary
              }
            />

            <Text
              style={
                styles.instructionText
              }
            >
              Asigură-te că dispozitivul ResQKit este pornit.
            </Text>
          </View>

          <View
            style={
              styles.instructionRow
            }
          >
            <MaterialCommunityIcons
              name="access-point"
              size={20}
              color={
                COLORS.primary
              }
            />

            <Text
              style={
                styles.instructionText
              }
            >
              Ține dispozitivul aproape de telefon.
            </Text>
          </View>

          <View
            style={
              styles.buttonContainer
            }
          >
            <PrimaryButton
              title={
                isConnecting
                  ? "Se conectează..."
                  : "Conectează ResQKit"
              }
              onPress={
                handleConnect
              }
              loading={
                isConnecting
              }
              disabled={
                isConnecting
              }
            />
          </View>
        </PrimaryCard>

        <Text
          style={[
            styles.skip,
            isConnecting &&
              styles.skipDisabled,
          ]}
          onPress={
            isConnecting
              ? undefined
              : handleSkip
          }
        >
          Continuă fără dispozitiv
        </Text>

        <Text
          style={
            styles.skipDescription
          }
        >
          Poți conecta ResQKit mai târziu din aplicație.
        </Text>
      </View>
    </SafeAreaView>
  );
}
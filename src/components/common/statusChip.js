import { View } from "react-native";

import { Text } from "react-native-paper";

import styles from "./statusChip.styles";

import { COLORS } from "../../design";

export default function StatusChip({
  connected = false,
}) {
  return (
    <View
      style={[
        styles.chip,
        {
          backgroundColor: connected
            ? COLORS.success
            : COLORS.error,
        },
      ]}
    >
      <Text style={styles.text}>
        {connected ? "Connected" : "Disconnected"}
      </Text>
    </View>
  );
}
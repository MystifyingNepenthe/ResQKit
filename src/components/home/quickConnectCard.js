import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { TouchableOpacity, View } from "react-native";

import { Text } from "react-native-paper";

import styles from "./quickConnectCard.styles";

export default function QuickConnectCard({
  connected = false,
  onPress,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.card}
    >
      <Text style={styles.title}>
        Quick Connect
      </Text>

      <Text style={styles.subtitle}>
        Connect to your ResQKit device
      </Text>

      <View style={styles.row}>

        <MaterialCommunityIcons
          name={connected ? "bluetooth-connect" : "bluetooth-off"}
          size={34}
          color="white"
        />

        <Text
          style={{
            color: "white",
            fontWeight: "700",
            fontSize: 16,
          }}
        >
          {connected ? "Connected" : "Tap to Connect"}
        </Text>

      </View>

    </TouchableOpacity>
  );
}
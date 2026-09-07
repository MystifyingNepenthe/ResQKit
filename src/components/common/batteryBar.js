import { View } from "react-native";

import { Text } from "react-native-paper";

import styles from "./batteryBar.styles";

import { COLORS } from "../../design";

export default function BatteryBar({
  percentage = 0,
}) {
  const color =
    percentage > 60
      ? COLORS.success
      : percentage > 20
      ? "#F6C344"
      : COLORS.error;

  return (
    <View style={styles.container}>

      <View style={styles.background}>
        <View
          style={[
            styles.fill,
            {
              width: `${percentage}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>

      <Text style={styles.text}>
        {percentage}% Battery
      </Text>

    </View>
  );
}
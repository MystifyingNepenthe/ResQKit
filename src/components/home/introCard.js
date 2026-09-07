import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { TouchableOpacity, View, Text } from "react-native";

import styles from "./introCard.styles";

export default function IntroTutorialCard({ onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.card}
    >
      <View style={styles.imageContainer}>
        <MaterialCommunityIcons
          name="play-circle"
          size={60}
          color="white"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          Introductory Tutorial
        </Text>

        <Text style={styles.subtitle}>
          Learn how to use your ResQKit device.
        </Text>

        <View style={styles.footer}>
          <Text style={styles.duration}>
            ⏱ 3 min
          </Text>

        </View>
      </View>
    </TouchableOpacity>
  );
}
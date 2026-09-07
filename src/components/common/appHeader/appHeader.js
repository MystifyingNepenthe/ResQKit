import { View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../../../design";

import styles from "./appHeader.styles";

export default function AppHeader({
  title,
  onMenuPress,
  onNotificationPress,
  onProfilePress,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onMenuPress}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="menu"
            size={28}
            color={COLORS.text}
          />
        </TouchableOpacity>

        <Text
          style={styles.title}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onNotificationPress}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="bell-outline"
            size={25}
            color={COLORS.text}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={onProfilePress}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={30}
            color={COLORS.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
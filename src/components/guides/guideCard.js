import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import PrimaryCard from "../common/primaryCard";

import { COLORS } from "../../design";

import styles from "./guideCard.styles";

export default function GuideCard({
  title,
  icon = "file-document-outline",
  onPress,
}) {
  return (
    <Pressable onPress={onPress}>
      <PrimaryCard style={styles.card}>
        <View style={styles.content}>

          <View style={styles.left}>
            <MaterialCommunityIcons
              name={icon}
              size={24}
              color={COLORS.primary}
            />

            <Text style={styles.title}>
              {title}
            </Text>
          </View>

          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={COLORS.textSecondary}
          />

        </View>
      </PrimaryCard>
    </Pressable>
  );
}
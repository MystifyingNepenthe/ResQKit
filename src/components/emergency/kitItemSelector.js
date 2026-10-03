import { Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { KIT_ITEMS, getKitItemLabel } from "../../data/kitItems";
import { COLORS } from "../../design";
import styles from "./kitItemSelector.styles";

export default function KitItemSelector({
  selected = [],
  onToggle,
  language = "ro",
  items = KIT_ITEMS,
}) {
  return (
    <View style={styles.container}>
      {items.map((item) => {
        const active = selected.includes(item.code);

        return (
          <Pressable
            key={item.code}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: active }}
            onPress={() => onToggle?.(item.code)}
            style={({ pressed }) => [
              styles.item,
              active && styles.itemActive,
              pressed && styles.itemPressed,
            ]}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={18}
              color={active ? COLORS.white : COLORS.primary}
            />
            <Text style={[styles.label, active && styles.labelActive]}>
              {getKitItemLabel(item.code, language)}
            </Text>
            {active ? (
              <MaterialCommunityIcons
                name="check-circle"
                size={18}
                color={COLORS.white}
              />
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

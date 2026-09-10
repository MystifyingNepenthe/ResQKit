import {
  Pressable,
  Text,
  View,
} from "react-native";

import styles from "./historySwitcher.styles";

const OPTIONS = [
  {
    id: "interventions",
    label: "Intervenții",
  },
  {
    id: "operators",
    label: "Date trimise",
  },
  {
    id: "ai",
    label: "Conversații AI",
  },
];

export default function HistorySwitcher({
  selected,
  onChange,
}) {
  return (
    <View style={styles.container}>
      {OPTIONS.map((option) => {
        const isSelected =
          selected === option.id;

        return (
          <Pressable
            key={option.id}
            style={[
              styles.button,
              isSelected &&
                styles.active,
            ]}
            onPress={() =>
              onChange(option.id)
            }
          >
            <Text
              numberOfLines={2}
              style={[
                styles.text,
                isSelected &&
                  styles.activeText,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
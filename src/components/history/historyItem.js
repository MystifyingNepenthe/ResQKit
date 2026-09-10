import {
  Text,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import {
  COLORS,
} from "../../design";

import styles from "./historyItem.styles";

function getIcon(type) {
  switch (type) {
    case "intervention":
      return "car-emergency";

    case "operator":
      return "account-voice";

    case "ai":
      return "robot-outline";

    default:
      return "history";
  }
}

export default function HistoryItem({
  item,
}) {
  if (!item) {
    return null;
  }

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View
          style={styles.iconContainer}
        >
          <MaterialCommunityIcons
            name={getIcon(item.type)}
            size={24}
            color={COLORS.primary}
          />
        </View>

        <View style={styles.headerContent}>
          <Text style={styles.title}>
            {item.title}
          </Text>

          <Text style={styles.date}>
            {item.date} • {item.time}
          </Text>
        </View>
      </View>

      <Text style={styles.description}>
        {item.description}
      </Text>

      {item.status ? (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            {item.status}
          </Text>
        </View>
      ) : null}

      {Array.isArray(item.details) &&
        item.details.length > 0 && (
          <View
            style={styles.detailsContainer}
          >
            {item.details.map(
              (detail, index) => (
                <View
                  key={`${item.id}-${index}`}
                  style={styles.detailRow}
                >
                  <View
                    style={styles.bullet}
                  />

                  <Text
                    style={
                      styles.detailText
                    }
                  >
                    {detail}
                  </Text>
                </View>
              )
            )}
          </View>
        )}
    </View>
  );
}
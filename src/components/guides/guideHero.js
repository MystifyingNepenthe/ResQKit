import {
  Image,
  Text,
  View,
} from "react-native";

import {
  GUIDE_IMAGES,
} from "../../../assets/guides/";

import styles from "./guideHero.styles";

export default function GuideHero({
  categoryId,
  title,
  compact = false,
}) {
  const image =
    GUIDE_IMAGES[categoryId];

  if (!image) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        compact &&
          styles.compact,
      ]}
    >
      <Image
        source={image}
        style={styles.image}
        resizeMode="cover"
      />

      {!compact && title ? (
        <View
          style={styles.overlay}
        >
          <Text
            style={styles.title}
            numberOfLines={2}
          >
            {title}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
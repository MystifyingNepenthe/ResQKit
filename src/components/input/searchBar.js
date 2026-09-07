import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import {
  View,
  TextInput,
} from "react-native";

import styles from "./searchBar.styles";

export default function SearchBar({
  value,
  onChangeText,
}) {
  return (
    <View style={styles.container}>

      <MaterialCommunityIcons
        name="magnify"
        size={22}
        color="#808080"
      />

      <TextInput
        style={styles.input}
        placeholder="Caută ghiduri de prim ajutor..."
        value={value}
        onChangeText={onChangeText}
      />

    </View>
  );
}
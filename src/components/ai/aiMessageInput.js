import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";

import { COLORS } from "../../design";

import styles from "./aiMessageInput.styles";

export default function AIMessageInput({
  onSend,
  onCameraPress,
  onAttachmentPress,
}) {
  const [message, setMessage] = useState("");

  const { t } = useTranslation();

  function handleSend() {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    onSend?.(trimmedMessage);

    setMessage("");
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onAttachmentPress}
        >
          <MaterialCommunityIcons
            name="paperclip"
            size={23}
            color={COLORS.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={onCameraPress}
        >
          <MaterialCommunityIcons
            name="camera-outline"
            size={23}
            color={COLORS.textSecondary}
          />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder={t("ai.messagePlaceholder")}
          placeholderTextColor={COLORS.textSecondary}
          value={message}
          onChangeText={setMessage}
          multiline
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
        >
          <MaterialCommunityIcons
            name="send"
            size={21}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
import { useState } from "react";

import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import AppHeader from "../../components/common/appHeader/appHeader";

import AIEmptyState from "../../components/ai/aiEmptyState";
import AIMessageInput from "../../components/ai/aiMessageInput";
import AIChatBubble from "../../components/ai/aiChatBubble";

import QuickActionsSection from "../../sections/ai/quickActionSection";

import { sendMockAIMessage } from "../../services/mockAiService";

import { ROUTES } from "../../constants/routes";

import styles from "./aiScreen.styles";

export default function AIScreen({ navigation }) {
  const { t } = useTranslation();

  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);

  async function handleSend(text) {
    const userMessage = {
      role: "user",
      content: text,
    };

    const nextMessages = [
      ...messages,
      userMessage,
    ];

    setMessages(nextMessages);
    setSending(true);

    try {
      const response =
        await sendMockAIMessage(nextMessages);

      const aiMessage = {
        role: "assistant",
        content: response.reply,
      };

      setMessages([
        ...nextMessages,
        aiMessage,
      ]);
    } catch (error) {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "Momentan nu pot genera un răspuns. Încearcă din nou.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  function handleAnalyzeWound() {
    handleSend(
      "Vreau să analizez o rană."
    );
  }

  function handleFirstAid() {
    handleSend(
      "Am nevoie de ajutor de prim ajutor."
    );
  }

  function handleCheckResQKit() {
    handleSend(
      "Ajută-mă să verific ResQKit."
    );
  }

  function handleAskQuestion() {
    handleSend(
      "Am o întrebare."
    );
  }

  function handleCameraPress() {
    console.log("Deschide camera");
  }

  function handleAttachmentPress() {
    console.log("Deschide galeria");
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title={t("ai.title")}
        onMenuPress={() => {}}
        onNotificationPress={() => {}}
        onProfilePress={() =>
          navigation.navigate(ROUTES.ACCOUNT)
        }
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {messages.length === 0 ? (
          <>
            <AIEmptyState />

            <QuickActionsSection
              onAnalyzeWound={handleAnalyzeWound}
              onFirstAid={handleFirstAid}
              onCheckResQKit={handleCheckResQKit}
              onAskQuestion={handleAskQuestion}
            />
          </>
        ) : (
          messages.map((message, index) => (
            <AIChatBubble
              key={`${message.role}-${index}`}
              role={message.role}
              message={message.content}
            />
          ))
        )}

        {sending && (
          <AIChatBubble
            role="assistant"
            message="Se generează răspunsul..."
          />
        )}
      </ScrollView>

      <AIMessageInput
        onSend={handleSend}
        onCameraPress={handleCameraPress}
        onAttachmentPress={handleAttachmentPress}
      />
    </SafeAreaView>
  );
}
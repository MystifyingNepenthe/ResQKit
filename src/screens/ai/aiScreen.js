import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Alert,
  ScrollView,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import AppScreenHeader from "../../components/common/appScreenHeader/appScreenHeader";

import AIEmptyState from "../../components/ai/aiEmptyState";
import AIMessageInput from "../../components/ai/aiMessageInput";
import AIChatBubble from "../../components/ai/aiChatBubble";

import QuickActionsSection from "../../sections/ai/quickActionSection";

import {
  sendMockAIMessage,
} from "../../services/mockAiService";

import styles from "./aiScreen.styles";

export default function AIScreen({
  navigation,
}) {
  const scrollViewRef =
    useRef(null);

  const [messages, setMessages] =
    useState([]);

  const [sending, setSending] =
    useState(false);

  useEffect(() => {
    if (messages.length === 0) {
      return;
    }

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({
        animated: true,
      });
    }, 100);
  }, [messages, sending]);

  async function handleSend(text) {
    if (sending) {
      return;
    }

    const cleanText =
      text?.trim();

    if (!cleanText) {
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: cleanText,
    };

    const nextMessages = [
      ...messages,
      userMessage,
    ];

    setMessages(nextMessages);
    setSending(true);

    try {
      const response =
        await sendMockAIMessage(
          nextMessages
        );

      const aiMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content:
          response?.reply ||
          "Momentan nu pot genera un răspuns.",
      };

      setMessages([
        ...nextMessages,
        aiMessage,
      ]);
    } catch (error) {
      setMessages([
        ...nextMessages,
        {
          id: `error-${Date.now()}`,
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
      "Vreau ajutor pentru evaluarea unei răni."
    );
  }

  function handleFirstAid() {
    handleSend(
      "Am nevoie de informații de prim ajutor."
    );
  }

  function handleCheckResQKit() {
    handleSend(
      "Ajută-mă să verific starea ResQKit."
    );
  }

  function handleAskQuestion() {
    handleSend(
      "Am o întrebare despre ResQKit."
    );
  }

  function handleCameraPress() {
    Alert.alert(
      "Fotografie",
      "Funcția de analiză a fotografiilor va fi conectată ulterior."
    );
  }

  function handleAttachmentPress() {
    Alert.alert(
      "Atașament",
      "Încărcarea fișierelor va fi conectată ulterior."
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <AppScreenHeader
        title="Asistent AI"
        navigation={navigation}
        showMenu={false}
      />

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          messages.length === 0 &&
            styles.emptyContent,
        ]}
        showsVerticalScrollIndicator={
          false
        }
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() => {
          if (messages.length > 0) {
            scrollViewRef.current?.scrollToEnd({
              animated: true,
            });
          }
        }}
      >
        {messages.length === 0 ? (
          <>
            <AIEmptyState />

            <QuickActionsSection
              onAnalyzeWound={
                handleAnalyzeWound
              }
              onFirstAid={
                handleFirstAid
              }
              onCheckResQKit={
                handleCheckResQKit
              }
              onAskQuestion={
                handleAskQuestion
              }
            />
          </>
        ) : (
          messages.map(
            (message) => (
              <AIChatBubble
                key={message.id}
                role={message.role}
                message={
                  message.content
                }
              />
            )
          )
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
        onCameraPress={
          handleCameraPress
        }
        onAttachmentPress={
          handleAttachmentPress
        }
        disabled={sending}
      />
    </SafeAreaView>
  );
}
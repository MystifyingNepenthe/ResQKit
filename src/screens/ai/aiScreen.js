import { useEffect, useRef, useState } from "react";
import { Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppScreenHeader from "../../components/common/appScreenHeader/appScreenHeader";
import AIEmptyState from "../../components/ai/aiEmptyState";
import AIMessageInput from "../../components/ai/aiMessageInput";
import AIChatBubble from "../../components/ai/aiChatBubble";
import QuickActionsSection from "../../sections/ai/quickActionSection";
import useLocale from "../../hooks/useLocale";
import { sendAIMessage, saveAIConversation } from "../../services/aiService";
import styles from "./aiScreen.styles";

export default function AIScreen({ navigation }) {
  const { language, pick } = useLocale();
  const scrollViewRef = useRef(null);
  const conversationIdRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!messages.length) return undefined;
    const timer = setTimeout(
      () => scrollViewRef.current?.scrollToEnd({ animated: true }),
      100
    );
    return () => clearTimeout(timer);
  }, [messages, sending]);

  async function handleSend(text) {
    if (sending) return;
    const cleanText = text?.trim();
    if (!cleanText) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: cleanText,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setSending(true);

    try {
      const response = await sendAIMessage(nextMessages, language);
      const finalMessages = [
        ...nextMessages,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content:
            response?.reply ||
            pick(
              "Momentan nu pot genera un răspuns.",
              "I cannot generate a response right now."
            ),
        },
      ];
      setMessages(finalMessages);
      conversationIdRef.current = await saveAIConversation(
        finalMessages,
        conversationIdRef.current,
        language
      );
    } catch (error) {
      const finalMessages = [
        ...nextMessages,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content:
            error?.message ||
            pick(
              "Momentan nu pot genera un răspuns. Verifică backend-ul și încearcă din nou.",
              "I cannot generate a response right now. Check the backend and try again."
            ),
        },
      ];
      setMessages(finalMessages);
      conversationIdRef.current = await saveAIConversation(
        finalMessages,
        conversationIdRef.current,
        language
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppScreenHeader
        title={pick("Asistent AI", "AI Assistant")}
        navigation={navigation}
        showMenu={false}
      />

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          messages.length === 0 && styles.emptyContent,
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {messages.length === 0 ? (
          <>
            <AIEmptyState />
            <QuickActionsSection
              onAnalyzeWound={() =>
                handleSend(
                  pick(
                    "Vreau ajutor pentru evaluarea unei răni. Dacă este o urgență activă, spune-mi clar să apelez 112.",
                    "I want help assessing a wound. If this is an active emergency, clearly tell me to call 112."
                  )
                )
              }
              onFirstAid={() =>
                handleSend(
                  pick(
                    "Am nevoie de informații generale de prim ajutor.",
                    "I need general first-aid information."
                  )
                )
              }
              onCheckResQKit={() =>
                handleSend(
                  pick(
                    "Ajută-mă să verific ce pot face cu ResQKit și aplicația.",
                    "Help me check what I can do with ResQKit and the app."
                  )
                )
              }
              onAskQuestion={() =>
                handleSend(
                  pick(
                    "Am o întrebare despre ResQKit.",
                    "I have a question about ResQKit."
                  )
                )
              }
            />
          </>
        ) : (
          messages.map((message) => (
            <AIChatBubble
              key={message.id}
              role={message.role}
              message={message.content}
            />
          ))
        )}

        {sending ? (
          <AIChatBubble
            role="assistant"
            message={pick("Se generează răspunsul...", "Generating response...")}
          />
        ) : null}
      </ScrollView>

      <AIMessageInput
        onSend={handleSend}
        onCameraPress={() =>
          Alert.alert(
            pick("Cameră", "Camera"),
            pick(
              "Analiza foto din backend este folosită pentru recunoașterea materialelor ResQKit în fluxul de intervenție.",
              "Backend photo analysis is used to recognize ResQKit materials during the intervention flow."
            )
          )
        }
        onAttachmentPress={() =>
          Alert.alert(
            pick("Atașamente", "Attachments"),
            pick(
              "Endpoint-ul de chat actual primește mesaje text. Atașamentele nu sunt trimise către chat.",
              "The current chat endpoint accepts text messages. Attachments are not sent to chat."
            )
          )
        }
        disabled={sending}
      />
    </SafeAreaView>
  );
}

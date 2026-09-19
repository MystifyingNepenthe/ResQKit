import {
  useCallback,
  useEffect,
  useMemo,
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

import {
  useAgent,
  useCopilotKit,
} from "@copilotkit/react-native/headless";


import AppScreenHeader from "../../components/common/appScreenHeader/appScreenHeader";
import AIEmptyState from "../../components/ai/aiEmptyState";
import AIMessageInput from "../../components/ai/aiMessageInput";
import AIChatBubble from "../../components/ai/aiChatBubble";

import QuickActionsSection from "../../sections/ai/quickActionSection";

import useLocale from "../../hooks/useLocale";

import {
  saveAIConversation,
} from "../../services/aiService";

import styles from "./aiScreen.styles";


export default function AIScreen({ navigation }) {
  const { language, pick } = useLocale();

  const scrollViewRef = useRef(null);
  const conversationIdRef = useRef(null);

  const [connectionError, setConnectionError] = useState(null);

  const { copilotkit } = useCopilotKit();

  const {
    agent,
    isReady,
  } = useAgent({
    agentId: "default",
  });


  const messages = useMemo(() => {
    if (!agent?.messages) {
      return [];
    }

    return agent.messages.flatMap((message) => {
      const isChatMessage =
        message.role === "user" ||
        message.role === "assistant";

      if (
        !isChatMessage ||
        typeof message.content !== "string" ||
        !message.content.trim()
      ) {
        return [];
      }

      return [
        {
          id:
            message.id ||
            `${message.role}-${Math.random()}`,
          role: message.role,
          content: message.content,
        },
      ];
    });
  }, [agent?.messages]);


  const sending = agent?.isRunning ?? false;


  useEffect(() => {
    if (!messages.length && !connectionError) {
      return undefined;
    }

    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({
        animated: true,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [messages, sending, connectionError]);


  useEffect(() => {
    if (
      sending ||
      !messages.length
    ) {
      return;
    }

    async function saveConversation() {
      try {
        conversationIdRef.current =
          await saveAIConversation(
            messages,
            conversationIdRef.current,
            language
          );
      } catch (error) {
        console.log(
          "AI conversation save error:",
          error
        );
      }
    }

    saveConversation();
  }, [messages, sending, language]);


  const handleSend = useCallback(
    async (text) => {
      const cleanText = text?.trim();

      if (
        !cleanText ||
        sending ||
        !isReady ||
        !agent
      ) {
        return;
      }

      setConnectionError(null);

      agent.addMessage({
        id: `user-${Date.now()}`,
        role: "user",
        content: cleanText,
      });

      try {
        await copilotkit.runAgent({
          agent,
        });
      } catch (error) {
        console.log(
          "ResQ AI error:",
          error
        );

        setConnectionError(
          pick(
            "Nu mă pot conecta momentan la ResQ AI. Verifică dacă serverul local și Ollama sunt pornite.",
            "I cannot connect to ResQ AI right now. Check that the local server and Ollama are running."
          )
        );
      }
    },
    [
      agent,
      copilotkit,
      isReady,
      sending,
      pick,
    ]
  );


  return (
    <SafeAreaView style={styles.container}>
      <AppScreenHeader
        title={pick(
          "Asistent AI",
          "AI Assistant"
        )}
        navigation={navigation}
        showMenu={false}
      />

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          messages.length === 0 &&
            !connectionError &&
            styles.emptyContent,
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {messages.length === 0 &&
        !connectionError ? (
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
          <>
            {messages.map((message) => (
              <AIChatBubble
                key={message.id}
                role={message.role}
                message={message.content}
              />
            ))}

            {connectionError ? (
              <AIChatBubble
                role="assistant"
                message={connectionError}
              />
            ) : null}
          </>
        )}

        {sending ? (
          <AIChatBubble
            role="assistant"
            message={pick(
              "Se generează răspunsul...",
              "Generating response..."
            )}
          />
        ) : null}
      </ScrollView>

      <AIMessageInput
        onSend={handleSend}

        onCameraPress={() =>
          Alert.alert(
            pick(
              "Cameră",
              "Camera"
            ),
            pick(
              "Analiza foto va fi conectată ulterior la ResQ AI.",
              "Photo analysis will be connected to ResQ AI later."
            )
          )
        }

        onAttachmentPress={() =>
          Alert.alert(
            pick(
              "Atașamente",
              "Attachments"
            ),
            pick(
              "Atașamentele vor fi conectate ulterior la ResQ AI.",
              "Attachments will be connected to ResQ AI later."
            )
          )
        }

        disabled={
          sending ||
          !isReady
        }
      />
    </SafeAreaView>
  );
}
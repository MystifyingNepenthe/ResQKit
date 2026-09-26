import React from "react";

import "./src/localization/i18n";

import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { CopilotKitProvider } from "@copilotkit/react-native/headless";

import AppProvider from "./src/store/appProvider";
import RootNavigator from "./src/navigation/rootNavigator";
import { navigationRef } from "./src/navigation/navigationRef";

import ResQAITools from "./src/ai/ResQaiTools";
import EmergencyAIContext from "./src/ai/EmergencyAIContext";
import KnowledgeAIContext from "./src/ai/KnowledgeAIContext";

import { theme } from "./src/design";

const RUNTIME_URL =
  "http://192.168.0.20:8200/api/copilotkit";

export default function App() {
  return (
    <CopilotKitProvider
      runtimeUrl={RUNTIME_URL}
      onError={(error) => {
        console.log(
          "CopilotKit error:",
          error
        );
      }}
    >
      <PaperProvider theme={theme}>
        <AppProvider>
          <NavigationContainer
            ref={navigationRef}
          >
            <RootNavigator />
          </NavigationContainer>

          <ResQAITools />

          <EmergencyAIContext />

          <KnowledgeAIContext />
        </AppProvider>
      </PaperProvider>
    </CopilotKitProvider>
  );
}
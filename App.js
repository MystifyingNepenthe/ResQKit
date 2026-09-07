import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";

import RootNavigator from "./src/navigation/rootNavigator";
import { theme } from "./src/design/theme";
import AppProvider from "./src/store/appProvider";
import "./src/localization/i18n";

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AppProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AppProvider>
    </PaperProvider>
  );
}
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

import theme from "./src/design/theme";
import RootNavigator from "./src/navigation/rootNavigator";

export default function App() {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        </PaperProvider>
    );
}
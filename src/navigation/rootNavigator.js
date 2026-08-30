import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/splash/splashScreen";

import LoadingScreen from "../screens/loading/loadingScreen";

import LoginScreen from "../screens/auth/loginScreen";
import RegisterScreen from "../screens/auth/registerScreen";
import AccountScreen from "../screens/auth/accountScreen";

import HomeScreen from "../screens/home/homeScreen";

import ConnectDeviceScreen from "../screens/device/connectScreen";

import AIScreen from "../screens/ai/aiScreen";

import HistoryScreen from "../screens/history/historyScreen";

import GuidesScreen from "../screens/tutorials/guidesScreen";
import AppTutorialScreen from "../screens/tutorials/tutorialsScreen";

import SettingsScreen from "../screens/settings/settingsScreen";
import FAQScreen from "../screens/settings/faqScreen";
import ContactScreen from "../screens/settings/contactScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      {/* Startup */}
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />

      <Stack.Screen
        name="Loading"
        component={LoadingScreen}
      />

      {/* Auth */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />

      <Stack.Screen
        name="Account"
        component={AccountScreen}
      />

      {/* Home */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />

      {/* Device */}
      <Stack.Screen
        name="ConnectDevice"
        component={ConnectDeviceScreen}
      />

      {/* AI */}
      <Stack.Screen
        name="AI"
        component={AIScreen}
      />

      {/* History */}
      <Stack.Screen
        name="History"
        component={HistoryScreen}
      />

      {/* Tutorials */}
      <Stack.Screen
        name="Guides"
        component={GuidesScreen}
      />

      <Stack.Screen
        name="AppTutorial"
        component={AppTutorialScreen}
      />

      {/* Settings */}
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />

      <Stack.Screen
        name="FAQ"
        component={FAQScreen}
      />

      <Stack.Screen
        name="Contact"
        component={ContactScreen}
      />
    </Stack.Navigator>
  );
}
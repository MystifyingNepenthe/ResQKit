import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/splash/splashScreen";
import LoadingScreen from "../screens/loading/loadingScreen";

import LoginScreen from "../screens/auth/loginScreen";
import RegisterScreen from "../screens/auth/registerScreen";

import AccountScreen from "../screens/settings/accountScreen";

import ConnectDeviceScreen from "../screens/device/connectScreen";

import AIScreen from "../screens/ai/aiScreen";
import HistoryScreen from "../screens/history/historyScreen";

import MainTabNavigator from "./mainTabNavigator";

import LanguageScreen from "../screens/settings/languageScreen";
import DeviceInfoScreen from "../screens/settings/deviceInfoScreen";

import { ROUTES } from "../constants/routes";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.SPLASH}
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name={ROUTES.SPLASH}
        component={SplashScreen}
      />

      <Stack.Screen
        name={ROUTES.LOADING}
        component={LoadingScreen}
      />

      <Stack.Screen
        name={ROUTES.LOGIN}
        component={LoginScreen}
      />

      <Stack.Screen
        name={ROUTES.REGISTER}
        component={RegisterScreen}
      />

      <Stack.Screen
        name={ROUTES.ACCOUNT}
        component={AccountScreen}
      />

      <Stack.Screen
        name={ROUTES.HOME}
        component={MainTabNavigator}
      />

      <Stack.Screen
        name={ROUTES.CONNECT_DEVICE}
        component={ConnectDeviceScreen}
      />

      <Stack.Screen
        name={ROUTES.AI}
        component={AIScreen}
      />

      <Stack.Screen
        name={ROUTES.HISTORY}
        component={HistoryScreen}
      />

      <Stack.Screen
        name={ROUTES.LANGUAGE}
        component={LanguageScreen}
      />

      <Stack.Screen
        name={ROUTES.DEVICE_INFO}
        component={DeviceInfoScreen}
      />
    </Stack.Navigator>
  );
}
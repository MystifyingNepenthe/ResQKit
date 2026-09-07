import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";

import HomeScreen from "../screens/home/homeScreen";
import VehicleScreen from "../screens/vehicle/vehicleScreen";
import GuidesScreen from "../screens/tutorials/guidesScreen";
import SettingsScreen from "../screens/settings/settingsScreen";

import { COLORS } from "../design";
import { ROUTES } from "../constants/routes";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,

        tabBarStyle: {
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          backgroundColor: COLORS.white,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },

        tabBarIcon: ({ color, size }) => {
          let icon;

          switch (route.name) {
            case ROUTES.HOME:
              icon = "home";
              break;

            case ROUTES.VEHICLE:
              icon = "car-estate";
              break;

            case ROUTES.GUIDES:
              icon = "book-open-page-variant";
              break;

            case ROUTES.SETTINGS:
              icon = "cog";
              break;

            default:
              icon = "circle";
          }

          return (
            <MaterialCommunityIcons
              name={icon}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{
          title: t("navigation.home"),
        }}
      />

      <Tab.Screen
        name={ROUTES.VEHICLE}
        component={VehicleScreen}
        options={{
          title: t("navigation.vehicle"),
        }}
      />

      <Tab.Screen
        name={ROUTES.GUIDES}
        component={GuidesScreen}
        options={{
          title: t("navigation.guides"),
        }}
      />

      <Tab.Screen
        name={ROUTES.SETTINGS}
        component={SettingsScreen}
        options={{
          title: t("navigation.settings"),
        }}
      />
    </Tab.Navigator>
  );
}
import {
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { ROUTES } from "../../../constants/routes";
import useLocale from "../../../hooks/useLocale";

import styles from "./sideMenu.styles";

export default function SideMenu({
  visible,
  onClose,
  navigation,
}) {
  const { pick } = useLocale();
  function getRootNavigation() {
    let currentNavigation = navigation;

    while (currentNavigation?.getParent?.()) {
      currentNavigation =
        currentNavigation.getParent();
    }

    return currentNavigation;
  }

  function closeAndRun(callback) {
    onClose();

    setTimeout(() => {
      callback();
    }, 150);
  }

  function navigateToTab(
    tabName,
    params = undefined
  ) {
    closeAndRun(() => {
      const rootNavigation =
        getRootNavigation();

      rootNavigation.navigate(
        ROUTES.HOME,
        {
          screen: tabName,
          params,
        }
      );
    });
  }

  function navigateToRoot(
    routeName,
    params = undefined
  ) {
    closeAndRun(() => {
      const rootNavigation =
        getRootNavigation();

      rootNavigation.navigate(
        routeName,
        params
      );
    });
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.menu}>
          <View style={styles.header}>
            <Text style={styles.menuTitle}>
              {pick("MENIU", "MENU")}
            </Text>

            <Pressable
              style={styles.closeButton}
              onPress={onClose}
              hitSlop={10}
            >
              <MaterialCommunityIcons
                name="close-circle-outline"
                size={34}
              />
            </Pressable>
          </View>

          <View
            style={styles.titleDivider}
          />

          <MenuItem
            title={pick("ResQKit-ul meu", "My ResQKit")}
            onPress={() =>
              navigateToTab(
                ROUTES.HOME
              )
            }
          />

          <MenuItem
            title={pick("Vehicul", "Vehicle")}
            onPress={() =>
              navigateToTab(
                ROUTES.VEHICLE
              )
            }
          />

          <MenuItem
            title={pick("Începe intervenția", "Start intervention")}
            onPress={() =>
              navigateToRoot(
                ROUTES.INCIDENT_START
              )
            }
          />

          <MenuItem
            title={pick("Istoric intervenții", "Intervention history")}
            onPress={() =>
              navigateToRoot(
                ROUTES.HISTORY
              )
            }
          />

          <MenuItem
            title={pick("Materiale video", "First-aid guides")}
            onPress={() =>
              navigateToTab(
                ROUTES.GUIDES,
                {
                  guideType:
                    "wounds",
                }
              )
            }
          />

          <MenuItem
            title={pick("Tutoriale", "Tutorials")}
            onPress={() =>
              navigateToTab(
                ROUTES.GUIDES,
                {
                  guideType:
                    "app",
                }
              )
            }
          />

          <View
            style={styles.divider}
          />

          <MenuItem
            title={pick("Cont", "Account")}
            onPress={() =>
              navigateToRoot(
                ROUTES.ACCOUNT
              )
            }
          />

          <MenuItem
            title={pick("Setări", "Settings")}
            onPress={() =>
              navigateToTab(
                ROUTES.SETTINGS
              )
            }
          />

          <View
            style={styles.divider}
          />

          <MenuItem
            title="FAQ"
            onPress={() =>
              navigateToRoot(
                ROUTES.FAQ
              )
            }
          />

          <MenuItem
            title="Contact"
            onPress={() =>
              navigateToRoot(
                ROUTES.CONTACT
              )
            }
          />
        </View>

        <Pressable
          style={styles.backdrop}
          onPress={onClose}
        />
      </View>
    </Modal>
  );
}

function MenuItem({
  title,
  onPress,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuItem,

        pressed &&
          styles.menuItemPressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.bullet} />

      <Text
        style={styles.menuItemText}
      >
        {title}
      </Text>
    </Pressable>
  );
}
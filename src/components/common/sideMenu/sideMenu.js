import {
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { ROUTES } from "../../../constants/routes";

import styles from "./sideMenu.styles";

export default function SideMenu({
  visible,
  onClose,
  navigation,
}) {
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
              MENIU
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
            title="My ResQKit"
            onPress={() =>
              navigateToTab(
                ROUTES.HOME
              )
            }
          />

          <MenuItem
            title="Vehicul"
            onPress={() =>
              navigateToTab(
                ROUTES.VEHICLE
              )
            }
          />

          <MenuItem
            title="Istoric intervenții"
            onPress={() =>
              navigateToRoot(
                ROUTES.HISTORY
              )
            }
          />

          <MenuItem
            title="Materiale video"
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
            title="Tutoriale"
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
            title="Cont"
            onPress={() =>
              navigateToRoot(
                ROUTES.ACCOUNT
              )
            }
          />

          <MenuItem
            title="Setări"
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
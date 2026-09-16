import {
  useState,
} from "react";

import AppHeader from "../appHeader/appHeader";
import SideMenu from "../sideMenu/sideMenu";
import { ROUTES } from "../../../constants/routes";

export default function AppScreenHeader({
  title,
  navigation,
  showMenu = true,
  showNotifications = true,
  showProfile = true,
  onNotificationPress,
  onProfilePress,
}) {
  const [
    menuVisible,
    setMenuVisible,
  ] = useState(false);

  function handleLeftPress() {
    if (!showMenu) {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }

      return;
    }

    setMenuVisible(true);
  }

  return (
    <>
      <AppHeader
        title={title}
        leftIcon={
          showMenu
            ? "menu"
            : "arrow-left"
        }
        onMenuPress={
          handleLeftPress
        }
        showNotifications={
          showNotifications
        }
        showProfile={
          showProfile
        }
        onNotificationPress={
          onNotificationPress ||
          (() => navigation.navigate(ROUTES.NOTIFICATIONS))
        }
        onProfilePress={
          onProfilePress ||
          (() => {})
        }
      />

      {showMenu && (
        <SideMenu
          visible={
            menuVisible
          }
          onClose={() =>
            setMenuVisible(false)
          }
          navigation={
            navigation
          }
        />
      )}
    </>
  );
}
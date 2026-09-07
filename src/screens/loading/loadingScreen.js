import { useEffect } from "react";
import { View, Text } from "react-native";

import useApp from "../../hooks/useApp";

import { ROUTES } from "../../constants/routes";

export default function LoadingScreen({ navigation }) {
  const {
    isLoggedIn,
    device,
  } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoggedIn) {
        navigation.replace(ROUTES.LOGIN);
        return;
      }

      if (!device?.connected) {
        navigation.replace(ROUTES.CONNECT_DEVICE);
        return;
      }

      navigation.replace(ROUTES.HOME);
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    navigation,
    isLoggedIn,
    device?.connected,
  ]);

  return (
    <View>
      <Text>Se încarcă...</Text>
    </View>
  );
}
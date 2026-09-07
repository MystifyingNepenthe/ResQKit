import { useEffect } from "react";
import { View, Text } from "react-native";

import { ROUTES } from "../../constants/routes";

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    const isLoggedIn = false;
    const hasDevice = false;

    const timer = setTimeout(() => {
      if (!isLoggedIn) {
        navigation.replace(ROUTES.LOGIN);
      } else if (!hasDevice) {
        navigation.replace(ROUTES.CONNECT_DEVICE);
      } else {
        navigation.replace(ROUTES.HOME);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View>
      <Text>Loading Screen</Text>
    </View>
  );
}
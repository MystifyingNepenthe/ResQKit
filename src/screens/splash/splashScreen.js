import { useEffect } from "react";
import { View, Text } from "react-native";

export default function SplashScreen({ navigation }) {

    useEffect(() => {

        const timer = setTimeout(() => {
            navigation.replace("Loading");
        }, 2000);

        return () => clearTimeout(timer);

    }, []);

    return (
        <View>
            <Text>Splash Screen</Text>
        </View>
    );
}
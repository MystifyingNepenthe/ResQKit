import { Image, View } from "react-native";

export default function Logo() {
  return (
    <View
      style={{
        alignItems: "center",
        marginTop: 40,
        marginBottom: 30,
      }}
    >
      <Image
        source={require("../../../assets/logo.png")}
        style={{
          width: 220,
          height: 120,
        }}
        resizeMode="contain"
      />
    </View>
  );
}
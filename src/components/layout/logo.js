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
      <View
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Image
          source={require("../../../assets/logo.png")}
          style={{
            width: 120,
            height: 120,
          }}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}
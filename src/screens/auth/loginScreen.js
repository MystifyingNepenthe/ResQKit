import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native-paper";

import PrimaryButton from "../../components/buttons/primaryButtons";
import InputField from "../../components/input/inputFields";
import Logo from "../../components/layout/logo";
import { ROUTES } from "../../constants/routes";
import styles from "./loginScreen.styles";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        <Logo />

        <Text style={styles.title}>
          Bun venit!
        </Text>

        <Text style={styles.subtitle}>
          Sign in to continue
        </Text>

        <View style={styles.input}>
         <InputField
          label="Email"
          placeholder="name@domain.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          left={<TextInput.Icon icon="email-outline" />}
        />
        </View>

        <View style={styles.input}>
          <InputField
          label="Password"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          left={<TextInput.Icon icon="lock-outline" />}
        />
        </View>

        <View style={styles.button}>
          <PrimaryButton
            title="Sign In"
            onPress={() => navigation.replace(ROUTES.HOME)}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
import { useState } from "react";

import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import AppScreenHeader from "../../components/common/appScreenHeader/appScreenHeader";
import FloatingAIButton from "../../components/home/aiButton";

import SearchSection from "../../sections/home/searchSection";
import DeviceSection from "../../sections/home/deviceSection";

import { ROUTES } from "../../constants/routes";

import styles from "./homeScreen.styles";

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");

  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <AppScreenHeader
        title={t("home.title")}
        navigation={navigation}
        onProfilePress={() =>
          navigation.navigate(ROUTES.ACCOUNT)
        }
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <SearchSection
          search={search}
          setSearch={setSearch}
        />

        <DeviceSection navigation={navigation} />
      </ScrollView>

      <FloatingAIButton
        onPress={() =>
          navigation.navigate(ROUTES.AI)
        }
      />
    </SafeAreaView>
  );
}
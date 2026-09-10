import { useState } from "react";

import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import AppScreenHeader from "../../components/common/appScreenHeader/appScreenHeader";
import FloatingAIButton from "../../components/home/aiButton";
import PrimaryCard from "../../components/common/primaryCard";
import PrimaryButton from "../../components/buttons/primaryButtons";

import { ROUTES } from "../../constants/routes";
import { COLORS } from "../../design";

import styles from "./contactScreen.styles";

export default function ContactScreen({
  navigation,
}) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function handleSend() {
    if (!subject.trim() || !message.trim()) {
      Alert.alert(
        "Câmpuri incomplete",
        "Completează subiectul și mesajul înainte de trimitere."
      );

      return;
    }

    Alert.alert(
      "Mesaj pregătit",
      "Formularul funcționează momentan în modul frontend. Trimiterea reală va fi conectată ulterior la backend."
    );

    setSubject("");
    setMessage("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppScreenHeader
        title="Contact"
        navigation={navigation}
        onProfilePress={() =>
          navigation.navigate(
            ROUTES.ACCOUNT
          )
        }
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.intro}>
          <Text style={styles.title}>
            Contactează echipa ResQKit
          </Text>

          <Text style={styles.description}>
            Pentru probleme legate de aplicație,
            dispozitiv sau cont, ne poți trimite un
            mesaj folosind formularul de mai jos.
          </Text>
        </View>

        <PrimaryCard style={styles.infoCard}>
          <ContactInfoRow
            icon="email-outline"
            title="Email suport"
            value="support@resqkit.ro"
          />

          <View style={styles.divider} />

          <ContactInfoRow
            icon="clock-outline"
            title="Program suport"
            value="Luni – Vineri, 09:00 – 17:00"
          />

          <View style={styles.divider} />

          <ContactInfoRow
            icon="information-outline"
            title="Tip suport"
            value="Aplicație, dispozitiv și cont"
          />
        </PrimaryCard>

        <Text style={styles.sectionTitle}>
          Trimite un mesaj
        </Text>

        <Text style={styles.label}>
          Subiect
        </Text>

        <TextInput
          value={subject}
          onChangeText={setSubject}
          placeholder="Ex: Problemă la conectarea dispozitivului"
          placeholderTextColor={
            COLORS.textSecondary
          }
          style={styles.input}
        />

        <Text style={styles.label}>
          Mesaj
        </Text>

        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Descrie problema sau întrebarea ta..."
          placeholderTextColor={
            COLORS.textSecondary
          }
          style={[
            styles.input,
            styles.messageInput,
          ]}
          multiline
          textAlignVertical="top"
        />

        <PrimaryButton
          title="Trimite mesaj"
          onPress={handleSend}
        />

        <Text style={styles.note}>
          Pentru situații de urgență, nu folosi
          formularul de contact. Apelează serviciile de
          urgență disponibile în zona ta.
        </Text>
      </ScrollView>

      <FloatingAIButton
        onPress={() =>
          navigation.navigate(
            ROUTES.AI
          )
        }
      />
    </SafeAreaView>
  );
}

function ContactInfoRow({
  icon,
  title,
  value,
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={icon}
          size={22}
          color={COLORS.primary}
        />
      </View>

      <View style={styles.infoContent}>
        <Text style={styles.infoTitle}>
          {title}
        </Text>

        <Text style={styles.infoValue}>
          {value}
        </Text>
      </View>
    </View>
  );
}
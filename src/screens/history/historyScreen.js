import {
  useMemo,
  useState,
} from "react";

import {
  FlatList,
  Text,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import AppScreenHeader from "../../components/common/appScreenHeader/appScreenHeader";
import FloatingAIButton from "../../components/home/aiButton";

import HistorySwitcher from "../../components/history/historySwitcher";
import HistoryItem from "../../components/history/historyItem";

import {
  interventionHistory,
  operatorHistory,
  aiConversationHistory,
} from "../../mock/history";

import {
  ROUTES,
} from "../../constants/routes";

import {
  COLORS,
} from "../../design";

import styles from "./historyScreen.styles";

export default function HistoryScreen({
  navigation,
}) {
  const [historyType, setHistoryType] =
    useState("interventions");

  const history = useMemo(() => {
    switch (historyType) {
      case "operators":
        return operatorHistory;

      case "ai":
        return aiConversationHistory;

      case "interventions":
      default:
        return interventionHistory;
    }
  }, [historyType]);

  function getSectionInfo() {
    switch (historyType) {
      case "operators":
        return {
          title: "Date trimise operatorilor",
          description:
            "Vezi informațiile care au fost transmise în timpul intervențiilor.",
          empty:
            "Nu există date trimise.",
          icon: "account-voice",
        };

      case "ai":
        return {
          title: "Conversații AI",
          description:
            "Vezi conversațiile anterioare cu ResQ AI.",
          empty:
            "Nu există conversații AI.",
          icon: "robot-outline",
        };

      default:
        return {
          title: "Istoric intervenții",
          description:
            "Vezi intervențiile și evenimentele importante înregistrate de ResQKit.",
          empty:
            "Nu există intervenții.",
          icon: "car-emergency",
        };
    }
  }

  const sectionInfo =
    getSectionInfo();

  return (
    <SafeAreaView
      style={styles.container}
    >
      <AppScreenHeader
        title="Istoric"
        navigation={navigation}
        onProfilePress={() =>
          navigation.navigate(
            ROUTES.ACCOUNT
          )
        }
      />

      <FlatList
        data={history}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={({ item }) => (
          <HistoryItem
            item={item}
          />
        )}
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={[
          styles.content,

          history.length === 0 &&
            styles.emptyContent,
        ]}
        ListHeaderComponent={
          <>
            <HistorySwitcher
              selected={historyType}
              onChange={setHistoryType}
            />

            <View
              style={styles.intro}
            >
              <Text
                style={
                  styles.introTitle
                }
              >
                {sectionInfo.title}
              </Text>

              <Text
                style={
                  styles.introDescription
                }
              >
                {
                  sectionInfo.description
                }
              </Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <View
            style={
              styles.emptyContainer
            }
          >
            <View
              style={styles.emptyIcon}
            >
              <MaterialCommunityIcons
                name={
                  sectionInfo.icon
                }
                size={34}
                color={
                  COLORS.primary
                }
              />
            </View>

            <Text
              style={styles.emptyTitle}
            >
              {sectionInfo.empty}
            </Text>
          </View>
        }
      />

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
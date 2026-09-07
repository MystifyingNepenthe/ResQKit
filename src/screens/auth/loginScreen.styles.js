import { StyleSheet } from "react-native";

import { COLORS } from "../../design/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingHorizontal: 24,
    paddingBottom: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 18,
    color: COLORS.textSecondary,    
    marginBottom: 25,
  },

  input: {
    marginBottom: 16,
  },

  button: {
    marginTop: 10,
  },
});
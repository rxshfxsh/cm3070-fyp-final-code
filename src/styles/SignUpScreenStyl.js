import { StyleSheet } from "react-native";
import { COLOURS } from "../constants/colours";

export const styles = StyleSheet.create({
  // this is the styling done for the full screen and the keyboard aware layout
  container: {
    flex: 1,
    backgroundColor: COLOURS.background,
  },

  keyboardAvoider: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
    paddingVertical: 32,
  },

  formatForForm: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
  },

  // this is the styling done for the text style and the controls
  stylForTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: COLOURS.text,
  },

  stylForSubTitle: {
    marginBottom: 24,
    color: COLOURS.textLight,
    fontSize: 15,
  },

  stylForInput: {
    borderWidth: 1,
    borderColor: COLOURS.border,
    backgroundColor: COLOURS.card,
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    color: COLOURS.text,
  },

  stylForBtn: {
    backgroundColor: COLOURS.primary,
    padding: 16,
    borderRadius: 10,
    marginTop: 8,
  },

  stylForBtnTxt: {
    color: COLOURS.card,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  stylForLoginLink: {
    textAlign: "center",
    marginTop: 16,
    color: COLOURS.primary,
    fontWeight: "600",
  },
});

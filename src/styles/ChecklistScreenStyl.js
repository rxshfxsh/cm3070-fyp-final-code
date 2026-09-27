import { StyleSheet } from "react-native";
import { COLOURS } from "../constants/colours";
export const styles = StyleSheet.create({
  // this is the styling section for the layout
  //  of the screen and the heading of the progress
  container: {
    flex: 1,
    backgroundColor: COLOURS.background,
  },

  stylForContentContainer: {
    padding: 24,
    paddingBottom: 40,
  },

  stylForTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: COLOURS.text,
  },

  stylForSubTitle: {
    marginBottom: 20,
    color: COLOURS.textLight,
    fontSize: 15,
  },

  stylForProgress: {
    fontSize: 16,
    marginBottom: 16,
    color: COLOURS.text,
    fontWeight: "600",
  },

  // this is the styling for the checklist part for default, 
  // completed and for the row controls for the custom items
  item: {
    borderWidth: 1,
    borderColor: COLOURS.border,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: COLOURS.card,
    flexDirection: "row",
    alignItems: "center",
  },

  stylForToggleItem: {
    flex: 1,
    padding: 16,
  },

  stylForCompletedItem: {
    opacity: 0.75,
  },

  stylForTextOfItem: {
    fontSize: 18,
    color: COLOURS.text,
  },

  stylForDeleteBtn: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginRight: 6,
  },

  stylForDeleteBtnTxt: {
    color: "#C62828",
    fontSize: 14,
    fontWeight: "700",
  },

  // this is the styling for the inputs of the custom 
  // items, the states of the button and the scoring part
  stylForAddTitle: {
    marginTop: 12,
    marginBottom: 10,
    color: COLOURS.text,
    fontSize: 17,
    fontWeight: "600",
  },

  stylForItmContainerAdding: {
    flexDirection: "row",
    alignItems: "center",
  },

  stylForInput: {
    flex: 1,
    minHeight: 48,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLOURS.border,
    borderRadius: 10,
    backgroundColor: COLOURS.card,
    color: COLOURS.text,
    fontSize: 16,
  },

  stylForAddBtn: {
    minHeight: 48,
    justifyContent: "center",
    marginLeft: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: COLOURS.primary,
  },

  stylForDisabledAddBtn: {
    opacity: 0.5,
  },

  stylForAddBtnTxt: {
    color: COLOURS.card,
    fontSize: 16,
    fontWeight: "600",
  },

  stylForNote: {
    marginTop: 24,
    color: COLOURS.textLight,
    lineHeight: 20,
  },
});

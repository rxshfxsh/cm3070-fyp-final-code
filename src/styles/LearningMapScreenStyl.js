import { StyleSheet } from "react-native";
import { COLOURS } from "../constants/colours";

export const styles = StyleSheet.create({
  // this is the styling done for the page and the header of the current unit
  screen: {
    flex: 1,
    backgroundColor: COLOURS.background,
  },

  container: {
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 70,
  },

  stylForTitleOfpage: {
    fontSize: 29,
    fontWeight: "800",
    color: COLOURS.text,
    marginBottom: 8,
  },

  stylForSubTitleOfpage: {
    fontSize: 15,
    lineHeight: 22,
    color: COLOURS.textLight,
    marginBottom: 24,
  },

  stylForHeaderOfUnit: {
    minHeight: 145,
    padding: 20,
    borderRadius: 20,
    backgroundColor: COLOURS.bckColLHeader,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
    shadowColor: "#1D5FAF",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0,
    elevation: 5,
  },

  stylForContainerOfTxtUnit: {
    flex: 1,
    paddingRight: 12,
  },

  stylForLabelOfUnit: {
    fontSize: 13,
    fontWeight: "800",
    color: COLOURS.untTextCol,
    letterSpacing: 1,
    marginBottom: 5,
  },

  stylForTitleOfUnit: {
    fontSize: 21,
    fontWeight: "800",
    color: COLOURS.card,
    marginBottom: 7,
  },

  stylForDespOfUnit: {
    fontSize: 14,
    lineHeight: 20,
    color: COLOURS.subTCol,
  },

  stylForIconOfUnit: {
    fontSize: 42,
  },

  // this is the styling for the alternating path alignment and the shared node structure
  stylForRowOfNode: {
    width: "100%",
  },

  stylForCentrePos: {
    alignItems: "center",
  },

  stylForLeftPos: {
    alignItems: "flex-start",
    paddingLeft: 36,
  },

  stylForRightPos: {
    alignItems: "flex-end",
    paddingRight: 36,
  },

  stylForContentOfNode: {
    width: 150,
    alignItems: "center",
  },

  stylForShadowOfNode: {
    width: 86,
    height: 92,
    borderRadius: 48,
    borderTopLeftRadius: 12,
    justifyContent: "flex-start",
    transform: [{ rotate: "45deg" }],
  },

  // this is the styling done for the current, complete, locked and state variants of the quiz
  stylForShadowOfCrntNode: {
    backgroundColor: "#1E9C4B",
  },

  stylForShadowOfDoneNode: {
    backgroundColor: "#19763A",
  },

  stylForShadowNodeLocked: {
    backgroundColor: "#BCC4CD",
  },

  stylForShadowOfQuizNode: {
    backgroundColor: "#CC8D00",
  },

  stylForNodeBtn: {
    width: 86,
    height: 86,
    borderRadius: 45,
    borderTopLeftRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
  },

  stylForCrntNode: {
    backgroundColor: "#58CC66",
    borderColor: "#79DE85",
  },

  stylForDoneNode: {
    backgroundColor: "#3FAE55",
    borderColor: "#6AD57A",
  },

  stylForNodeLocked: {
    backgroundColor: "#DCE1E6",
    borderColor: "#E9EDF0",
  },

  stylForQuizNode: {
    backgroundColor: "#F5B82E",
    borderColor: "#FFD56C",
  },

  stylForIconNode: {
    fontSize: 32,
    fontWeight: "900",
    color: COLOURS.card,
    transform: [{ rotate: "-45deg" }],
  },

  stylForTitleNode: {
    marginTop: 14,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
    textAlign: "center",
    color: COLOURS.text,
  },

  stylForTitleNodeLocked: {
    color: COLOURS.textLight,
  },

  stylForSpacerPath: {
    height: 28,
  },

  // this is styling done for the content part where it is not made available yet
  stylForNextUnitContainer: {
    marginTop: 45,
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#EEF2F7",
    borderWidth: 1,
    borderColor: COLOURS.border,
    flexDirection: "row",
    alignItems: "center",
  },

  stylForNextUnitIcon: {
    fontSize: 30,
    marginRight: 14,
  },

  stylForNextUnitTxtContainer: {
    flex: 1,
  },

  stylForNextUnitLbl: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    color: COLOURS.textLight,
    marginBottom: 3,
  },

  stylForNextUnitTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: COLOURS.textLight,
    marginBottom: 4,
  },

  stylForNextUnitDesp: {
    fontSize: 13,
    lineHeight: 18,
    color: COLOURS.textLight,
  },
});

import { StyleSheet } from "react-native";
import { COLOURS } from "../constants/colours";

export const styles = StyleSheet.create({
  // this is the styling done for the layout of the page, the lesson identity and the progress indicator
  screen: {
    flex: 1,
    backgroundColor: COLOURS.background,
  },

  container: {
    padding: 22,
    paddingBottom: 60,
  },

  stylForHeaderForLesson: {
    backgroundColor: COLOURS.bckColLHeader,
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  stylOfTxtContainerForheader: {
    flex: 1,
    paddingRight: 12,
  },

  stylForUnitTxt: {
    color: COLOURS.untTextCol,
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 6,
  },

  stylForTitle: {
    color: COLOURS.card,
    fontSize: 25,
    fontWeight: "800",
    marginBottom: 8,
  },

  stylForSubtitle: {
    color: COLOURS.subTCol,
    fontSize: 14,
    lineHeight: 20,
  },

  stylForIconOfLesson: {
    fontSize: 44,
  },

  stylForProgressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  stylForProgressTxt: {
    color: COLOURS.textLight,
    fontSize: 13,
    fontWeight: "700",
  },

  stylForTrackOfProgress: {
    height: 9,
    borderRadius: 5,
    backgroundColor: "#DCE1E6",
    marginBottom: 22,
    overflow: "hidden",
  },

  stylForFillingOfProcess: {
    height: "100%",
    borderRadius: 5,
    backgroundColor: COLOURS.bckColLHeader,
  },

  // this is styling done for the decision scenario card
  stylForCardScenario: {
    backgroundColor: COLOURS.scnCrdBkCol,
    borderColor: COLOURS.yellowBrown,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 20,
    padding: 18,
  },

  stylForLblScenario: {
    color: COLOURS.lblBrown,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.9,
    marginBottom: 5,
  },

  stylForTitleScenario: {
    color: COLOURS.text,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },

  stylForSituationScenario: {
    color: COLOURS.textLight,
    fontSize: 14,
    lineHeight: 21,
  },

  stylForDecisionBox: {
    backgroundColor: COLOURS.card,
    borderRadius: 12,
    marginTop: 14,
    padding: 13,
  },

  stylForDecisionLbl: {
    color: COLOURS.lblGreen,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.7,
    marginBottom: 4,
  },

  stylForDecisiontxt: {
    color: COLOURS.text,
    fontSize: 14,
    lineHeight: 20,
  },

  // this is the styling done for the teaching section card that is numbered
  stylForContentCard: {
    backgroundColor: COLOURS.card,
    borderRadius: 16,
    padding: 17,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLOURS.border,
    flexDirection: "row",
  },

  stylForNumberInSection: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLOURS.untTextCol,
    textAlign: "center",
    lineHeight: 34,
    fontSize: 16,
    fontWeight: "800",
    color: COLOURS.bckColLHeader,
    marginRight: 13,
  },

  stylForSectionTxtCont: {
    flex: 1,
  },

  stylForSectionheading: {
    fontSize: 17,
    fontWeight: "800",
    color: COLOURS.text,
    marginBottom: 7,
  },

  stylForSectionContent: {
    fontSize: 15,
    lineHeight: 22,
    color: COLOURS.textLight,
  },

  // this is the styling done for the summary that is in key points and the source card
  stylForSummaryCard: {
    backgroundColor: "#EAF7EE",
    borderRadius: 16,
    padding: 18,
    marginTop: 8,
    marginBottom: 22,
  },

  stylForSummaryTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLOURS.text,
    marginBottom: 12,
  },

  stylForRowInKeyPoint: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  stylForCheckIcon: {
    fontSize: 16,
    fontWeight: "900",
    color: COLOURS.lblGreen,
    marginRight: 10,
  },

  stylForKeyPointTxt: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: COLOURS.text,
  },

  stylForSourceCard: {
    backgroundColor: "#EEF5FF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLOURS.ovCrdCol,
    padding: 15,
    marginBottom: 16,
  },

  stylForSourceLbl: {
    color: COLOURS.bckColLHeader,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
    marginBottom: 4,
  },

  stylForSourceTitle: {
    color: COLOURS.text,
    fontSize: 15,
    fontWeight: "800",
  },

  // this is styling done for the button states of the previous, next and pending
  stylForPageBtns: {
    flexDirection: "row",
    alignItems: "stretch",
  },

  stylForPrevBtn: {
    flex: 1,
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLOURS.border,
    backgroundColor: COLOURS.card,
  },

  stylForPrevBtnTxt: {
    color: COLOURS.text,
    fontSize: 17,
    fontWeight: "800",
  },

  stylForNextBtn: {
    flex: 1,
    backgroundColor: "#58CC66",
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 5,
    borderBottomColor: "#329846",
  },

  stylForNxtBtnWPrev: {
    marginLeft: 12,
  },

  stylForCompleteBtnDisabled: {
    opacity: 0.65,
  },

  stylForCompleteBtnTxt: {
    color: COLOURS.card,
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 22,
    textAlign: "center",
  },
});

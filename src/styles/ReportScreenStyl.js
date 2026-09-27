import { StyleSheet } from "react-native";
import { COLOURS } from "../constants/colours";

export const styles = StyleSheet.create({
  // this is the styling done for the shared screen and the tab switcher
  flex: {
    flex: 1,
  },

  screen: {
    flex: 1,
    backgroundColor: COLOURS.background,
  },

  stylForTabsContainer: {
    flexDirection: "row",
    backgroundColor: COLOURS.card,
    borderBottomColor: COLOURS.border,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  stylForTabBtn: {
    flex: 1,
    alignItems: "center",
    borderBottomColor: "transparent",
    borderBottomWidth: 3,
    paddingHorizontal: 4,
    paddingVertical: 13,
  },

  stylForActiveTabBtn: {
    borderBottomColor: COLOURS.primary,
  },

  stylForTabBtnTxt: {
    color: COLOURS.textLight,
    fontSize: 13,
    fontWeight: "700",
  },

  stylForActiveTabBtnTxt: {
    color: COLOURS.primary,
  },

  // this is the styling done for the banner of the submission form, its labels and the fields that only meant to be read
  stylForFormContent: {
    padding: 20,
    paddingBottom: 60,
  },

  stylForBannerInfo: {
    backgroundColor: COLOURS.infBckCol,
    borderColor: COLOURS.infBorCol,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 22,
    padding: 14,
  },

  stylForBannerInfoTitle: {
    color: COLOURS.primary,
    fontSize: 15,
    fontWeight: "800",
  },

  stylForBannerInfoTxt: {
    color: COLOURS.text,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },

  stylForFieldLbl: {
    color: COLOURS.text,
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 8,
    marginTop: 18,
  },

  stylForRequiredMark: {
    color: "#D92D20",
  },

  stylForLockedField: {
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderColor: COLOURS.border,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 50,
    paddingHorizontal: 14,
  },

  stylForLockedFieldValue: {
    color: COLOURS.text,
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
  },

  stylForLockedFieldIcon: {
    fontSize: 15,
    marginLeft: 8,
  },

  stylForFieldHelp: {
    color: COLOURS.textLight,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 5,
  },

  // this is styling done for the empty, selected location states and its action
  stylForFieldEmpty: {
    alignItems: "center",
    backgroundColor: COLOURS.card,
    borderColor: COLOURS.border,
    borderRadius: 10,
    borderStyle: "dashed",
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 70,
    padding: 12,
  },

  stylForFieldEmptyTxt: {
    color: COLOURS.textLight,
    fontSize: 13,
  },

  stylForSelectedLoc: {
    backgroundColor: COLOURS.successBckCol,
    borderColor: "#ABEFC6",
    borderRadius: 10,
    borderWidth: 1,
    padding: 13,
  },

  stylForSelectedLocTitle: {
    color: COLOURS.successTxtCol,
    fontSize: 14,
    fontWeight: "800",
  },

  stylForSelectedLocAddress: {
    color: COLOURS.text,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 5,
  },

  stylForSelectedLocCoord: {
    color: COLOURS.textLight,
    fontSize: 11,
    marginTop: 4,
  },

  stylForSecBtn: {
    alignItems: "center",
    backgroundColor: "#E8F1FF",
    borderColor: COLOURS.primary,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    marginTop: 10,
    minHeight: 46,
    paddingHorizontal: 14,
  },

  stylForSecBtnTxt: {
    color: COLOURS.primary,
    fontSize: 14,
    fontWeight: "800",
  },

  // this is the styling done for the observation input, char count and its submit states
  stylForDescrpInput: {
    backgroundColor: COLOURS.card,
    borderColor: COLOURS.border,
    borderRadius: 10,
    borderWidth: 1,
    color: COLOURS.text,
    fontSize: 15,
    lineHeight: 21,
    minHeight: 150,
    padding: 14,
  },

  stylForCharCount: {
    color: COLOURS.textLight,
    fontSize: 11,
    marginTop: 5,
    textAlign: "right",
  },

  stylForSubmitBtn: {
    alignItems: "center",
    backgroundColor: COLOURS.primary,
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 24,
    minHeight: 52,
    paddingHorizontal: 16,
  },

  stylForSubmitBtnTxt: {
    color: COLOURS.card,
    fontSize: 15,
    fontWeight: "800",
  },

  stylForDisabledtBtn: {
    opacity: 0.55,
  },

  stylForSubmissionNote: {
    color: COLOURS.textLight,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 10,
    textAlign: "center",
  },

  // this is the styling done for the community feed warning and indiv report cards
  stylForContentOfReports: {
    padding: 16,
    paddingBottom: 60,
  },

  stylForContentOfReportsEmpty: {
    flexGrow: 1,
  },

  stylForCommunityWarning: {
    backgroundColor: COLOURS.warningBckCol,
    borderColor: COLOURS.warningBrdCol,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 14,
    padding: 13,
  },

  stylForCommunityWarningTitle: {
    color: "#92400E",
    fontSize: 14,
    fontWeight: "800",
  },

  stylForCommunityWarningTxt: {
    color: COLOURS.warningTxtCol,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },

  stylForCardOfReport: {
    backgroundColor: COLOURS.card,
    borderColor: COLOURS.border,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 14,
    padding: 14,
  },

  stylForHeaderRowReport: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  stylForContainerReporter: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    marginRight: 8,
  },

  stylForAvatar: {
    alignItems: "center",
    backgroundColor: "#E8F1FF",
    borderRadius: 18,
    height: 36,
    justifyContent: "center",
    marginRight: 9,
    width: 36,
  },

  stylForAvatarTxt: {
    color: COLOURS.primary,
    fontSize: 15,
    fontWeight: "900",
  },

  stylForTxtContainerReporter: {
    flex: 1,
  },

  stylForNameOfReporter: {
    color: COLOURS.text,
    fontSize: 14,
    fontWeight: "800",
  },

  stylForDateOfReport: {
    color: COLOURS.textLight,
    fontSize: 11,
    marginTop: 2,
  },

  stylForBadgeUnverified: {
    backgroundColor: COLOURS.warningBckCol,
    borderRadius: 8,
    color: COLOURS.warningTxtCol,
    fontSize: 9,
    fontWeight: "900",
    overflow: "hidden",
    paddingHorizontal: 7,
    paddingVertical: 4,
  },

  stylForLocBoxRpt: {
    backgroundColor: COLOURS.infBckCol,
    borderRadius: 10,
    marginBottom: 12,
    padding: 11,
  },

  stylForLocTitleRpt: {
    color: COLOURS.primary,
    fontSize: 12,
    fontWeight: "800",
  },

  stylForAddressRpt: {
    color: COLOURS.text,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },

  stylForCoordRpt: {
    color: COLOURS.textLight,
    fontSize: 10,
    marginTop: 3,
  },

  stylForDescripRpt: {
    color: COLOURS.text,
    fontSize: 14,
    lineHeight: 21,
  },

  stylForDisclaimerRpt: {
    borderTopColor: COLOURS.border,
    borderTopWidth: 1,
    color: COLOURS.textLight,
    fontSize: 10,
    fontStyle: "italic",
    lineHeight: 15,
    marginTop: 12,
    paddingTop: 10,
  },

  // this is the styling done for the loading, error and empty feed states
  stylForStateCentered: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },

  stylForStateCenteredTxt: {
    color: COLOURS.textLight,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 10,
    textAlign: "center",
  },

  stylForIconState: {
    color: "#F79009",
    fontSize: 30,
    fontWeight: "900",
  },

  stylForErrTitle: {
    color: COLOURS.text,
    fontSize: 17,
    fontWeight: "800",
    marginTop: 8,
  },

  stylForReportsEmp: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    minHeight: 300,
    padding: 30,
  },

  stylForReportsEmpIcon: {
    fontSize: 42,
  },

  stylForReportsEmpTitle: {
    color: COLOURS.text,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 10,
  },

  stylForReportsEmpTxt: {
    color: COLOURS.textLight,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
    textAlign: "center",
  },
});

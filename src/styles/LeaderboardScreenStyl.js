import { StyleSheet } from "react-native";
import { COLOURS } from "../constants/colours";

export const styles = StyleSheet.create({
  // this is styling done for the screen, loading and the layout of the heading
  screen: {
    flex: 1,
    backgroundColor: COLOURS.background,
  },

  stylForContainerLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOURS.background,
  },

  stylForTxtLoading: {
    marginTop: 12,
    color: COLOURS.textLight,
  },

  stylForContentList: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },

  stylForHeader: {
    marginBottom: 20,
  },

  stylForEyeBrow: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: COLOURS.primary,
  },

  stylForTitle: {
    marginTop: 4,
    fontSize: 30,
    fontWeight: "900",
    color: COLOURS.text,
  },

  stylForSubTitle: {
    marginTop: 5,
    fontSize: 15,
    color: COLOURS.textLight,
  },

  stylForErrTxt: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    textAlign: "center",
    color: COLOURS.dangerTxtCol,
    backgroundColor: "#FDECEC",
  },

  // this is the styling done for the top 3 podium and achivement count button
  stylForPodium: {
    minHeight: 220,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: 18,
  },

  stylForSlotInPodium: {
    flex: 1,
    maxWidth: 120,
    alignItems: "center",
  },

  stylForSlotInPodiumFirst: {
    alignSelf: "flex-start",
  },

  stylForPodiumMedal: {
    marginBottom: 5,
    fontSize: 25,
  },

  stylForPodiumAvatar: {
    width: 58,
    height: 58,
    borderWidth: 4,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOURS.card,
  },

  stylForPodiumAvatarFirst: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },

  stylForPodiumInitial: {
    fontSize: 22,
    fontWeight: "900",
    color: COLOURS.text,
  },

  stylForFirstPodiumInitial: {
    fontSize: 28,
  },

  stylForNameOfPodiumRow: {
    maxWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
    paddingHorizontal: 2,
  },

  stylForNameInPodium: {
    flexShrink: 1,
    fontSize: 12,
    fontWeight: "800",
    color: COLOURS.text,
  },

  stylForPointsInPodium: {
    marginTop: 3,
    marginBottom: 8,
    fontSize: 11,
    fontWeight: "700",
    color: COLOURS.textLight,
  },

  stylForBaseInPodium: {
    width: "88%",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  stylForBaseInPodiumFirst: {
    height: 68,
  },

  stylForBaseInPodiumSide: {
    height: 46,
  },

  stylForRankInPodium: {
    fontSize: 24,
    fontWeight: "900",
    color: COLOURS.card,
  },

  stylForBtnAchievement: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: "#FFF7D6",
  },

  stylForBtnIconAchievement: {
    fontSize: 12,
  },

  stylForBtnCountAchievement: {
    marginLeft: 2,
    fontSize: 11,
    fontWeight: "900",
    color: "#8A6512",
  },

  // this is the styling fone for the summary of the user and the remaining ranking rows
  stylForCurrUserStanding: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 16,
    backgroundColor: COLOURS.primary,
  },

  stylForCurrUserStandingLbl: {
    flex: 1,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.7,
    color: "rgba(255,255,255,0.82)",
  },

  stylForCurrUserStandingRank: {
    marginRight: 12,
    fontSize: 21,
    fontWeight: "900",
    color: COLOURS.card,
  },

  stylForCurrUserStandingPoints: {
    fontSize: 14,
    fontWeight: "800",
    color: COLOURS.card,
  },

  stylForListTitle: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "900",
    color: COLOURS.text,
  },

  stylForRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 12,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: COLOURS.border,
    backgroundColor: COLOURS.card,
  },

  stylForCurrUserRow: {
    borderWidth: 2,
    borderColor: COLOURS.primary,
    backgroundColor: "#EEF8E8",
  },

  stylForContainerRank: {
    width: 34,
    alignItems: "center",
    justifyContent: "center",
  },

  stylForRank: {
    fontSize: 16,
    fontWeight: "900",
    color: COLOURS.textLight,
  },

  stylForAvatar: {
    width: 46,
    height: 46,
    marginHorizontal: 10,
    borderWidth: 2,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLOURS.border,
    backgroundColor: COLOURS.background,
  },

  stylForCurrUserAvatar: {
    borderColor: COLOURS.primary,
  },

  stylForInitialInAvatar: {
    fontSize: 18,
    fontWeight: "900",
    color: COLOURS.text,
  },

  stylForInfoOfUser: {
    flex: 1,
  },

  stylForNameOfRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  stylForNameOfUser: {
    flexShrink: 1,
    fontSize: 15,
    fontWeight: "800",
    color: COLOURS.text,
  },

  stylForCurrUserTxt: {
    color: COLOURS.primary,
  },

  stylForPointsLbl: {
    marginTop: 3,
    fontSize: 11,
    color: COLOURS.textLight,
  },

  stylForPoints: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "900",
    color: COLOURS.text,
  },

  // this is the styling done for the empty leaderboard state
  stylForContainerEmp: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },

  stylForIconEmp: {
    fontSize: 48,
  },

  stylForTitleEmp: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "900",
    color: COLOURS.text,
  },

  stylForTxtEmp: {
    marginTop: 6,
    lineHeight: 20,
    textAlign: "center",
    color: COLOURS.textLight,
  },

  // this is the styling for the achievement modal backdrop, sheet, list and the empty state
  stylForBackdropModal: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  stylForContainerModal: {
    minHeight: 310,
    maxHeight: "72%",
    paddingTop: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    backgroundColor: COLOURS.background,
  },

  stylForHandleModal: {
    width: 42,
    height: 5,
    alignSelf: "center",
    marginBottom: 15,
    borderRadius: 3,
    backgroundColor: COLOURS.border,
  },

  stylForHeaderOfModal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  stylForHeaderTxtOfModal: {
    flex: 1,
    marginRight: 12,
  },

  stylForEyeBrowOfModal: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
    color: COLOURS.primary,
  },

  stylForTitleOfModal: {
    marginTop: 2,
    fontSize: 23,
    fontWeight: "900",
    color: COLOURS.text,
  },

  stylForCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOURS.card,
  },

  stylForCloseBtnTxt: {
    fontSize: 27,
    lineHeight: 29,
    color: COLOURS.text,
  },

  stylForListAch: {
    paddingBottom: 28,
  },

  stylForCardAch: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 13,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: COLOURS.border,
    backgroundColor: COLOURS.card,
  },

  stylForIconContainerAch: {
    width: 48,
    height: 48,
    marginRight: 12,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF7D6",
  },

  stylForIconAch: {
    fontSize: 24,
  },

  stylForInfoAch: {
    flex: 1,
  },

  stylForTitleAch: {
    fontSize: 15,
    fontWeight: "900",
    color: COLOURS.text,
  },

  stylForDescripAch: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 17,
    color: COLOURS.textLight,
  },

  stylForNoAch: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 45,
  },

  stylForIconNoAch: {
    fontSize: 43,
  },

  stylForTitleNoAch: {
    marginTop: 10,
    fontSize: 19,
    fontWeight: "900",
    color: COLOURS.text,
  },

  stylForTxtNoAch: {
    marginTop: 6,
    lineHeight: 19,
    textAlign: "center",
    color: COLOURS.textLight,
  },
});

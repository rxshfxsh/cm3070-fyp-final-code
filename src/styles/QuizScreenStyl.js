import { COLOURS } from "../constants/colours";

export const styles = {
  // this is the styling done for the heading of the page and the progress indication
  screen: {
    flex: 1,
    backgroundColor: COLOURS.background,
  },

  container: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 50,
  },

  topPartEyeBrow: {
    color: COLOURS.primary,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: 8,
  },

  stylForTitle: {
    color: COLOURS.text,
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 34,
    marginBottom: 20,
    marginTop: 4,
  },

  stylForPrgrssHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  stylForPrgrssTxt: {
    color: COLOURS.textLight,
    fontSize: 14,
    fontWeight: "600",
  },

  stylForScoreRequirement: {
    color: COLOURS.textLight,
    fontSize: 14,
    fontWeight: "600",
  },

  stylForPrgrssTrack: {
    backgroundColor: COLOURS.border,
    borderRadius: 5,
    height: 9,
    marginBottom: 24,
    overflow: "hidden",
  },

  stylForFillingOfPrgrss: {
    backgroundColor: COLOURS.primary,
    borderRadius: 5,
    height: "100%",
  },

  // this is the styling done for the qn topic and its prompt
  stylForModLbl: {
    alignSelf: "flex-start",
    backgroundColor: COLOURS.subTCol,
    borderRadius: 12,
    color: COLOURS.primary,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  stylForQn: {
    color: COLOURS.text,
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 28,
    marginBottom: 20,
  },

  // this is the styling done for the default and radio button of the selected states 
  stylForOption: {
    alignItems: "center",
    backgroundColor: COLOURS.card,
    borderColor: COLOURS.border,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 12,
    padding: 15,
  },

  stylForSelectedOption: {
    backgroundColor: COLOURS.subTCol,
    borderColor: COLOURS.primary,
    borderWidth: 2,
  },

  stylForRadio: {
    alignItems: "center",
    borderColor: COLOURS.border,
    borderRadius: 10,
    borderWidth: 2,
    height: 20,
    justifyContent: "center",
    marginRight: 12,
    width: 20,
  },

  stylForSelectedRadio: {
    borderColor: COLOURS.primary,
  },

  stylForRadioDot: {
    backgroundColor: COLOURS.primary,
    borderRadius: 5,
    height: 10,
    width: 10,
  },

  stylForOptionTxt: {
    color: COLOURS.text,
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
  },

  stylForSelectedOptionTxt: {
    color: COLOURS.primary,
    fontWeight: "700",
  },

  // this is the styling done for the next, submit action and the disabled state
  stylForBtn: {
    alignItems: "center",
    backgroundColor: COLOURS.primary,
    borderRadius: 14,
    marginTop: 12,
    padding: 16,
  },

  stylForDisabledBtn: {
    opacity: 0.65,
  },

  stylForBtnTxt: {
    color: COLOURS.card,
    fontSize: 16,
    fontWeight: "800",
  },
};

import { COLOURS } from "../constants/colours";
export const styles = {
  // this is the styling for the layout of the 
  // screen and the info for the heading part
  stylForScreen: {
    flex: 1,
    backgroundColor: COLOURS.background,
  },

  stylForContainer: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 50,
    justifyContent: "center",
    backgroundColor: COLOURS.background,
  },

  stylForTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLOURS.text,
  },

  stylForUserScore: {
    fontSize: 18,
    marginVertical: 16,
    color: COLOURS.text,
  },

  // this is the styling for the feature buttons such as 
  // the common button to see the different sections, 
  // report button and the log out button
  stylForBtn: {
    backgroundColor: COLOURS.primary,
    padding: 16,
    borderRadius: 10,
    marginTop: 12,
  },

  stylForBtnTxt: {
    color: COLOURS.card,
    textAlign: "center",
    fontWeight: "bold",
  },

  stylForReportBtn: {
    backgroundColor: COLOURS.warning,
  },

  stylToLogOut: {
    textAlign: "center",
    marginTop: 24,
    color: COLOURS.danger,
    fontWeight: "bold",
  },
};

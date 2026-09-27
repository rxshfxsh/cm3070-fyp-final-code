import { COLOURS } from "../constants/colours";

export const styles = {
  // this is the styling done for the layout of the page and the text format of the card
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: COLOURS.background,
  },

  stylForTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLOURS.text,
  },

  stylForCard: {
    borderWidth: 1,
    borderColor: COLOURS.border,
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: COLOURS.card,
  },

  stylForLbl: {
    fontSize: 14,
    color: COLOURS.textLight,
  },

  stylForValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
    color: COLOURS.text,
  },
};

import { StyleSheet } from "react-native";
import { COLOURS } from "../constants/colours";
export const styles = StyleSheet.create({
  // this is the styling part for the emergency 
  // hub page and the reusable info card
  screen: {
    flex: 1,
    backgroundColor: COLOURS.background,
  },

  container: {
    padding: 24,
    paddingBottom: 70,
  },

  stylForHeader: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLOURS.text,
  },

  stylForCard: {
    borderWidth: 1,
    borderColor: COLOURS.border,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    backgroundColor: COLOURS.card,
  },

  stylForTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLOURS.primary,
  },

  stylForContent: {
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 8,
    color: COLOURS.text,
  },

  // this is the styling for the header for the weather section, 
  // its loading part, summary of the forecase and the metric row
  stylForTitleRowW: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  stylForTitleContainerW: {
    flex: 1,
    paddingRight: 12,
  },

  stylForDscrpW: {
    color: COLOURS.textLight,
    fontSize: 13,
    marginBottom: 12,
    marginTop: -4,
  },

  stylForLoadingContainerW: {
    alignItems: "center",
    flexDirection: "row",
    minHeight: 70,
  },

  stylForLoadingTxtW: {
    color: COLOURS.textLight,
    fontSize: 14,
    marginLeft: 10,
  },

  stylForSummaryW: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 14,
  },

  stylForIconW: {
    fontSize: 42,
    marginRight: 13,
  },

  stylForSummaryTxtW: {
    flex: 1,
  },

  stylForForecastW: {
    color: COLOURS.text,
    fontSize: 20,
    fontWeight: "800",
  },

  stylForValidPeriodW: {
    color: COLOURS.textLight,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 3,
  },

  stylForMetricsW: {
    backgroundColor: "#F5F8FC",
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 6,
    paddingVertical: 12,
  },

  stylForMetricW: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 3,
  },

  stylForMetricDividerW: {
    backgroundColor: COLOURS.border,
    width: 1,
  },

  stylForMetricLblW: {
    color: COLOURS.textLight,
    fontSize: 10,
    marginBottom: 4,
  },

  stylForMetricValW: {
    color: COLOURS.text,
    fontSize: 13,
    fontWeight: "800",
    textAlign: "center",
  },

  stylForDirOfWindW: {
    color: COLOURS.textLight,
    fontSize: 10,
    marginTop: 2,
  },

  stylForUpdatedTxtW: {
    color: COLOURS.textLight,
    fontSize: 11,
    marginTop: 10,
    textAlign: "right",
  },

  stylForWarningTxtW: {
    color: COLOURS.warningTxtCol,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 8,
  },

  // this is the styling section for the header of the 
  // live flood map, its refresh state and the banner for flood status
  stylForTitleRowM: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  stylForTitleTxtContM: {
    flex: 1,
    paddingRight: 12,
  },

  stylForDescripM: {
    fontSize: 14,
    lineHeight: 20,
    color: COLOURS.textLight,
    marginBottom: 14,
  },

  stylForRefreshBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F1FF",
  },

  stylForRefreshBtnTxt: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLOURS.primary,
  },

  stylForRefreshBtnDisabled: {
    opacity: 0.55,
  },

  stylForLoadingCont: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },

  stylForLoadingTxt: {
    marginTop: 12,
    fontSize: 14,
    color: COLOURS.textLight,
  },

  stylForStatusOfFlood: {
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 12,
    padding: 12,
  },

  stylForStatusOfFloodClear: {
    backgroundColor: COLOURS.successBckCol,
    borderColor: "#ABEFC6",
  },

  stylForStatusOfFloodActive: {
    backgroundColor: COLOURS.dangerBckCol,
    borderColor: COLOURS.dangerBrdCol,
  },

  stylForStatusOfFloodWarning: {
    backgroundColor: COLOURS.warningBckCol,
    borderColor: COLOURS.warningBrdCol,
  },

  stylForStatusOfFloodIcon: {
    color: COLOURS.text,
    fontSize: 18,
    fontWeight: "900",
    marginRight: 10,
  },

  stylForStatusOfFloodTxtCont: {
    flex: 1,
  },

  stylForStatusOfFloodTitle: {
    color: COLOURS.text,
    fontSize: 14,
    fontWeight: "800",
  },

  stylForStatusOfFloodTime: {
    color: COLOURS.textLight,
    fontSize: 11,
    marginTop: 3,
  },

  stylForErrTxt: {
    fontSize: 14,
    lineHeight: 20,
    color: COLOURS.warningTxtCol,
    backgroundColor: COLOURS.warningBckCol,
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },

  // this is the styling section for the canvas 
  // of the map, its legend, disclaimer prt and cards for alert
  stylForM: {
    width: "100%",
    height: 330,
    borderRadius: 12,
  },

  stylForLegend: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 14,
    gap: 12,
  },

  stylForLegendItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  stylForLegendCirc: {
    width: 11,
    height: 11,
    borderRadius: 6,
    marginRight: 6,
  },

  stylForLegendUser: {
    backgroundColor: COLOURS.success,
  },

  stylForLegendFlood: {
    backgroundColor: "#DC2626",
  },

  stylForLegendRainfall: {
    backgroundColor: COLOURS.primary,
  },

  stylForLegendtxt: {
    fontSize: 12,
    color: COLOURS.textLight,
  },

  stylForDisclaimer: {
    fontSize: 12,
    lineHeight: 18,
    color: COLOURS.textLight,
    marginTop: 12,
    fontStyle: "italic",
  },

  stylForListA: {
    marginTop: 18,
  },

  stylForListTitleA: {
    color: COLOURS.text,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
  },

  stylForCardA: {
    backgroundColor: COLOURS.dangerBckCol,
    borderColor: COLOURS.dangerBrdCol,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
    padding: 13,
  },

  stylForHeadingRwA: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  stylForHeadlineA: {
    color: COLOURS.dangerTxtCol,
    flex: 1,
    fontSize: 15,
    fontWeight: "800",
    marginRight: 8,
  },

  stylForSeverityA: {
    backgroundColor: "#FEE4E2",
    borderRadius: 9,
    color: COLOURS.dangerTxtCol,
    fontSize: 10,
    fontWeight: "800",
    overflow: "hidden",
    paddingHorizontal: 7,
    paddingVertical: 4,
    textTransform: "uppercase",
  },

  stylForAreaA: {
    color: COLOURS.text,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 8,
  },

  stylForDescriptionA: {
    color: COLOURS.textLight,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 7,
  },

  stylForInstructionA: {
    color: COLOURS.dangerTxtCol,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 19,
    marginTop: 7,
  },

  stylForTimeA: {
    color: COLOURS.textLight,
    fontSize: 11,
    marginTop: 8,
  },
  
  // this is the styling for the demo part, 
  // the banner of the event and metrics part
  stylForDemoHeaderRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  stylForDemoTitleContainer: {
    flex: 1,
    paddingRight: 10,
  },

  stylForDemoBadge: {
    backgroundColor: COLOURS.warningBckCol,
    borderColor: COLOURS.warningBrdCol,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  stylForDemoBadgeTxt: {
    color: COLOURS.warningTxtCol,
    fontSize: 9,
    fontWeight: "900",
  },

  stylForDemoEventBanner: {
    backgroundColor: "#FFF7ED",
    borderColor: "#FDBA74",
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    padding: 12,
  },

  stylForDemoEventTitle: {
    color: "#9A3412",
    fontSize: 14,
    fontWeight: "800",
  },

  stylForDemoEventTxt: {
    color: COLOURS.textLight,
    fontSize: 11,
    marginTop: 4,
  },

  stylForDemoMetrics: {
    backgroundColor: "#F5F8FC",
    borderRadius: 12,
    flexDirection: "row",
    marginBottom: 12,
    paddingVertical: 12,
  },

  stylForDemoMetric: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 8,
  },

  stylForDemoMetricDivider: {
    backgroundColor: COLOURS.border,
    width: 1,
  },

  stylForDemoMetricValue: {
    color: COLOURS.primary,
    fontSize: 21,
    fontWeight: "900",
  },

  stylForDemoMetricLabel: {
    color: COLOURS.text,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 3,
    textAlign: "center",
  },

  stylForDemoMetricPlace: {
    color: COLOURS.textLight,
    fontSize: 10,
    marginTop: 2,
    textAlign: "center",
  },
});

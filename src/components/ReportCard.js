import { Text, View } from "react-native";

import { styles } from "../styles/ReportScreenStyl";
import { coordFormatting, SGDateFormatting } from "../utils/report";

export default function ReportCard({ report }) {
  // here, the trusted server time will be used when available 
  // if not the client time will be used as a fallback
  const reportDate =
    report.createdAt || report.clientCreatedAt;

  // as the serverTimestamp resolves, the createdAt may be null 
  // briefly. hence the client value will prevent the card that 
  // has been submitted recently from displaying no date
  return (
    <View style={styles.stylForCardOfReport}>
      <View style={styles.stylForHeaderRowReport}>
        <View style={styles.stylForContainerReporter}>
          {/*  the text initial here will avoid storing or 
               downloading the profile images */}
          <View style={styles.stylForAvatar}>
            <Text style={styles.stylForAvatarTxt}>
              {(report.reporterName || "U")
                .charAt(0)
                .toUpperCase()}
            </Text>
          </View>

          <View style={styles.stylForTxtContainerReporter}>
            <Text style={styles.stylForNameOfReporter}>
              {report.reporterName || "Community user"}
            </Text>

            <Text style={styles.stylForDateOfReport}>
              {SGDateFormatting(reportDate)}
            </Text>
          </View>
        </View>

        <Text style={styles.stylForBadgeUnverified}>
          {/* the community submissions will begin with this fixed status */}
          UNVERIFIED
        </Text>
      </View>

      {/* the address ia optional but the coordinates that has 
      been validated will always be displayed */}
      <View style={styles.stylForLocBoxRpt}>
        <Text style={styles.stylForLocTitleRpt}>
          📍 Reported location
        </Text>

        {report.location && report.location.address ? (
          <Text style={styles.stylForAddressRpt}>
            {report.location.address}
          </Text>
        ) : null}

        <Text style={styles.stylForCoordRpt}>
          {coordFormatting(report.location)}
        </Text>
      </View>

      <Text style={styles.stylForDescripRpt}>
        {/* the description here will be the cleaned text 
        has been saved during the report submission */}
        {report.description}
      </Text>

      {/* the community submissions are separated here from the official alerts */}
      <Text style={styles.stylForDisclaimerRpt}>
        Community-submitted report. Verify the conditions and continue
        to follow official safety instructions.
      </Text>
    </View>
  );
}

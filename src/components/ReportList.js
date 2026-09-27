// this is the reference made:
// https://reactnative.dev/docs/flatlist
import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { COLOURS } from "../constants/colours";
import { styles } from "../styles/ReportScreenStyl";
import ReportCard from "./ReportCard";

export default function ReportList({
  errInReports,
  loadingOfReports,
  reports,
}) {
  if (loadingOfReports) {
    // this initial query has not produced data 
    // or the error yet
    return (
      <View style={styles.stylForStateCentered}>
        <ActivityIndicator
          size="large"
          color={COLOURS.primary}
        />

        <Text
          style={styles.stylForStateCenteredTxt}
        >
          Loading community reports...
        </Text>
      </View>
    );
  }

  if (errInReports) {
    // here, the service errors will be kept separate 
    // from the legitimate empty collection
    return (
      <View style={styles.stylForStateCentered}>
        <Text style={styles.stylForIconState}>
          !
        </Text>

        <Text style={styles.stylForErrTitle}>
          Reports unavailable
        </Text>

        <Text
          style={styles.stylForStateCenteredTxt}
        >
          {errInReports}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
    
      // the order of the data where the newest being placed 
      // first is alr given by firestore and the flatlist 
      // will render this order
      data={reports}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ReportCard report={item} />
      )}
      contentContainerStyle={[
        // this empty modifier here will let the empty 
        // msg occupy the availble space
        styles.stylForContentOfReports,
        reports.length === 0
          ? styles.stylForContentOfReportsEmpty
          : null,
      ]}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        // this warning will be displayed before the community reports
        <View
          style={
            styles.stylForCommunityWarning
          }
        >
          <Text
            style={
              styles.stylForCommunityWarningTitle
            }
          >
            Community information only
          </Text>

          <Text
            style={
              styles.stylForCommunityWarningTxt
            }
          >
            These reports have not been verified by PUB or emergency
            services. Avoid reported hazards and follow official
            alerts.
          </Text>
        </View>
      }
      ListEmptyComponent={
        
        // this state means that the query has succeeded 
        // but it has returned no report docs
        <View style={styles.stylForReportsEmp}>
          <Text
            style={styles.stylForReportsEmpIcon}
          >
            📝
          </Text>

          <Text
            style={styles.stylForReportsEmpTitle}
          >
            No reports yet
          </Text>

          <Text
            style={styles.stylForReportsEmpTxt}
          >
            Community reports will appear here after they are
            submitted.
          </Text>
        </View>
      }
    />
  );
}

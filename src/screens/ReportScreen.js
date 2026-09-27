// these are references made:
// https://docs.expo.dev/versions/latest/sdk/location/
// https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
// https://firebase.google.com/docs/firestore/query-data/listen

import { useEffect, useState } from "react";
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Location from "expo-location";
import {
  addDoc,
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../services/firebase";
import { styles } from "../styles/ReportScreenStyl";
import ReportForm from "../components/ReportForm";
import ReportList from "../components/ReportList";

import {
  MIN_LENGTH_FOR_DESCRIPTION,
  NO_OF_MAX_REPORTS,
  addressBuilding,
  withinSGChecking,
} from "../utils/report";

export default function ReportScreen() {
  // the tab state and the values that passed 
  // into its child views are passed into one 
  // screen. the reason for keeping this state 
  // in the parent is so that the form can submit 
  // the data and then switch directly into the 
  // feed without duplicating the firestore logic
  const [tabThatIsActive, setTabThatIsActive] =
    useState("submit");

  const [nameOfReporter, setNameOfReport] = useState("");
  // the name of the reporter comes from the profile and 
  // the description is typed by the user. the date and 
  // location is captured automatically to provide the 
  // report its useful context as to when and where the 
  // incident has occured
  const [description, setDescription] = useState("");
  const [dateOfReport, setReportDate] = useState(new Date());
  const [locOfReport, setLocOfReport] = useState(null);

  const [locChecking, setLocChecking] = useState(false);
  // the location and submission has separate pending 
  // states as either of these actions may be running 
  // while the rest of the form remains visible
  const [submissionChecking, setSubmissionChecking] =
    useState(false);

  const [reports, setReports] = useState([]);
  const [loadingOfReports, setLoadingOfReports] =
    useState(true);
  const [errInReports, setErrInReports] = useState("");

  useEffect(() => {
    // here, the name of the reporter comes the 
    // authenticated profile and its not a free text
    const user = auth.currentUser;

    if (!user) {
      // if there is no UTD, then the matching 
      // user profile cannot be identified
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, "users", user.uid),
      (snapShotOfProfile) => {
        if (snapShotOfProfile.exists()) {
          // this profile remains as the way of 
          // identifying the identity of the reporter
          setNameOfReport(
            snapShotOfProfile.data().name || ""
          );
        }
      },
      (error) => {
        // if there are any failures in loading the 
        // profile, then these errors will be logged 
        // for debugging. furthermore, the submission 
        // validation will also stop the user later if 
        // no reporter name can be loaded
        console.error(
          "Reporter profile error:",
          error
        );
      }
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    // only the newest community reports will be kept in the feed
    const queryOfReports = query(
      // the ordering of arranging the new reports first 
      // and limiting of the network or list size will
      //  be done by firestore here
      collection(db, "reports"),
      orderBy("createdAt", "desc"),
      limit(NO_OF_MAX_REPORTS)
    );

    const unsubscribe = onSnapshot(
      queryOfReports,
      (snapShotOfReports) => {
        const dataOfReport = [];

        // here, every doc ID will be preserved fro the 
        // flatlist's stable key
        for (const docOfReport of snapShotOfReports.docs) {
          const reportSaved = docOfReport.data();

          dataOfReport.push({
            id: docOfReport.id,
            ...reportSaved,
          });
        }

        setReports(dataOfReport);
        // the successful snapshot even if it's an 
        // empty one whill clear the older error
        setErrInReports("");
        setLoadingOfReports(false);
      },
      (error) => {
        console.error(
          "Community reports error:",
          error
        );

        setErrInReports(
          "Community reports could not be loaded. Check your connection and Firestore rules."
        );

        setLoadingOfReports(false);
        // the loading is ended here so that it can be ensured 
        // that the child list selects its error state
      }
    );

    return unsubscribe;
  }, []);

  async function currLocCapture() {
    // the location will only be requested if 
    // the user chooses to attach it to the report
    setLocChecking(true);

    try {
      const permission =
        await Location.requestForegroundPermissionsAsync();

      if (permission.status !== "granted") {
        // here, the loc will not be substituted with the 
        // fake or default coordinate for the community 
        // incident as it can publish info about the location
        Alert.alert(
          "Location permission required",
          "Location access is needed so other users know which area the report concerns."
        );
        return;
      }

      const currLoc =
        await Location.getCurrentPositionAsync({
          // high accuracy is used for the reports as the 
          // precise location matters for the affected areas
          accuracy: Location.Accuracy.High,
        });

      const coord = {
        latitude: currLoc.coords.latitude,
        longitude: currLoc.coords.longitude,
      };

      // here, the coordinates are required and the 
      // reverse geocoded address that is readable is optional
      let address = "";

      try {
        const addresses =
          await Location.reverseGeocodeAsync(coord);

        address = addressBuilding(addresses[0]);
      } catch (error) {
        console.warn(
          "Reverse geocoding unavailable:",
          error
        );
      }

      setLocOfReport({
        // here one normalised object is stored 
        // for previewing and then it is used 
        // later for firestore submission
        latitude: coord.latitude,
        longitude: coord.longitude,
        address,
      });
    } catch (error) {
      console.error("Report location error:", error);

      Alert.alert(
        "Location unavailable",
        "Your current location could not be detected. Please try again."
      );
    } finally {
      // here, the location capture is enabled 
      // again regardless of the permission, 
      // provider or its success
      setLocChecking(false);
    }
  }

  async function reportSubmission() {
    // the description is cleaned once here os that the 
    // validation and the stored content uses the same text
    const user = auth.currentUser;
    const descrpClean = description.trim();

    // this is the submission lock that will prevent 
    // duplicate docs due to rapid repeated taps
    if (submissionChecking) {
      return;
    }

    if (!user) {
      Alert.alert(
        "Sign-in required",
        "Please sign in before submitting a report."
      );
      return;
    }

    if (!nameOfReporter.trim()) {
      // here, the identity of the user is based on the name 
      // of their profile. this is done so that the user will 
      // be directed to fix that source and not enter a 
      // different name in the form
      Alert.alert(
        "Profile name unavailable",
        "Add your name to your profile before submitting a report."
      );
      return;
    }

    if (!locOfReport) {
      // this is make sure the location is entered for the report, 
      // without it, it would not help others with identifying 
      // where the incident has occurred
      Alert.alert(
        "Location required",
        "Please use the location button to attach the affected location."
      );
      return;
    }

    // currently, one coordinates within sg is accepted
    if (!withinSGChecking(locOfReport)) {
      Alert.alert(
        "Location outside Singapore",
        "Community reports are currently limited to Singapore. If you are testing in an emulator, set its simulated location to Singapore first."
      );
      return;
    }

    if (
      descrpClean.length <
      MIN_LENGTH_FOR_DESCRIPTION
    ) {
      // this is the min length required for the report so 
      // that users can provide useful info regarding the incident
      Alert.alert(
        "More information required",
        `Please enter at least ${MIN_LENGTH_FOR_DESCRIPTION} characters describing what you observed.`
      );
      return;
    }

    try {
      setSubmissionChecking(true);

      // here, the trusted ordering time is provided by serverTimestamp. 
      // then as for the client value, this is retained as the 
      // temporary display fallback until the server value resolves
      await addDoc(collection(db, "reports"), {
        reporterId: user.uid,
        reporterName: nameOfReporter,
        description: descrpClean,
        location: {
          latitude: locOfReport.latitude,
          longitude: locOfReport.longitude,
          address: locOfReport.address || "",
        },
        status: "unverified",
        // the report card will always render 
        // the fixed text, UNVERIFIED. 
        createdAt: serverTimestamp(),
        clientCreatedAt: new Date().toISOString(),
      });

      // here, the form is reset and it is moved to the 
      // feed where the snapshot will add the report
      setDescription("");
      setLocOfReport(null);
      setReportDate(new Date());
      setTabThatIsActive("reports");

      Alert.alert(
        // this is added to explcitly tell users that the 
        // report that has been submitted should not be 
        // taken as the official report until it has been verified
        "Report submitted",
        "Your report is now visible to signed-in community members as an unverified report."
      );
    } catch (error) {
      console.error(
        "Report submission error:",
        error
      );

      Alert.alert(
        "Report not submitted",
        error.message ||
          "The report could not be submitted. Please try again."
      );
    } finally {
      setSubmissionChecking(false);
    }
  }

  let locBtnTxt = "Use current location";

  if (locOfReport) {
    // once the report has been attached, the same control 
    // will also allow users to replace the location if required
    locBtnTxt = "Update current location";
  }

  const locBtnDisabled =
    locChecking || submissionChecking;

  // the capturing of the location will be disabled only 
  // during the location req or during the submission of the report
  return (
    <View style={styles.screen}>
      <View style={styles.stylForTabsContainer}>
        {/* here, child view is changed by the tab state without creating another route*/}
        <TouchableOpacity
          style={[
            styles.stylForTabBtn,
            tabThatIsActive === "submit"
              ? styles.stylForActiveTabBtn
              : null,
          ]}
          onPress={() =>
            setTabThatIsActive("submit")
          }
        >
          <Text
            style={[
              styles.stylForTabBtnTxt,
              tabThatIsActive === "submit"
                ? styles.stylForActiveTabBtnTxt
                : null,
            ]}
          >
            Submit Report
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.stylForTabBtn,
            tabThatIsActive === "reports"
              ? styles.stylForActiveTabBtn
              : null,
          ]}
          onPress={() =>
            setTabThatIsActive("reports")
          }
        >
          <Text
            style={[
              styles.stylForTabBtnTxt,
              tabThatIsActive === "reports"
                ? styles.stylForActiveTabBtnTxt
                : null,
            ]}
          >
            Community Reports
          </Text>
        </TouchableOpacity>
      </View>

      {/* here, only the active child will rendered 
      so that the form and feed responsibilities 
      will be kept separate */}
      {tabThatIsActive === "submit" ? (
        <ReportForm
          currLocCapture={currLocCapture}
          dateOfReport={dateOfReport}
          description={description}
          locBtnDisabled={locBtnDisabled}
          locBtnTxt={locBtnTxt}
          locChecking={locChecking}
          locOfReport={locOfReport}
          nameOfReporter={nameOfReporter}
          reportSubmission={reportSubmission}
          setDescription={setDescription}
          submissionChecking={submissionChecking}
        />
      ) : (
        <ReportList
          errInReports={errInReports}
          loadingOfReports={loadingOfReports}
          reports={reports}
        />
      )}
    </View>
  );
}

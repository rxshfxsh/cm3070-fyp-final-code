// this is the reference made:
// https://reactnative.dev/docs/keyboardavoidingview

import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { COLOURS } from "../constants/colours";
import { styles } from "../styles/ReportScreenStyl";
import {
  MAX_LENGTH_FOR_DESCRIPTION,
  SGDateFormatting,
  coordFormatting,
} from "../utils/report";

export default function ReportForm({
  currLocCapture,
  dateOfReport,
  description,
  locBtnDisabled,
  locBtnTxt,
  locChecking,
  locOfReport,
  nameOfReporter,
  reportSubmission,
  setDescription,
  submissionChecking,
}) {
  return (
    // this is used to make sure that keyboard does not cover the lower fields
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
      keyboardVerticalOffset={
        Platform.OS === "ios" ? 90 : 0
      }
    >
      <ScrollView
        // this allows the buttons to receive the taps without 
        // requiring a tap that is close to the keyboard
        contentContainerStyle={
          styles.stylForFormContent
        }
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* this is to ensure that the users are reminded to 
        enter proper details and they seek official help if 
        they are in stuck in danger too */}
        <View style={styles.stylForBannerInfo}>
          <Text
            style={styles.stylForBannerInfoTitle}
          >
            Community reporting
          </Text>

          <Text
            style={styles.stylForBannerInfoTxt}
          >
            Share only what you personally observed. For immediate
            danger, contact emergency services instead of relying on
            this form.
          </Text>
        </View>

        <Text style={styles.stylForFieldLbl}>
          Reporter name
        </Text>

        {/* the identity of the user and the display 
        time of the form will be made to be read-only 
        to protect the context of the report */}
        <View style={styles.stylForLockedField}>
          <Text
            style={styles.stylForLockedFieldValue}
          >
            {nameOfReporter ||
              "Loading profile name..."}
          </Text>

          <Text
            style={styles.stylForLockedFieldIcon}
          >
            🔒
          </Text>
        </View>

        <Text style={styles.stylForFieldHelp}>
          {/* this is to explain to users that the info has been taken 
          from their profile and it cannot be edited */}
          This is taken from your profile and cannot be edited here.
        </Text>

        <Text style={styles.stylForFieldLbl}>
          Date and time
        </Text>

        <View style={styles.stylForLockedField}>
          {/* this part is a preview and firestore will 
          record the authorative server time later */}
          <Text
            style={styles.stylForLockedFieldValue}
          >
            {SGDateFormatting(dateOfReport)}
          </Text>

          <Text
            style={styles.stylForLockedFieldIcon}
          >
            🕒
          </Text>
        </View>

        <Text style={styles.stylForFieldHelp}>
          The final submission time is recorded securely by Firebase.
        </Text>

        <Text style={styles.stylForFieldLbl}>
          Location{" "}
          <Text
            style={styles.stylForRequiredMark}
          >
            *
          </Text>
        </Text>

        {/* here, the formatted attached location or the 
        clear empty state will be shown accordingly */}
        {locOfReport ? (
          <View style={styles.stylForSelectedLoc}>
            <Text
              style={styles.stylForSelectedLocTitle}
            >
              📍 Location attached
            </Text>

            {locOfReport.address ? (
              <Text
                style={
                  styles.stylForSelectedLocAddress
                }
              >
                {locOfReport.address}
              </Text>
            ) : null}

            <Text
              style={
                styles.stylForSelectedLocCoord
              }
            >
              {coordFormatting(locOfReport)}
            </Text>
          </View>
        ) : (
          <View style={styles.stylForFieldEmpty}>
            <Text
              style={styles.stylForFieldEmptyTxt}
            >
              No location attached yet
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.stylForSecBtn,
            locChecking
              ? styles.stylForDisabledtBtn
              : null,
          ]}
          onPress={currLocCapture}
          disabled={locBtnDisabled}
        >
          {/* the progress will replace the label only 
          during the location operation */}
          {locChecking ? (
            <ActivityIndicator
              size="small"
              color={COLOURS.primary}
            />
          ) : (
            <Text style={styles.stylForSecBtnTxt}>
              {locBtnTxt}
            </Text>
          )}
        </TouchableOpacity>

        <Text style={styles.stylForFieldLbl}>
          What did you observe?{" "}
          <Text
            style={styles.stylForRequiredMark}
          >
            *
          </Text>
        </Text>

        {/* 
        the limits to the character will be enforced visually and also by the native input */}
        <TextInput
          style={styles.stylForDescrpInput}
          value={description}
          onChangeText={setDescription}
          placeholder="Describe the flooding, water level, blocked road, hazards, or anything else people should know..."
          placeholderTextColor={COLOURS.textLight}
          multiline
          textAlignVertical="top"
          maxLength={MAX_LENGTH_FOR_DESCRIPTION}
          editable={!submissionChecking}
        />

        <Text style={styles.stylForCharCount}>
          {/* this live feedback is used to help users to stay 
          within the stored length limit */}
          {description.length}/
          {MAX_LENGTH_FOR_DESCRIPTION}
        </Text>

        {/* while the firestore write is still pending, 
        the submission will be disabled */}
        <TouchableOpacity
          style={[
            styles.stylForSubmitBtn,
            submissionChecking
              ? styles.stylForDisabledtBtn
              : null,
          ]}
          onPress={reportSubmission}
          disabled={submissionChecking}
        >
          {submissionChecking ? (
            <ActivityIndicator
              size="small"
              color={COLOURS.card}
            />
          ) : (
            <Text
              style={styles.stylForSubmitBtnTxt}
            >
              Submit community report
            </Text>
          )}
        </TouchableOpacity>

        <Text
          style={styles.stylForSubmissionNote}
        >
          {/* this is to state to the users about what is stored 
          for the submission */}
          Your Firebase user ID is stored with the report for
          accountability. It is not displayed in the community feed.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

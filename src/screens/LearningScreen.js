// references made:
// https://firebase.google.com/docs/firestore/manage-data/transactions
// https://reactnative.dev/docs/linking

import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { doc, runTransaction } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { COLOURS } from "../constants/colours";
import { styles } from "../styles/LearningScreenStyl";
import {
  CONTENT_OF_LESSONS,
  URL_FOR_PUB_SAFETY,
} from "../data/lessonContent";

export default function LearningScreen({
  route: routeWay,
  navigation: navigationPathway,
}) {
  // while the transaction is still running, completionCheck will 
  // prevent the repeated taps
  const [completionCheck, setCompletionCheck] = useState(false);

  // pageCurrently will select one entry from pagesForLearning and 
  // the ScrollView ref will be used to reset the reading position 
  // after the page changes
  const [pageCurrently, setPageCurrently] = useState(0);
  const referenceForScrolling = useRef(null);

  // if the navigation does not provide a recognisable 
  // lesson ID, then it will default to lesson 1
  let idOfLesson = "lesson1";

  if (routeWay.params && routeWay.params.lessonId) {
    // when a node is passed on the learning map, the 
    // navigation will pass this value
    idOfLesson = routeWay.params.lessonId;
  }

  const lessonChosen =
    CONTENT_OF_LESSONS[idOfLesson] || CONTENT_OF_LESSONS.lesson1;

  // in the case that there is an unknown lesson ID that has been passed, 
  // the second fallback will protect the rendering only. then the 
  // idOfLesson can still be stored and awared points when the completion runs

  // the shared page structure is used here so that every lesson 
  // will have identical navigation
  const pagesForLearning = [
    {
      typeOfPage: "scenario",
    },
    // here every section entry retains a reference 
    // to its matching content object
    {
      typeOfPage: "section",
      section: lessonChosen.sectionsForLesson[0],
    },
    {
      typeOfPage: "section",
      section: lessonChosen.sectionsForLesson[1],
    },
    {
      typeOfPage: "section",
      section: lessonChosen.sectionsForLesson[2],
    },
    {
      typeOfPage: "section",
      section: lessonChosen.sectionsForLesson[3],
    },
    {
      typeOfPage: "summary",
    },
  ];

  const pageChosen = pagesForLearning[pageCurrently];
  // the booleans here control whether the Previous
  //  will be visible and whether Next should move 
  // forward or run the completion transaction
  const firstPageCheck = pageCurrently === 0;
  const lastPageCheck =
    pageCurrently === pagesForLearning.length - 1;

  // here, the page postion will be converted into a
  //  percentage for the progress bar
  const progressOfPage = Math.round(
    ((pageCurrently + 1) / pagesForLearning.length) * 100
  );

  useEffect(() => {
    // when this screen is reused for another lesson,
    //  it must restart at its first page
    setPageCurrently(0);
  }, [idOfLesson]);

  function movingTopage(numberOfThePage) {
    // here, the page will be changed and then the 
    // ScrollView will return to the start of the
    //  new content
    setPageCurrently(numberOfThePage);

    if (referenceForScrolling.current) {
      referenceForScrolling.current.scrollTo({
        y: 0,
        animated: true,
      });
    }
  }

  function nxtBtnHandling() {
    // this button will move forward the pages 
    // until the final page is reached where 
    // the lesson gets completed
    if (lastPageCheck) {
      // after all the content pages, the summary 
      // will be used to indicate the completion 
      // of the lesson
      completeLessonHandling();
    } else {
      // if it is in the intermediate pages, then it 
      // will only advance the local UI state and
      //  not write data
      movingTopage(pageCurrently + 1);
    }
  }

  async function completeLessonHandling() {
    const user = auth.currentUser;

    if (!user || completionCheck) {
      // here, the UID is required for the profile write
      //  and the completionCheck will block the second 
      // transaction if the final button is tapped repeatedly
      return;
    }

    setCompletionCheck(true);

    try {
      let pointsEarned = false;
      const referenceToUser = doc(db, "users", user.uid);

      // the transaction here will prevent the concurrent 
      // devices from awarding the same lesson twice
      await runTransaction(db, async (transaction) => {
        const snapShotOfUser = await transaction.get(
          referenceToUser
        );

        if (!snapShotOfUser.exists()) {
          // without the expected user porfile, the 
          // progress of the user cannot be stored reliably
          throw new Error(
            "Your user profile could not be found."
          );
        }

        const dataOfUser = snapShotOfUser.data();
        let lessonsCompleted = [];

        if (Array.isArray(dataOfUser.completedLessons)) {
          // here, when it is being added, the previously 
          // completed lesson IDs will be preserved first
          lessonsCompleted = dataOfUser.completedLessons;
        }

        // here, only the first completion will write 
        // the ID and add 5 points
        if (!lessonsCompleted.includes(idOfLesson)) {
          pointsEarned = true;

          let scoreCurrently = Number(
            dataOfUser.preparednessScore
          );

          if (isNaN(scoreCurrently)) {
            // the conversion here is used to prevent the 
            // malformed old data from producing NaN
            scoreCurrently = 0;
          }

          transaction.update(referenceToUser, {
            // the new array is used to keep the exisitng 
            // order and also append the lesson here once
            completedLessons: [
              ...lessonsCompleted,
              idOfLesson,
            ],
            preparednessScore: scoreCurrently + 5,
          });
        }
      });

      // for lesson 4 as it is the last lesson, it will 
      // offer the unlocked unit quiz as the next action
      const finalLessonChecking = idOfLesson === "lesson4";
      let message = "This lesson was already completed.";

      if (pointsEarned) {
        // this local flag will be set by the 
        // transaction only when it has performed 
        // the write
        message = "You earned 5 preparedness points.";
      }

      if (finalLessonChecking) {
        // since finishing lesson 4 unlocks the 
        // quiz, it is then offered here as the
        // next steps for users to choose from
        Alert.alert(
          "Lesson Completed! 🎉",
          `${message} You have unlocked the Unit 1 quiz.`,
          [
            {
              text: "Back to Map",
              style: "cancel",
              onPress: () => navigationPathway.goBack(),
            },
            {
              text: "Take Quiz",
              onPress: () =>
                navigationPathway.navigate("Quiz"),
            },
          ]
        );
      } else {
        // however, if it is the first 3 lessons, then 
        // users will be given the option to return to 
        // the map where the next node updates
        Alert.alert(
          "Lesson Completed! 🎉",
          `${message} The next module is now unlocked.`,
          [
            {
              text: "Continue",
              onPress: () => navigationPathway.goBack(),
            },
          ]
        );
      }
    } catch (error) {
      // in the case the firestore is unable to save 
      // the completion, then the learner is kept 
      // on the lesson
      Alert.alert(
        "Unable to complete lesson",
        error.message || "Please try again."
      );
    } finally {
      // here, the final button will be re-enabled 
      // despite whether the write has succeeded 
      // or not
      setCompletionCheck(false);
    }
  }

  let nxtBtnTxt = "Next Page";

  if (lastPageCheck) {
    // this label here will communicate for both 
    // the final action and its possible reward
    nxtBtnTxt = "Complete Lesson\n+5 points";
  }

  return (
    <ScrollView
      ref={referenceForScrolling}
      style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.stylForHeaderForLesson}>
        <View style={styles.stylOfTxtContainerForheader}>
          <Text style={styles.stylForUnitTxt}>
            {lessonChosen.unitForLesson} ·{" "}
            {lessonChosen.noOfTheLesson}
          </Text>

          <Text style={styles.stylForTitle}>
            {lessonChosen.titleForLesson}
          </Text>

          <Text style={styles.stylForSubtitle}>
            {lessonChosen.subtitleForLesson}
          </Text>
        </View>

        <Text style={styles.stylForIconOfLesson}>
          {lessonChosen.iconForLesson}
        </Text>
      </View>

      <View style={styles.stylForProgressHeader}>
        {/* here, the page count and the percentage summary
         will be displayed here */}
        <Text style={styles.stylForProgressTxt}>
          Page {pageCurrently + 1} of {pagesForLearning.length}
        </Text>

        <Text style={styles.stylForProgressTxt}>
          {progressOfPage}%
        </Text>
      </View>

      <View style={styles.stylForTrackOfProgress}>
        {/*  based on the width that is calculated above, 
        the fill will grow with each page */}
        <View
          style={[
            styles.stylForFillingOfProcess,
            {
              width: `${progressOfPage}%`,
            },
          ]}
        />
      </View>

      {/* here, only the content card that matches the
       current page type will be rendered here */}
      {pageChosen.typeOfPage === "scenario" ? (
        // on the first page, the lesson will be presented 
        // as a realistic decision before presenting the theory
        <View style={styles.stylForCardScenario}>
          <Text style={styles.stylForLblScenario}>
            DECISION SCENARIO
          </Text>

          <Text style={styles.stylForTitleScenario}>
            {lessonChosen.scenarioForLesson.titleForLesson}
          </Text>

          <Text style={styles.stylForSituationScenario}>
            {
              lessonChosen.scenarioForLesson
                .situationForLesson
            }
          </Text>

          <View style={styles.stylForDecisionBox}>
            <Text style={styles.stylForDecisionLbl}>
              SAFER DECISION
            </Text>

            <Text style={styles.stylForDecisiontxt}>
              {
                lessonChosen.scenarioForLesson
                  .decisionForLesson
              }
            </Text>
          </View>
        </View>
      ) : null}

      {pageChosen.typeOfPage === "section" ? (
        // the pages that are in the middle part of the lesson 
        // content will reuse the same card while its section 
        // object will change accordingly
        <View style={styles.stylForContentCard}>
          <Text style={styles.stylForNumberInSection}>
            {pageCurrently}
          </Text>

          <View style={styles.stylForSectionTxtCont}>
            <Text style={styles.stylForSectionheading}>
              {pageChosen.section.headingForLesson}
            </Text>

            <Text style={styles.stylForSectionContent}>
              {pageChosen.section.contentForLesson}
            </Text>
          </View>
        </View>
      ) : null}

      {pageChosen.typeOfPage === "summary" ? (
        // at the last page, the lesson will be reinforced 
        // and then its source material where the lesson 
        // content has been derived from will also be presented
        <>
          <View style={styles.stylForSummaryCard}>
            <Text style={styles.stylForSummaryTitle}>
              Key Points
            </Text>

            {lessonChosen.keyPointsForLesson.map(
              (point, index) => (
                // the index is safe here as there is no 
                // reordering happening in the static ordered list
                <View
                  key={index}
                  style={styles.stylForRowInKeyPoint}
                >
                  <Text style={styles.stylForCheckIcon}>
                    ✓
                  </Text>

                  <Text style={styles.stylForKeyPointTxt}>
                    {point}
                  </Text>
                </View>
              )
            )}
          </View>

          {/* this is the link that will guide users to
           the official source behind the lesson content*/}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              Linking.openURL(URL_FOR_PUB_SAFETY)
            }
            style={styles.stylForSourceCard}
          >
            <Text style={styles.stylForSourceLbl}>
              REFERENCE MATERIAL
            </Text>

            <Text style={styles.stylForSourceTitle}>
              PUB Flood Safety Tips ↗
            </Text>
          </TouchableOpacity>
        </>
      ) : null}

      {/* the previous button is hidden on page one and 
      the next button will change to complete on the 
      summary that is the last page*/}
      <View style={styles.stylForPageBtns}>
        {!firstPageCheck ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.stylForPrevBtn}
            onPress={() =>
              movingTopage(pageCurrently - 1)
            }
          >
            <Text style={styles.stylForPrevBtnTxt}>
              Previous
            </Text>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          activeOpacity={0.8}
          disabled={completionCheck}
          style={[
            styles.stylForNextBtn,
            !firstPageCheck
              ? styles.stylForNxtBtnWPrev
              : null,
            completionCheck
              ? styles.stylForCompleteBtnDisabled
              : null,
          ]}
          onPress={nxtBtnHandling}
        >
          {completionCheck ? (
            <ActivityIndicator color={COLOURS.card} />
          ) : (
            <Text style={styles.stylForCompleteBtnTxt}>
              {nxtBtnTxt}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

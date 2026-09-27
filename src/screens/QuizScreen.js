// this is the reference made:
// https://firebase.google.com/docs/firestore/manage-data/transactions

import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { doc, runTransaction } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { COLOURS } from "../constants/colours";
import { styles } from "../styles/QuizScreenStyl";

import {
  ID_FOR_QUIZ,
  qnsForQuiz,
  SCORE_TO_PASS_QUIZ,
} from "../data/quizData";

export default function QuizScreen({
  navigation: navigationPathway,
}) {
  // the navigation, scoring, selection and 
  // submission-lock state are all stored 
  // separately here. so here, current is the 
  // index of the question, then scoreForQuiz 
  // contains only the answers from questions 
  // that alr has been left behind and it does 
  // not contain the selected ans that is on 
  // the current page.
  const [current, setCurrent] = useState(0);
  const [scoreForQuiz, setScoreForQuiz] = useState(0);
  const [selectedAnsForQn, setSelectedAnsForQn] =
    useState(null);
  const [submissionCheck, setSubmissionCheck] =
    useState(false);

  const currentQuestion = qnsForQuiz[current];
  // by comparing with the length - 1, it is done so 
  // that the shared action btn can identify the submission
  const lastQnCheck = current === qnsForQuiz.length - 1;

  // the progress bar here also includes the question 
  // that is currently being answered
  const prgrssSoFar = Math.round(
    ((current + 1) / qnsForQuiz.length) * 100
  );

  function quizResetting() {
    // here, the local state is reset before leaving
    //  so that the future attempt can start clearly
    setCurrent(0);
    setScoreForQuiz(0);
    setSelectedAnsForQn(null);
  }

  function nextHandling() {
    // this is to make sure that users make a 
    // choice before the scoring and the moving 
    // on the next question takes place
    if (!selectedAnsForQn) {
      Alert.alert(
        "Select an answer",
        "Please choose an answer first."
      );
      return;
    }

    const correctAnsChecking =
      selectedAnsForQn === currentQuestion.typeOfAns;

    // here, the selected option text gets compared 
    // with the answer text that is stored in quizData. 
    // Therefore, there is no need for a separate answer 
    // index that has to be kept in the component state

    if (correctAnsChecking) {
      // this functional state makes sure that 
      // it avoids reading the stale score when
      // there are rapid updates
      setScoreForQuiz(
        (currentScore) => currentScore + 1
      );
    }

    setSelectedAnsForQn(null);
    // the previous selection is cleared here before 
    // the options for the next question is rendered
    setCurrent((currentIndex) => currentIndex + 1);
  }

  async function submitHandling() {
    // as the last selection ans has not been 
    // entered into scoreForQuiz, it will be included into it
    if (!selectedAnsForQn) {
      Alert.alert(
        "Select an answer",
        "Please choose an answer first."
      );
      return;
    }

    const user = auth.currentUser;

    if (!user || submissionCheck) {
      // the results belong to a user profile and 
      // the lock is used to prevent duplicate 
      // attempt entries/points when the earlier 
      // submission is still being saved
      return;
    }

    let finalScoreOfUser = scoreForQuiz;

    if (selectedAnsForQn === currentQuestion.typeOfAns) {
      // as the final answer has not been passed through
      // nextHandling, it will be included here
      finalScoreOfUser = scoreForQuiz + 1;
    }

    const passed =
      finalScoreOfUser >= SCORE_TO_PASS_QUIZ;

    // the passing is calculated before the transaction 
    // so that the same value that is stored in the 
    // attempt history and it is used to decide 
    // whether the points are due

    setSubmissionCheck(true);

    try {
      let pointsEarnedForQuiz = false;
      const referenceOfUser = doc(
        db,
        "users",
        user.uid
      );

      // the attempt and the reward of the first 
      // pass is stored here atomically
      await runTransaction(db, async (transaction) => {
        const snapShotOfUser = await transaction.get(
          referenceOfUser
        );

        if (!snapShotOfUser.exists()) {
          throw new Error(
            "Your user profile could not be found."
          );
        }

        const dataOfUser = snapShotOfUser.data();
        let scoresForQuiz = [];
        let rewardsForQuiz = [];

        if (Array.isArray(dataOfUser.quizScores)) {
          // the complete attempt history is kept here 
          // rather than just replacing it with the last score
          scoresForQuiz = dataOfUser.quizScores;
        }

        if (Array.isArray(dataOfUser.quizRewards)) {
          // this list will record the user's eligibility
          //  to get the reward instead of just relying
          //  on the scores
          rewardsForQuiz = dataOfUser.quizRewards;
        }

        // here, the assessments that alr has been 
        // granted points is recorded by quizRewards
        const alrEarnedReward =
          rewardsForQuiz.includes(ID_FOR_QUIZ);

        const attemptForQuiz = {
          // the total and the pass state is 
          // saved here so that its meaning is 
          // preserved even if the question 
          // data changes
          quizId: ID_FOR_QUIZ,
          score: finalScoreOfUser,
          total: qnsForQuiz.length,
          passed: passed,
          completedAt: new Date(),
        };

        const dataUpdating = {
          // here, regardless of whether the 
          // completed attempt is a pass or a 
          // fail, it is appended here
          quizScores: [
            ...scoresForQuiz,
            attemptForQuiz,
          ],
        };

        if (passed && !alrEarnedReward) {
          // the repeat attempt is saved here 
          // and if this is the first passed attempt, 
          // then the 10 points will be added and its 
          // quiz ID will be recorded
          pointsEarnedForQuiz = true;

          let currentScore = Number(
            dataOfUser.preparednessScore
          );

          if (isNaN(currentScore)) {
            currentScore = 0;
          }

          dataUpdating.preparednessScore =
            currentScore + 10;

          // the quiz ID is recorded here so 
          // that the later attempts do not 
          // get rewarded again
          dataUpdating.quizRewards = [
            ...rewardsForQuiz,
            ID_FOR_QUIZ,
          ];
        }

        transaction.update(
          referenceOfUser,
          dataUpdating
        );
      });

      // the result copy for the first pass, 
      // repeat pass and failed attempt is 
      // built here
      let rsltMsg;

      if (passed && pointsEarnedForQuiz) {
        rsltMsg =
          "You passed and earned 10 preparedness points!";
      } else if (passed) {
        rsltMsg =
          "You passed. The points for this challenge were already awarded.";
      } else {
        rsltMsg =
          `You need ${SCORE_TO_PASS_QUIZ}/` +
          `${qnsForQuiz.length} to pass. ` +
          "Review the modules and try again.";
      }

      let rsltTitle = "Keep Practising";
      let rsltBtnTxt = "Review Modules";

      if (passed) {
        rsltTitle = "Challenge Completed! 🎉";
        rsltBtnTxt = "Return to Learning Map";
      }

      Alert.alert(
        rsltTitle,
        `You scored ${finalScoreOfUser}/${qnsForQuiz.length}. ${rsltMsg}`,
        [
          {
            text: rsltBtnTxt,
            onPress: () => {
              // here, the old answers will be cleared 
              // before returning to the learning module map tab
              quizResetting();

              navigationPathway.popTo("MainTabs", {
                screen: "LearningMap",
              });
            },
          },
        ]
      );
    } catch (error) {
      // when the transaction has failed, its 
      // result that recorded will not be claimed
      Alert.alert(
        "Unable to save result",
        error.message || "Please try again."
      );
    } finally {
      // here, another submission attempt 
      // will be allowed regardless of 
      // whether there was sucess or not
      setSubmissionCheck(false);
    }
  }

  function mainBtnHandling() {
    // this is the primary button that is used to 
    // advance the ordinary questions and 
    // eventually submit the final one
    if (lastQnCheck) {
      submitHandling();
    } else {
      nextHandling();
    }
  }

  let btnTxt = "Next Question";

  if (lastQnCheck) {
    btnTxt = "Submit Challenge";
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.topPartEyeBrow}>
        UNIT 1 ASSESSMENT
      </Text>

      <Text style={styles.stylForTitle}>
        Flash Flood Decision Challenge
      </Text>

      <View style={styles.stylForPrgrssHeader}>
        <Text style={styles.stylForPrgrssTxt}>
          Question {current + 1} of {qnsForQuiz.length}
        </Text>

        <Text style={styles.stylForScoreRequirement}>
          Pass: {SCORE_TO_PASS_QUIZ}/{qnsForQuiz.length}
        </Text>
      </View>

      <View style={styles.stylForPrgrssTrack}>
        <View
          style={[
            styles.stylForFillingOfPrgrss,
            {
              width: `${prgrssSoFar}%`,
            },
          ]}
        />
      </View>

      <Text style={styles.stylForModLbl}>
        {/* this module label will show which lesson outcome is being tested*/}
        {currentQuestion.typeOfMod}
      </Text>

      <Text style={styles.stylForQn}>
        {currentQuestion.typeOfQn}
      </Text>

      {/* based on the current question data, 
      the selectable radio style rows will be 
      generated accordingly*/}
      {currentQuestion.typeOfOptions.map((option) => {
        const selctionChecking =
          selectedAnsForQn === option;
        return (
          <TouchableOpacity
            activeOpacity={0.75}
            key={option}
            onPress={() =>
              setSelectedAnsForQn(option)
            }
            style={[
              styles.stylForOption,
              selctionChecking
                ? styles.stylForSelectedOption
                : null,
            ]}
          >
            <View
              style={[
                styles.stylForRadio,
                selctionChecking
                  ? styles.stylForSelectedRadio
                  : null,
              ]}
            >
              {selctionChecking ? (
                <View style={styles.stylForRadioDot} />
              ) : null}
            </View>

            <Text
              style={[
                styles.stylForOptionTxt,
                selctionChecking
                  ? styles.stylForSelectedOptionTxt
                  : null,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        activeOpacity={0.8}
        disabled={submissionCheck}
        style={[
          styles.stylForBtn,
          submissionCheck
            ? styles.stylForDisabledBtn
            : null,
        ]}
        onPress={mainBtnHandling}
      >
        {submissionCheck ? (
          <ActivityIndicator color={COLOURS.card} />
        ) : (
          <Text style={styles.stylForBtnTxt}>
            {btnTxt}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

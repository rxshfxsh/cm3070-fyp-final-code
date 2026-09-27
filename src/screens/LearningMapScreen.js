// reference made:
// https://firebase.google.com/docs/firestore/query-data/listen
// https://www.youtube.com/watch?v=dP75Khfy4s4

import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
} from "react-native";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { styles } from "../styles/LearningMapScreenStyl";
import NodeOfLearning from "../components/LearningNode";

export default function LearningMapScreen({
  navigation: navigationPathway,
}) {
  // the completedLessons are stored by the firestore 
  // as IDs such as lesson1. the reason for keeping the 
  // local state as the same array is so that the 
  // completion checks are made simple and readable
  const [lessonsDone, setLessonsDone] = useState([]);

  useEffect(() => {
    // after a lesson ends, the realtime progress
    //  makes the map update immediately
    const user = auth.currentUser;

    if (!user) {
      // since the learning map belongs to a signed 
      // in profile, no progress had to be loaded 
      // when the firebase does not currently expose a user
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, "users", user.uid),
      (snapOfDoc) => {
        if (snapOfDoc.exists()) {
          const dataOfUser = snapOfDoc.data();

          if (Array.isArray(dataOfUser.completedLessons)) {
            // since includes() is used below to calculate the 
            // completion and unlocking states of the user, 
            // only array should be accepted
            setLessonsDone(dataOfUser.completedLessons);
          } else {
            // here, if there are older or new profiles 
            // without the field, then it can still begin 
            // safely with no lessons
            setLessonsDone([]);
          }
        }
      }
    );

    return unsubscribe;
  }, []);

  // here, the completion is persisted as lesson IDs 
  // rather than duplicated booleans
  const doneForLsOne = lessonsDone.includes("lesson1");
  const doneForLsTwo = lessonsDone.includes("lesson2");
  const doneForLsThree = lessonsDone.includes("lesson3");
  const doneForLsFour = lessonsDone.includes("lesson4");

  // for a user to move forward with the lesson plan, 
  // they need to complete the lessons in order. hence, 
  // the unlock values are derived and not stored 
  // separately. the reason for doing this is to 
  // prevent the completion and unlocking data 
  // from disagreeing with each other
  const unlockingOfLsTwo = doneForLsOne;
  const unlockingOfLsThree = doneForLsTwo;
  const unlockingOfLsFour = doneForLsThree;
  const unlockingOfQuiz = doneForLsFour;

  function LsOpen(idOfLesson) {
    // the selected ID will tell the LearningScreen 
    // about which content object to render
    navigationPathway.navigate("Learning", {
      lessonId: idOfLesson,
    });
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.stylForTitleOfpage}>
        Learning Journey
      </Text>

      <Text style={styles.stylForSubTitleOfpage}>
        Work through realistic situations and practise making safer
        decisions before, during and after a flash flood.
      </Text>

      <View style={styles.stylForHeaderOfUnit}>
        {/* the shared outcome of the 4 lesson nodes is 
        explained by the header here*/}
        <View style={styles.stylForContainerOfTxtUnit}>
          <Text style={styles.stylForLabelOfUnit}>
            UNIT 1
          </Text>

          <Text style={styles.stylForTitleOfUnit}>
            Making Safe Choices During Flash Floods
          </Text>

          <Text style={styles.stylForDespOfUnit}>
            Recognise danger early, choose safer routes and protect
            people before property.
          </Text>
        </View>

        <Text style={styles.stylForIconOfUnit}>
          🌧️
        </Text>
      </View>

      {/* the first lesson, Lesson 1 is always available 
      and the following lessons will be unlocked based
       on the unlock states accoridngly*/}
      <NodeOfLearning
        title="Recognising Flood Risk Early"
        icon="👀"
        pos="centre"
        completed={doneForLsOne}
        unlocked={true}
        onPress={() => LsOpen("lesson1")}
      />

      <View style={styles.stylForSpacerPath} />

      {/* every spacer is continues the journey
       between the 2 nodes visually*/}
      <NodeOfLearning
        title="Travelling Safely on Foot"
        icon="🚶"
        pos="left"
        completed={doneForLsTwo}
        unlocked={unlockingOfLsTwo}
        onPress={() => LsOpen("lesson2")}
      />

      <View style={styles.stylForSpacerPath} />

      <NodeOfLearning
        title="Making Safe Driving Decisions"
        icon="🚗"
        pos="right"
        completed={doneForLsThree}
        unlocked={unlockingOfLsThree}
        onPress={() => LsOpen("lesson3")}
      />

      <View style={styles.stylForSpacerPath} />

      <NodeOfLearning
        title="Protecting Homes & Workplaces"
        icon="🏠"
        pos="left"
        completed={doneForLsFour}
        unlocked={unlockingOfLsFour}
        onPress={() => LsOpen("lesson4")}
      />

      <View style={styles.stylForSpacerPath} />

      {/* finally, the unit quiz will only unlock after all 
      the 4 lesson nodes are done*/}
      <NodeOfLearning
        title="Flash Flood Decision Challenge"
        icon="★"
        pos="centre"
        completed={false}
        unlocked={unlockingOfQuiz}
        typeOfNode="quiz"
        onPress={() => navigationPathway.navigate("Quiz")}
      />

      <View style={styles.stylForNextUnitContainer}>
        {/* the unit 2 here is intentioanlly shown as a preview 
        as it will be developed for future works*/}
        <Text style={styles.stylForNextUnitIcon}>
          🔒
        </Text>

        <View style={styles.stylForNextUnitTxtContainer}>
          <Text style={styles.stylForNextUnitLbl}>
            UNIT 2
          </Text>

          <Text style={styles.stylForNextUnitTitle}>
            Community Flood Response
          </Text>

          <Text style={styles.stylForNextUnitDesp}>
            Complete Unit 1 to unlock the next learning journey.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

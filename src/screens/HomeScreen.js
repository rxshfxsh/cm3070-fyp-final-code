// these are the references made: 
// https://firebase.google.com/docs/firestore/query-data/listen
// https://reactnavigation.org/docs/nesting-navigators/#navigating-to-a-screen-in-a-nested-navigator
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { styles } from "../styles/HomeScreenStyl";

export default function HomeScreen({
  navigation: navigationPathway,
}) {
  const [profileOfUser, setProfileOfUser] = useState(null);

  useEffect(() => {
    // here the greeting and the score is kept 
    // synchronised with firestore updates
    const user = auth.currentUser;

    if (!user) {
      // the authentication here may be changing while the 
      // screen unmounts. hence if there is no UID, then 
      // there is no safe profile doc to subscribe to
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, "users", user.uid),
      (snapOfDoc) => {
        if (snapOfDoc.exists()) {
          // the whole profile is saved here so that when they 
          // are changes to the name and the future score, it 
          // can be handled from the same realtime doc snapshot
          setProfileOfUser(snapOfDoc.data());
        }
      }
    );

    // when the screen is unmounted, then 
    // the realtime listener is detached
    return unsubscribe;
  }, []);

  // the defaults here allow the screen to render safely before the first snapshot
  let nameOfUser = "User";
  let scoreOfUserPreparedness = 0;

  if (profileOfUser) {
    if (profileOfUser.name) {
      // when the name field is being saved, then only fallback will be replaced
      nameOfUser = profileOfUser.name;
    }

    if (
      profileOfUser.preparednessScore !== undefined &&
      profileOfUser.preparednessScore !== null
    ) {
      // here, 0 is still a valid score. therefore the check uses
      //  null or undefined rather than the truthiness test that
      //  would reject it wrongly
      scoreOfUserPreparedness = profileOfUser.preparednessScore;
    }
  }

  return (
    <ScrollView
      style={styles.stylForScreen}
      contentContainerStyle={styles.stylForContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.stylForTitle}>
        Hello, {nameOfUser}
      </Text>

      <Text style={styles.stylForUserScore}>
        {/* the realtime score here is the reflection of the points 
        that has been earned in lessons, quizzes and bag items */}
        Preparedness Score: {scoreOfUserPreparedness}
      </Text>

      {/* the parent stack screen and the tab is specified by the 
      nested destinations. so it is placed in the order of the 
      emergency checklist, learning module map, the unit quiz, the 
      emergency hub, reporting feature, the leaderboard, the profile
       and finally a button to allow users to log out 
       from their account */}
      <TouchableOpacity
        style={styles.stylForBtn}
        onPress={() =>
          navigationPathway.navigate("MainTabs", {
            screen: "Checklist",
          })
        }
      >
        <Text style={styles.stylForBtnTxt}>
          Emergency Checklist
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.stylForBtn}
        onPress={() =>
          navigationPathway.navigate("MainTabs", {
            screen: "LearningMap",
          })
        }
      >
        <Text style={styles.stylForBtnTxt}>
          Learning Module
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.stylForBtn}
        onPress={() => navigationPathway.navigate("Quiz")}
      >
        <Text style={styles.stylForBtnTxt}>
          Flash Flood Quiz
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.stylForBtn}
        onPress={() =>
          navigationPathway.navigate("MainTabs", {
            screen: "EmergencyHub",
          })
        }
      >
        <Text style={styles.stylForBtnTxt}>
          Emergency Hub
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.stylForBtn, styles.stylForReportBtn]}
        onPress={() => navigationPathway.navigate("Report")}
      >
        <Text style={styles.stylForBtnTxt}>
          📍 Report an Incident
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.stylForBtn}
        onPress={() =>
          navigationPathway.navigate("MainTabs", {
            screen: "Leaderboard",
          })
        }
      >
        <Text style={styles.stylForBtnTxt}>
          Leaderboard
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.stylForBtn}
        onPress={() => navigationPathway.navigate("Profile")}
      >
        <Text style={styles.stylForBtnTxt}>
          Profile
        </Text>
      </TouchableOpacity>

      {/* App.js observes sign-out and replaces this flow with Login/SignUp. */}
      <TouchableOpacity onPress={() => signOut(auth)}>
        <Text style={styles.stylToLogOut}>
          Logout
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// these are the references made:
// https://firebase.google.com/docs/firestore/query-data/order-limit-data
// https://firebase.google.com/docs/firestore/query-data/listen
// https://reactnative.dev/docs/flatlist

import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { COLOURS } from "../constants/colours";
import { styles } from "../styles/LeaderboardScreenStyl";

import {
  LIMIT_FOR_LEADERBOARD,
  ModalForAchievements,
  RowForLeaderboard,
  UserOnPodium,
  displayNameGetting,
} from "../components/LeaderboardComponents";

export default function LeaderboardScreen() {

  // the fully normalised and ranked results are held by the users. 
  // then the selection is kept separate as the ranking list should 
  // not altered by the opening of the achievement medal

  const [users, setUsers] = useState([]);
  const [userWhoIsSelected, setUserWhoIsSelected] =
    useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // here the realtime query is limited so that 
    // the public ranking remains bounded
    const queryForLeaderboard = query(
      // here, to be able to fetch the leaders, the 
      // preparednessScore is sorted in the descending 
      // order at the database. and then the local
      //  name tie break makes the equal scores deterministic
      collection(db, "users"),
      orderBy("preparednessScore", "desc"),
      limit(LIMIT_FOR_LEADERBOARD)
    );

    const unsubscribe = onSnapshot(
      queryForLeaderboard,
      (snapShot) => {
        const usersInLeaderboard = [];

        // here, the non-numeric values that are returned 
        // will be normalised
        for (const docOfUser of snapShot.docs) {
          const data = docOfUser.data();
          let score = Number(data.preparednessScore);

          if (isNaN(score)) {
            score = 0;
          }

          usersInLeaderboard.push({
            // this doc ID from firestore is the auth UID that 
            // used to recognise the author of the current 
            // account as "You"
            id: docOfUser.id,
            ...data,
            preparednessScore: score,
          });
        }

        // here, the firestore orders it by the score and then 
        // the name will provide as means to differentiate between 
        // ordering if the scores are equal for the UI
        usersInLeaderboard.sort(
          (userAtFirst, userAtSecond) => {
            if (
              userAtSecond.preparednessScore !==
              userAtFirst.preparednessScore
            ) {
              // here, the scores are ranked by putting 
              // the score with higher numeric value first
              return (
                userAtSecond.preparednessScore -
                userAtFirst.preparednessScore
              );
            }

            const nameFirst =
              displayNameGetting(userAtFirst);
            const nameSecond =
              displayNameGetting(userAtSecond);

            // then if there are equal scores, 
            // then it is ordered in the alphabetical order
            return nameFirst.localeCompare(nameSecond);
          }
        );

        // here the arrays that starts w position 0 is 
        // converted into the one based displayed ranks
        for (
          let index = 0;
          index < usersInLeaderboard.length;
          index++
        ) {
          usersInLeaderboard[index].rank = index + 1;
        }

        setUsers(usersInLeaderboard);
        // the empty array here is treated as a 
        // successful result and not as an error
        setError("");
        setLoading(false);
      },
      (errorInSnapShot) => {
        // here, the firestore rule, index or the connections 
        // problems are logged and then it is converted into 
        // a stable msg that is suitable for the screen
        console.error(
          "Unable to load leaderboard:",
          errorInSnapShot
        );

        setError(
          "The leaderboard could not be loaded. Please try again."
        );
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  // here, the result of the signed in user 
  // for the standing card is located here
  let curser = null;

  if (auth.currentUser) {
    for (const user of users) {
      if (user.id === auth.currentUser.uid) {
        // since every acc only has one list record, 
        // it will stop at the matching UID here
        curser = user;
        break;
      }
    }
  }

  // the full screen state will be shown until 
  // the initial realtime snapshot arrives
  if (loading) {
    return (
      <SafeAreaView
        style={styles.stylForContainerLoading}
      >
        <ActivityIndicator
          color={COLOURS.primary}
          size="large"
        />

        <Text style={styles.stylForTxtLoading}>
          Preparing the rankings...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        // the frist 3 records here belong 
        // to the podium and not the row list
        contentContainerStyle={styles.stylForContentList}
        data={users.slice(3)}
        // if the changes in the scores cause the rows 
        // to be reordered, the keys that are backed
        //  by the UID will remain stable here
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.stylForHeader}>
              <Text style={styles.stylForEyeBrow}>
                COMMUNITY RANKING
              </Text>

              <Text style={styles.stylForTitle}>
                Preparedness League
              </Text>

              <Text style={styles.stylForSubTitle}>
                See who is leading the community.
              </Text>
            </View>

            {error ? (
              <Text style={styles.stylForErrTxt}>
                {error}
              </Text>
            ) : null}

            {/* here, if there are fewwer than 3 users, then the undefined 
            users will be safely accepted by the podium slots*/}
            {users.length > 0 ? (
              <>
                <View style={styles.stylForPodium}>
                  <UserOnPodium
                    // here, the column for the second place 
                    // is rendered to be at the left of the 
                    // first place
                    user={users[1]}
                    rank={2}
                    onPressAchievements={
                      setUserWhoIsSelected
                    }
                  />

                  <UserOnPodium
                    // then, the first place position will occupy the 
                    // center place of the podium and would be
                    //  made taller too
                    user={users[0]}
                    rank={1}
                    onPressAchievements={
                      setUserWhoIsSelected
                    }
                  />

                  <UserOnPodium
                  // here, the column for the third place 
                    // is rendered to be at the right of the 
                    // first place
                    user={users[2]}
                    rank={3}
                    onPressAchievements={
                      setUserWhoIsSelected
                    }
                  />
                </View>

                {curser ? (
                  // the summary here keep the result of 
                  // the current user to be visible above the list
                  <View
                    style={styles.stylForCurrUserStanding}
                  >
                    <Text
                      style={
                        styles.stylForCurrUserStandingLbl
                      }
                    >
                      YOUR STANDING
                    </Text>

                    <Text
                      style={
                        styles.stylForCurrUserStandingRank
                      }
                    >
                      #{curser.rank}
                    </Text>

                    <Text
                      style={
                        styles.stylForCurrUserStandingPoints
                      }
                    >
                      {curser.preparednessScore.toLocaleString()}{" "}
                      pts
                    </Text>
                  </View>
                ) : null}

                {users.length > 3 ? (
                  <Text style={styles.stylForListTitle}>
                    All rankings
                  </Text>
                ) : null}
              </>
            ) : null}
          </>
        }
        ListEmptyComponent={
          users.length === 0 ? (
            <View style={styles.stylForContainerEmp}>
              <Text style={styles.stylForIconEmp}>
                🏁
              </Text>

              <Text style={styles.stylForTitleEmp}>
                No rankings yet
              </Text>

              <Text style={styles.stylForTxtEmp}>
                Rankings will appear after users earn
                preparedness points.
              </Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          // then here, the rows that are after the 
          // podium will reuse the same current-user
          //  and achievemnt logic
          <RowForLeaderboard
            user={item}
            onPressAchievements={setUserWhoIsSelected}
          />
        )}
      />

      {/* the null selected user here closes the medal*/}
      <ModalForAchievements
        user={userWhoIsSelected}
        onClose={() => setUserWhoIsSelected(null)}
      />
    </SafeAreaView>
  );
}

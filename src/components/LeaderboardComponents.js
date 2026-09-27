// these are the references made:
// https://reactnative.dev/docs/flatlist
// https://reactnative.dev/docs/modal

import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { auth } from "../services/firebase";
import { styles } from "../styles/LeaderboardScreenStyl";

// here, the query is bounded and the top 3 is 
// given its special placing in for the ui
const LIMIT_FOR_LEADERBOARD = 50;

const MEDALS_FOR_LEADERBOARD = {
  1: { icon: "🥇", colour: "#F4B942" },
  2: { icon: "🥈", colour: "#AAB4C3" },
  3: { icon: "🥉", colour: "#C9855B" },
};

function displayNameGetting(user) {
  // the profile fields that 
  // is used by the current 
  // and earlier data models 
  // is supported here
  if (user.displayName) {
    // here, the modern profile
    //  field is preferred
    return user.displayName;
  }

  if (user.name) {
    // the current sign up 
    // profiles in this 
    // project save their 
    // name here
    return user.name;
  }

  if (user.username) {
    // this username will maintain 
    // its compability with the 
    // older stored profiles if 
    // there are any
    return user.username;
  }

  return "Prepared citizen";
}

function initialGetting(user) {
  // if the chosen display name is blank, then the avatar 
  // will fall back safely
  const nameToDisplay = displayNameGetting(user).trim();

  if (nameToDisplay.length === 0) {
    return "?";
  }

  return nameToDisplay.charAt(0).toUpperCase();
}

function achievementsGetting(user) {
  // here, both the current badges and the older achievements 
  // field will be accepted here
  const achievements = user.achievements || user.badges || [];

  if (!Array.isArray(achievements)) {
    // if there are any malformed values, then it 
    // will appear as no achivements rather than 
    // break the Flatlist
    return [];
  }

  const listOfAchievement = [];

  // here, the stirngs and richer objects will be converted into 
  // one object shape that can be rendered
  for (let index = 0; index < achievements.length; index++) {
    const achievement = achievements[index];

    if (typeof achievement === "string") {
      // the missing ui fields will be supplied with the 
      // checklist badges that are stored as strings
      listOfAchievement.push({
        id: `${achievement}-${index}`,
        icon: "🏅",
        title: achievement,
        description: "Preparedness achievement earned",
      });
    } else {
      // as the achievement objects may use other alternative property 
      // names, each of these will be resolved into the single id, icon, 
      // title, description shape that expected by the medal
      const savedTitle = achievement.title || achievement.name;
      const title = savedTitle || "Achievement";
      const id = achievement.id || `${savedTitle}-${index}`;
      const icon = achievement.icon || achievement.emoji || "🏅";
      const description =
        achievement.description || "Preparedness achievement earned";

      listOfAchievement.push({
        id: id,
        icon: icon,
        title: title,
        description: description,
      });
    }
  }

  return listOfAchievement;
}

function signedInUserChecking(user) {
  // this is control 'You' label and the highlighted row styles
  if (!auth.currentUser) {
    return false;
  }

  return user.id === auth.currentUser.uid;
}

function BtnForAchievement({ user, onPress }) {
  // the same compact achievement control will be 
  // reused for the podium and the list rows
  const count = achievementsGetting(user).length;

  return (
    <TouchableOpacity
      // this label will include the name of the user and not just the medal icon
      accessibilityLabel={`View ${displayNameGetting(user)}'s achievements`}
      accessibilityRole="button"
      activeOpacity={0.7}
      onPress={() => onPress(user)}
      style={styles.stylForBtnAchievement}
    >
      <Text style={styles.stylForBtnIconAchievement}>🏅</Text>
      <Text style={styles.stylForBtnCountAchievement}>
        {count}
      </Text>
    </TouchableOpacity>
  );
}

function UserOnPodium({
  user,
  rank,
  onPressAchievements,
}) {
  // when there are missing users, the empty placeholders 
  // will preserve the 3 column of the podium
  if (!user) {
    return <View style={styles.stylForSlotInPodium} />;
  }

  // the colour of the medal and whether the styling 
  // for the 1st place which is the larger center style 
  // will be determined by the rank
  const medalForUser = MEDALS_FOR_LEADERBOARD[rank];
  const firstChecking = rank === 1;
  const currUserChecking = signedInUserChecking(user);

  return (
    <View
      style={[
        styles.stylForSlotInPodium,
        firstChecking
          ? styles.stylForSlotInPodiumFirst
          : null,
      ]}
    >
      <Text style={styles.stylForPodiumMedal}>
        {medalForUser.icon}
      </Text>

      <View
        style={[
          styles.stylForPodiumAvatar,
          firstChecking
            ? styles.stylForPodiumAvatarFirst
            : null,
          { borderColor: medalForUser.colour },
        ]}
      >
        <Text
          style={[
            styles.stylForPodiumInitial,
            firstChecking
              ? styles.stylForFirstPodiumInitial
              : null,
          ]}
        >
          {initialGetting(user)}
        </Text>
      </View>

      <View style={styles.stylForNameOfPodiumRow}>
        <Text
          numberOfLines={1}
          style={styles.stylForNameInPodium}
        >
          {displayNameGetting(user)}
          {currUserChecking ? " (You)" : ""}
        </Text>

        <BtnForAchievement
          user={user}
          onPress={onPressAchievements}
        />
      </View>

      <Text style={styles.stylForPointsInPodium}>
        {user.preparednessScore.toLocaleString()} pts
      </Text>

      <View
        style={[
          styles.stylForBaseInPodium,
          firstChecking
            ? styles.stylForBaseInPodiumFirst
            : styles.stylForBaseInPodiumSide,
        { backgroundColor: medalForUser.colour },
      ]}
      >
        {/* the base colour of the podium and the number 
        for it is derived from the same rank */}
        <Text style={styles.stylForRankInPodium}>
          {rank}
        </Text>
      </View>
    </View>
  );
}

function RowForLeaderboard({
  user,
  onPressAchievements,
}) {
  // here, the row of the current user will be highlighted 
  // without the ranking data being changed
  const currUserChecking = signedInUserChecking(user);

  return (
    <View
      style={[
        styles.stylForRow,
        currUserChecking
          ? styles.stylForCurrUserRow
          : null,
      ]}
    >
      <View style={styles.stylForContainerRank}>
        {/* the ranking here will be assigned after 
        the tie break in the LeaderboardScreen */}
        <Text
          style={[
            styles.stylForRank,
            currUserChecking
              ? styles.stylForCurrUserTxt
              : null,
          ]}
        >
          {user.rank}
        </Text>
      </View>

      <View
        style={[
          styles.stylForAvatar,
          currUserChecking
            ? styles.stylForCurrUserAvatar
            : null,
        ]}
      >
        {/* the text initials will give the avatars a 
        consistent look without the external image 
        storage */}
        <Text style={styles.stylForInitialInAvatar}>
          {initialGetting(user)}
        </Text>
      </View>

      <View style={styles.stylForInfoOfUser}>
        <View style={styles.stylForNameOfRow}>
          <Text
            numberOfLines={1}
            style={[
              styles.stylForNameOfUser,
              currUserChecking
                ? styles.stylForCurrUserTxt
                : null,
            ]}
          >
            {displayNameGetting(user)}
            {currUserChecking ? " (You)" : ""}
          </Text>

          <BtnForAchievement
            user={user}
            onPress={onPressAchievements}
          />
        </View>

        <Text style={styles.stylForPointsLbl}>
          Preparedness points
        </Text>
      </View>

      <Text
        style={[
          styles.stylForPoints,
          currUserChecking
            ? styles.stylForCurrUserTxt
            : null,
        ]}
      >
        {user.preparednessScore.toLocaleString()}
      </Text>
    </View>
  );
}

function ModalForAchievements({ user, onClose }) {
  // the empty collection will be produced by 
  // the null user and their medal will
  //  also be hidden
  const achievements = user
    ? achievementsGetting(user)
    : [];

  return (
    <Modal
      // this boolean conversion means that any 
      // selected user opens, then the null will 
      // close it
      animationType="slide"
      onRequestClose={onClose}
      transparent
      visible={Boolean(user)}
    >
      {/* when the outer backdrop is pressed, it will close the medal */}
      <Pressable
        onPress={onClose}
        style={styles.stylForBackdropModal}
      >
        {/* the inner pressable will absorb the taps that 
        is inside the medal sheet */}
        <Pressable
          onPress={() => {}}
          style={styles.stylForContainerModal}
        >
          <View style={styles.stylForHandleModal} />

          <View style={styles.stylForHeaderOfModal}>
            <View style={styles.stylForHeaderTxtOfModal}>
              <Text style={styles.stylForEyeBrowOfModal}>
                ACHIEVEMENTS
              </Text>

              <Text
                numberOfLines={1}
                style={styles.stylForTitleOfModal}
              >
                {user ? displayNameGetting(user) : ""}
              </Text>
            </View>

            <TouchableOpacity
              accessibilityLabel="Close achievements"
              accessibilityRole="button"
              onPress={onClose}
              style={styles.stylForCloseBtn}
            >
              <Text style={styles.stylForCloseBtnTxt}>
                ×
              </Text>
            </TouchableOpacity>
          </View>

          {/* here, the virtualisaed list or the empty 
          state is rendered accordingly */}
          {achievements.length > 0 ? (
            <FlatList
              // the normalised ids here work as stable keys 
              // for both the strings and objects
              contentContainerStyle={styles.stylForListAch}
              data={achievements}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.stylForCardAch}>
                  <View
                    style={
                      styles.stylForIconContainerAch
                    }
                  >
                    <Text style={styles.stylForIconAch}>
                      {item.icon}
                    </Text>
                  </View>

                  <View style={styles.stylForInfoAch}>
                    <Text style={styles.stylForTitleAch}>
                      {item.title}
                    </Text>

                    <Text
                      style={styles.stylForDescripAch}
                    >
                      {item.description}
                    </Text>
                  </View>
                </View>
              )}
            />
          ) : (
            // some user may not have any badges yet
            <View style={styles.stylForNoAch}>
              <Text style={styles.stylForIconNoAch}>
                🎯
              </Text>

              <Text style={styles.stylForTitleNoAch}>
                No achievements yet
              </Text>

              <Text style={styles.stylForTxtNoAch}>
                Complete preparedness activities to earn
                achievements.
              </Text>
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export {
  LIMIT_FOR_LEADERBOARD,
  ModalForAchievements,
  RowForLeaderboard,
  UserOnPodium,
  displayNameGetting,
};

import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "../styles/LearningMapScreenStyl";

export default function NodeOfLearning({
  title,
  icon,
  pos,
  completed,
  unlocked,
  onPress,
  typeOfNode = "lesson",
}) {
  // here, it will begin with the locked styles and 
  // then it will be overriden accordingly below
  const lockedCheck = !unlocked;

  // the lockedCheck is passed to the native dsiabled 
  // prop here while the unlocked is used below to 
  // select the correct appearance
  let stylForShadowOfNode =
    styles.stylForShadowNodeLocked;

  let stylForBtnNode =
    styles.stylForNodeLocked;

  let showingIcon = "🔒";
  // the centre will be default path position 
  // unless the map requests for left or right
  let stylOfPos = styles.stylForCentrePos;

  // these position variants will make the 
  // path alternate across the learning map
  if (pos === "left") {
    stylOfPos = styles.stylForLeftPos;
  } else if (pos === "right") {
    stylOfPos = styles.stylForRightPos;
  }

  // these nodes for the completed, quiz and current 
  // lesson allr have its distinct appearance
  if (unlocked) {
    showingIcon = icon;

    // the unlocked node will initially show its lesson 
    // or the quiz icon. then for the completion has 
    // the highest priority and it will be replaced 
    // with the icon that has the onfirmation tick
    if (completed) {
      stylForShadowOfNode =
        styles.stylForShadowOfDoneNode;

      stylForBtnNode =
        styles.stylForDoneNode;

      showingIcon = "✓";
    } else if (typeOfNode === "quiz") {
      // the quiz makes use of its own special 
      // state so that it does not look like 
      // the other lesson nodes
      stylForShadowOfNode =
        styles.stylForShadowOfQuizNode;

      stylForBtnNode =
        styles.stylForQuizNode;
    } else {
      // here, when there is an available lesson 
      // that is incomplete, it will be treated 
      // as the current next step
      stylForShadowOfNode =
        styles.stylForShadowOfCrntNode;

      stylForBtnNode =
        styles.stylForCrntNode;
    }
  }

  return (
    <View style={[styles.stylForRowOfNode, stylOfPos]}>
      <View style={styles.stylForContentOfNode}>
        {/* the disabled state here makes the locked nodes non-interactive */}
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={lockedCheck}
          onPress={onPress}
          style={[
            styles.stylForShadowOfNode,
            stylForShadowOfNode,
          ]}
        >
          <View
            style={[
              styles.stylForNodeBtn,
              stylForBtnNode,
            ]}
          >
            <Text style={styles.stylForIconNode}>
              {showingIcon}
            </Text>
          </View>
        </TouchableOpacity>

        <Text
          style={[
            styles.stylForTitleNode,
            lockedCheck
              ? styles.stylForTitleNodeLocked
              : null,
          ]}
        >
          {/* the locked titles are muted but it will 
          remain visible to show the future progression */}
          {title}
        </Text>
      </View>
    </View>
  );
}

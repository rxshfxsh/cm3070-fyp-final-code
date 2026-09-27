// these are the references made: 
// https://firebase.google.com/docs/firestore/query-data/listen
// https://firebase.google.com/docs/firestore/manage-data/transactions

import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { auth } from "../services/firebase";
import {
  customChckLstAdding,
  ItemAlrExstChckLst,
  customChckLstDeleting,
  subToChckLst,
  chckLstItmToggling,
} from "../services/checklistService";
import {
  NAME_BADGE_CHECKLIST,
  ITEMS_IN_CHECKLIST_DEFAULT,
  CHECKLIST_LENGTH_MAX,
  EACH_ITEM_PTS_CHECKLIST,
} from "../data/checklistData";
import { COLOURS } from "../constants/colours";
import { styles } from "../styles/ChecklistScreenStyl";

export default function ChecklistScreen() {
  // the progress of the checklist is stored as a 
  // map of item keys to booleans and for the custom 
  // items, it is stored separately as objects with 
  // unique keys and labels. then for the add and delete 
  // flags, only its related controls will be disabled while 
  // the writes are pending
  const [progressOfChckLst, setProgressOfChckLst] = useState({});
  const [chckLstItmsCustom, setChckLstItmsCustom] = useState([]);
  const [nameOfNewItem, setNameOfNewItem] = useState("");
  const [toItemAdding, setToItemAdding] = useState(false);
  const [deletionOfItem, setDeletionOfItem] = useState(null);
  
  const chckLstItemsAll = [
    ...ITEMS_IN_CHECKLIST_DEFAULT,
    ...chckLstItmsCustom,
  ];

  useEffect(() => {
    // the normalised checklist valus are read 
    // from the user doc by this service
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return;
    }

    const unsubscribe = subToChckLst(
      currentUser.uid,
      (chckLstSaved) => {
        // this will update both parts tgt so that 
        // //the row definitions and its completion 
        // //state rep the same firestore version
        setProgressOfChckLst(chckLstSaved.checklistProgress);
        setChckLstItmsCustom(chckLstSaved.customChecklistItems);
      },
      (error) => {
        Alert.alert("Unable to load checklist", error.message);
      }
    );

    return unsubscribe;
  }, []);

  // this function is used to handle the items that are added 
  // into the checklist by cleaning and validating the input 
  // of the user before trying to make a transaction
  async function itemAddHandling() {
    const currentUser = auth.currentUser;

    // the accidental spaces are removed here
    const nameOfItemRemoved = nameOfNewItem.trim();

    if (!currentUser) {
      Alert.alert(
        "Sign-in required",
        "You must be signed in to add an item."
      );
      return;
    }

    // here, if nothing is entered and after trimming is
    //  done, it will result in an empty field so it 
    // will be rejected
    if (nameOfItemRemoved === "") {
      Alert.alert(
        "Missing item",
        "Enter the name of an item first."
      );
      return;
    }
    // this is done so that the operation is protected 
    // if the handler is called in another way
    if (nameOfItemRemoved.length > CHECKLIST_LENGTH_MAX) {
      Alert.alert(
        "Item too long",
        `Please use ${CHECKLIST_LENGTH_MAX} characters or fewer.`
      );
      return;
    }

    // here, to prevent the service call, this local
    //  duplication check is conducted. then the 
    // service will perform a second check inside 
    // its transaction
    const duplicateItem = ItemAlrExstChckLst(
      chckLstItemsAll,
      nameOfItemRemoved
    );

    if (duplicateItem) {
      Alert.alert(
        "Item already exists",
        "This item is already in your checklist."
      );
      return;
    }

    setToItemAdding(true);

    try {
      await customChckLstAdding(
        currentUser.uid,
        nameOfItemRemoved
      );

      setNameOfNewItem("");
      // here, the listener will add the saved row and 
      // hence the input only needs clearing locally
    } catch (error) {
      Alert.alert("Unable to add item", error.message);
    } finally {
      // the input and btn gets restored here
      //  aftet the success or error
      setToItemAdding(false);
    }
  }

  // this function is the screen handler that is used to update 
  // both the completion and score as on one atomic operation
  async function itemToggleHandling(keyOfItem) {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      Alert.alert(
        "Sign-in required",
        "You must be signed in to update the checklist."
      );
      return;
    }

    try {
      const rsltOfTransaction = await chckLstItmToggling(
        currentUser.uid,
        keyOfItem
      );

      if (rsltOfTransaction.hasJustEarnedBadge) {
        // here the new badge gets its own respective message
        //  based on its name and then it is returned to alr
        //  completed checklist state
        Alert.alert(
          "Badge earned!",
          `You earned the ${NAME_BADGE_CHECKLIST} badge.`
        );
      } else if (rsltOfTransaction.hasCompletedAllItems) {
        Alert.alert(
          "Checklist completed!",
          `You have completed every item. The ${NAME_BADGE_CHECKLIST} badge was already earned previously.`
        );
      }
    } catch (error) {
      Alert.alert("Unable to update item", error.message);
    }
  }
  
  // this function is used to track the item that is being 
  // deleted so that the other row still remain interactive
  async function itemDeletion(item) {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      Alert.alert(
        "Sign-in required",
        "You must be signed in to delete an item."
      );
      return;
    }

    setDeletionOfItem(item.key);
    // the pending key is saved here so that it lets 
    // the row show its deletion indicator

    try {
      await customChckLstDeleting(
        currentUser.uid,
        item.key
      );
    } catch (error) {
      Alert.alert("Unable to delete item", error.message);
    } finally {
      // in the case that firestore rejects the deletion, 
      // the row lock will still be cleared here
      setDeletionOfItem(null);
    }
  }

  // this function is used to confirm with the users if they 
  // are certain of deleting the item on the list before 
  // deleting it as it is destructive
  function itemDeletionHandling(item) {
    Alert.alert(
      "Delete custom item?",
      `Remove “${item.label}” from your checklist?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => itemDeletion(item),
        },
      ]
    );
  }

  // after deleting the item, the display count is recalculated
  //  here from the latest definitions and progress map
  const noOfCompletedItems = chckLstItemsAll.filter((item) => {
    return progressOfChckLst[item.key] === true;
  }).length;

  const addBtnDisabledCheck =
    toItemAdding || nameOfNewItem.trim() === "";

  // the add button is made unavilable during saving or 
  // when there is no proper input by the user so that 
  // the unnecessary validation alerts is prevented 
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <ScrollView
        contentContainerStyle={styles.stylForContentContainer}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets
      >
        <Text style={styles.stylForTitle}>
          Emergency Checklist
        </Text>

        <Text style={styles.stylForSubTitle}>
          Prepare these essential items before a flash flood emergency.
        </Text>

        <Text style={styles.stylForProgress}>
          {/* the count here is derived from the live progress and it is not stored separately*/}
          Completed: {noOfCompletedItems}/{chckLstItemsAll.length}
        </Text>

        {/* here, the default and custom rows of the checklist 
        is rendered and only the custom items will get the 
        deletion button on its row*/}
        {chckLstItemsAll.map((item) => {
          const completedCheck =
            progressOfChckLst[item.key] === true;
          
            // cstmItemCheck here controls where the delete 
            // button is availble for the custom items
          const cstmItemCheck = chckLstItmsCustom.some(
            (cstmItem) => {
              return cstmItem.key === item.key;
            }
          );

          return (
            <View
              key={item.key}
              style={[
                styles.item,
                completedCheck
                  ? styles.stylForCompletedItem
                  : null,
              ]}
            >
              <TouchableOpacity
                // the label here behaves as the checkbox area
                onPress={() => itemToggleHandling(item.key)}
                style={styles.stylForToggleItem}
                accessibilityRole="checkbox"
                accessibilityState={{
                  checked: completedCheck,
                }}
              >
                <Text style={styles.stylForTextOfItem}>
                  {completedCheck ? "✅" : "⬜"} {item.label}
                </Text>
              </TouchableOpacity>

              {cstmItemCheck ? (
                <TouchableOpacity
                  onPress={() => itemDeletionHandling(item)}
                  disabled={deletionOfItem === item.key}
                  style={styles.stylForDeleteBtn}
                  accessibilityRole="button"
                  accessibilityLabel={`Delete ${item.label}`}
                >
                  <Text style={styles.stylForDeleteBtnTxt}>
                    {deletionOfItem === item.key
                      ? "..."
                      : "Delete"}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          );
        })}

        {/* the preparedness items here of the user based on 
        their input is added into the firestore*/}
        <Text style={styles.stylForAddTitle}>
          Add another item
        </Text>

        <View style={styles.stylForItmContainerAdding}>
          <TextInput
            value={nameOfNewItem}
            onChangeText={setNameOfNewItem}
            onSubmitEditing={itemAddHandling}
            placeholder="e.g. Waterproof documents"
            placeholderTextColor={COLOURS.textLight}
            style={styles.stylForInput}
            maxLength={CHECKLIST_LENGTH_MAX}
            returnKeyType="done"
            editable={!toItemAdding}
          />

          <TouchableOpacity
            onPress={itemAddHandling}
            disabled={addBtnDisabledCheck}
            style={[
              styles.stylForAddBtn,
              addBtnDisabledCheck
                ? styles.stylForDisabledAddBtn
                : null,
            ]}
          >
            <Text style={styles.stylForAddBtnTxt}>
              {toItemAdding ? "Adding..." : "Add"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.stylForNote}>
          Each completed item adds {EACH_ITEM_PTS_CHECKLIST} points to
          your Preparedness Score. Unchecking an item removes those
          points. Completing all items awards a badge.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

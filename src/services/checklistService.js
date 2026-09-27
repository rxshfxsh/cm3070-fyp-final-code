// these are the references made: 
// https://firebase.google.com/docs/firestore/query-data/listen
// https://firebase.google.com/docs/firestore/manage-data/transactions
// https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array

import {
  arrayUnion,
  deleteField,
  doc,
  increment,
  onSnapshot,
  runTransaction,
} from "firebase/firestore";

import { db } from "./firebase";
import {
  NAME_BADGE_CHECKLIST,
  ITEMS_IN_CHECKLIST_DEFAULT,
  EACH_ITEM_PTS_CHECKLIST,
} from "../data/checklistData";

function getChckLstItmsCustom(dataOfUser) {
  if (Array.isArray(dataOfUser.customChecklistItems)) {
  
    // the stored array gets returned here so that the 
    // key and label of the custom item gets preserved
    return dataOfUser.customChecklistItems;
  }

  return [];
}

function getProgressForSvdChckLst(dataOfUser) {
  // this will only accept non-array progress map and 
  // the individual values are not validated here
  const progressSavedByUser = dataOfUser.checklistProgress;

  if (
    progressSavedByUser &&
    typeof progressSavedByUser === "object" &&
    !Array.isArray(progressSavedByUser)
  ) {
    // this progress has the keys of the items as properties
    //  and its booleans as the values
    return progressSavedByUser;
  }

  return {};
}

export function ItemAlrExstChckLst(itemsInCheckLst, nameOfItem) {
  // when a user accidentally types with excess spacing or with all caps, 
  // the trim will remove the excess whitespace and it will be made into lower-case
  const nameOfItemNormalised = nameOfItem.trim().toLowerCase();

  return itemsInCheckLst.some((item) => {
    if (typeof item.label !== "string") {
      // here, the label of the saved item is checked here
      return false;
    }

    const nameOfItemSaved = item.label.trim().toLowerCase();
    return nameOfItemSaved === nameOfItemNormalised;
  });
}

export function subToChckLst(
  userId,
  chckLstChangeHandling,
  errHandling
) {
  // here, the document of the user is subscribed into so that the changes 
  // appear without having to manually refresh
  const docRefUser = doc(db, "users", userId);

  const unsubscribe = onSnapshot(
    docRefUser,
    (snapShtUser) => {
      if (!snapShtUser.exists()) {
        // in the case that there is a missing profile, the progress of the 
        // checklist has no place to be stored. hence, it should not just 
        // appear in an empty checklist
        errHandling(new Error("Your user profile could not be found."));
        return;
      }

      const dataOfUser = snapShtUser.data();

      const chckLstSaved = {
        // the fields here are normalised first before being 
        // displayed on the screen
        checklistProgress: getProgressForSvdChckLst(dataOfUser),
        customChecklistItems: getChckLstItmsCustom(dataOfUser),
      };

      chckLstChangeHandling(chckLstSaved);
    },
    errHandling
  );
  return unsubscribe;
}

// this function is used for the adding of the custom 
// items in the checklist
export async function customChckLstAdding(userId, nameOfItem) {
  const docRefUser = doc(db, "users", userId);

  // the item key is generated here by taking the time 
  // plus the random suffix
  const chckLstItemNew = {
    key: `custom_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    label: nameOfItem,
  };

  // in case that the data is changed remotely, the duplication 
  // inside the transaction is rechecked here
  await runTransaction(db, async (transaction) => {
    const snapShtUser = await transaction.get(docRefUser);

    if (!snapShtUser.exists()) {
      throw new Error("Your user profile could not be found.");
    }

    const dataOfUser = snapShtUser.data();
    // here, the default items are included when the names are 
    // being checked even though only the custom itmes are 
    // stored physically in this part of the user doc
    const customItmsSaved = getChckLstItmsCustom(dataOfUser);
    const chckLstItemsAll = [
      ...ITEMS_IN_CHECKLIST_DEFAULT,
      ...customItmsSaved,
    ];

    const itemDuplicate = ItemAlrExstChckLst(
      chckLstItemsAll,
      nameOfItem
    );

    if (itemDuplicate) {
      // by throwing, it cancels the transaction and the 
      // screen will convert this into an alert
      throw new Error("This item is already in your checklist.");
    }

    transaction.update(docRefUser, {
      // here, the arrayUnion will append the new object
      //  without replacing the exising custom items
      customChecklistItems: arrayUnion(chckLstItemNew),
    });
  });
}

// this function is used for the deleting of the 
// custom items in the checklist
export async function customChckLstDeleting(userId, keyOfItem) {
  const docRefUser = doc(db, "users", userId);

  await runTransaction(db, async (transaction) => {
    const snapShtUser = await transaction.get(docRefUser);

    // if the profile of the user could not be 
    // found, it will throw this error
    if (!snapShtUser.exists()) {
      throw new Error("Your user profile could not be found.");
    }

    const dataOfUser = snapShtUser.data();
    const customItmsSaved = getChckLstItmsCustom(dataOfUser);

    const alrExistItm = customItmsSaved.some((item) => {
      return item.key === keyOfItem;
    });

    if (!alrExistItm) {
      // here, the default items will not be deleted 
      // and the outdated custom key is rejected
      throw new Error("This custom checklist item could not be found.");
    }

    const progressSavedByUser = getProgressForSvdChckLst(dataOfUser);
    const customItmsUpdated = customItmsSaved.filter((item) => {
      // here, every custom item is kept except the 
      // one that is selected for deletion
      return item.key !== keyOfItem;
    });

    // here the custom definition and its nested progress field is removed
    const updatesOfuser = {
      customChecklistItems: customItmsUpdated,
      [`checklistProgress.${keyOfItem}`]: deleteField(),
      // the dot notation only removes the nested 
      // progress entry and not the whole map
    };

    // when the deleted items were once completed as part of 
    // the checklist, then the points that it had contributed
    //  will also be removed
    if (progressSavedByUser[keyOfItem]) {
      updatesOfuser.preparednessScore = increment(
        -EACH_ITEM_PTS_CHECKLIST
      );
    }

    transaction.update(docRefUser, updatesOfuser);
  });
}

// this function is used for toggling of the items in the checklist
export async function chckLstItmToggling(userId, keyOfItem) {
  const docRefUser = doc(db, "users", userId);

  const rsltOfTransaction = await runTransaction(
    db,
    async (transaction) => {
      const snapShtUser = await transaction.get(docRefUser);

      if (!snapShtUser.exists()) {
        throw new Error("Your user profile could not be found.");
      }

      const dataOfUser = snapShtUser.data();
      const progressSavedByUser = getProgressForSvdChckLst(dataOfUser);
      const customItmsSaved = getChckLstItmsCustom(dataOfUser);
      const chckLstItemsAll = [
        // here, it is getting validated against the item definitions 
        // that is fixed and also those that has been created by the user
        ...ITEMS_IN_CHECKLIST_DEFAULT,
        ...customItmsSaved,
      ];

      const alrExistItm = chckLstItemsAll.some((item) => {
        return item.key === keyOfItem;
      });

      if (!alrExistItm) {
        // if there any unknown keys, these are refused so 
        // that the arbitarary changes in the score are not generated
        throw new Error("This checklist item could not be found.");
      }

      // here the saved boolean is getting toggled and then
      //  the complete updated list gets evaluated
      const completionCheck = !progressSavedByUser[keyOfItem];
      const progressChckLstUpdated = {
        ...progressSavedByUser,
        [keyOfItem]: completionCheck,
      };

      const ItemsCompletedAll = chckLstItemsAll.every((item) => {
        // here, every() will only be true when the 
        // updated map marks all the current items as true
        return progressChckLstUpdated[item.key] === true;
      });

      const badgesSavedByUser = Array.isArray(dataOfUser.badges)
        ? dataOfUser.badges
        : [];

      // the badge will only be awarded here if 
      // every item is complete and it is not saved yet
      const recentBadgeUser =
        ItemsCompletedAll &&
        !badgesSavedByUser.includes(NAME_BADGE_CHECKLIST);

      // here, by checking the item in the checklist, it will 
      // add points and when the user chooses to uncheck the 
      // item, it will unadd the same amount of point that 
      // was once added for checking that item
      let changeInScore = EACH_ITEM_PTS_CHECKLIST;

      if (!completionCheck) {
        changeInScore = -EACH_ITEM_PTS_CHECKLIST;
      }

      const updatesOfuser = {
        // here, the increment allows firestore to apply the 
        // score differnet atomically without replacing the 
        // unrelated fields of the profile
        [`checklistProgress.${keyOfItem}`]: completionCheck,
        preparednessScore: increment(changeInScore),
      };

      if (ItemsCompletedAll) {
        // here, the arrayUnion will prevent the duplicate 
        // badge strings across the repeated completions
        updatesOfuser.badges = arrayUnion(NAME_BADGE_CHECKLIST);
      }

      transaction.update(docRefUser, updatesOfuser);

      return {
        // here, the names that match the properties that 
        // is checked by ChecklistScreen is returned here
        hasJustEarnedBadge: recentBadgeUser,
        hasCompletedAllItems: ItemsCompletedAll,
      };
    }
  );

  return rsltOfTransaction;
}

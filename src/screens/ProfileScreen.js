// references made:
// https://firebase.google.com/docs/firestore/query-data/listen

import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { styles } from "../styles/ProfileScreenStyl";

export default function ProfileScreen() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // if there is a missing current user, then it means 
    // that the auth is changing and therefore, the 
    // listener should not get attached
    const user = auth.currentUser;
    if (!user) return;

    const unsubscribe = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    });

    // this is to prevent the listener from 
    // surviving after this screen has been 
    // removed
    return unsubscribe;
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Text style={styles.stylForTitle}>
        My Profile
      </Text>

      {/* these optional chaining is used to make sure that 
      the fields are kept safe while the profile is 
      still loading */}
      <View style={styles.stylForCard}>
        <Text style={styles.stylForLbl}>Name</Text>
        <Text style={styles.stylForValue}>
          {profile?.name || "Loading..."}
        </Text>
      </View>

      <View style={styles.stylForCard}>
        <Text style={styles.stylForLbl}>Email</Text>
        <Text style={styles.stylForValue}>
          {profile?.email || auth.currentUser?.email}
        </Text>
      </View>

      <View style={styles.stylForCard}>
        <Text style={styles.stylForLbl}>Age</Text>
        <Text style={styles.stylForValue}>
          {profile?.age ? `${profile.age} years old` : "-"}
        </Text>
      </View>
    </ScrollView>
  );
}

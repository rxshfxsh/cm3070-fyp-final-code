// these are the references made:
// https://firebase.google.com/docs/auth/web/password-auth
// https://firebase.google.com/docs/firestore/manage-data/add-data#set_a_document

import { useState } from "react";
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { COLOURS } from "../constants/colours";
import WaterCurrentBackground from "../components/WaterCurrentBackground";
import { styles } from "../styles/SignUpScreenStyl";

export default function SignUpScreen({ navigation }) {
  // the fields are all controlled so that it ca be 
  // validated before the creation of the account. 
  // the name and age form the public profile. then, 
  // the email and password is passed to firebas 
  // authentication so that it can create the private 
  // login credentials
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    // before the firebase gets contacted, the 
    // client side checks are conducted first
    if (!name || !age || !email || !password) {
      // this is to prevent a user whereby their 
      // profile is missing. this is because it 
      // would miss the data that is required 
      // later for the reporting feature, 
      // leaderboard and the profile screens
      Alert.alert("Missing details", "Please fill in all fields.");
      return;
    }

    const userAge = parseInt(age, 10);

    if (isNaN(userAge) || userAge < 18 || userAge > 30) {
      // when there is an non-numeric input, the parseInt will 
      // produce NaN for it. then for this project, it is 
      // targeting adults aged 18 to 30, therefore, it 
      // scoped to that target group here
      Alert.alert("Invalid Age", "Please enter an age between 18 and 30.");
      return;
    }

    try {
      // here, the new UID is returned by firebase which 
      // will become the firestore doc ID
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // here, the fields that are required by 
      // the progress features of the app will 
      // be initialised. then the Auth UID will 
      // be used as the doc ID that will give 
      // every account its profile doc
      await setDoc(doc(db, "users", user.uid), {
        name,
        age: userAge,
        email,
        preparednessScore: 0,
        completedLessons: [],
        checklistProgress: {
          torchlight: false,
          powerBank: false,
          waterBottle: false,
          firstAidKit: false,
          emergencyContact: false,
        },
        badges: [],
        streak: 0,
        createdAt: new Date(),
      });

      // the authenticated account will be moved into the main nav 
      // by App.js and the msg here will confirm that the Auth and 
      // the profile have been created
      Alert.alert("Account created", "Welcome to SGFloodSense!");
    } catch (error) {
      // here, if there is a failed Auth req or 
      // firestore profile write, then this will 
      // be delivered as this msg to the users 
      // so that they are not confused about what went wrong
      Alert.alert("Sign up failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <WaterCurrentBackground />

      {/* this is make sure that keyboard is not blocking the fields */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoider}
      >
        <ScrollView
          // as the form is longer than the phone screen, 
          // the scrolling and keyboard handling is added 
          // here so that every field and action is accessible
          contentContainerStyle={styles.scrollContent}
          keyboardDismissMode={
            Platform.OS === "ios" ? "interactive" : "on-drag"
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formatForForm}>
            <Text style={styles.stylForTitle}>Create Account</Text>

            <Text style={styles.stylForSubTitle}>
              Start your flash flood preparedness journey.
            </Text>

            {/* these are the inputs that need to be filled up by the user */}
            <TextInput
              placeholder="Full name"
              placeholderTextColor={COLOURS.textLight}
              value={name}
              onChangeText={setName}
              autoComplete="name"
              returnKeyType="next"
              style={styles.stylForInput}
            />

            <TextInput
              placeholder="Age"
              placeholderTextColor={COLOURS.textLight}
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              returnKeyType="next"
              style={styles.stylForInput}
            />

            <TextInput
              placeholder="Email"
              placeholderTextColor={COLOURS.textLight}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              returnKeyType="next"
              style={styles.stylForInput}
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor={COLOURS.textLight}
              value={password}
              onChangeText={setPassword}
              autoComplete="new-password"
              returnKeyType="done"
              secureTextEntry
              style={styles.stylForInput}
            />

            {/* here, users are given the option to either create the 
            acc or return to user login page to login via there is 
            they alr have an exisitng account */}
            <TouchableOpacity onPress={handleSignUp} style={styles.stylForBtn}>
              <Text style={styles.stylForBtnTxt}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.stylForLoginLink}>
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

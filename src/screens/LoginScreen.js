// reference made:
// https://firebase.google.com/docs/auth/web/password-auth

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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { COLOURS } from "../constants/colours";
import WaterCurrentBackground from "../components/WaterCurrentBackground";
import { styles } from "../styles/LoginScreenStyl";

export default function LoginScreen({ navigation }) {
  // the controlled fields here keep the displayed 
  // values and the submission values aligned
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // this is done so that the incomplete req 
    // can be avoided from being sent to firebase
    if (!email || !password) {
      // since both values are needed for the 
      // authentication of the email and password,
      //  if any of the values are missing, this 
      // will stop the user to alert them to input 
      // the missing values accordingly
      Alert.alert("Missing details", "Please enter email and password.");
      return;
    }

    try {
      // when App.js receives the signed-in user, 
      // the navigation will change automatically
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      // here, firebase will return useful cases such as the 
      // invalid credential and it will erorr will be exposed
      //  as the msg for users to see so that they can correct 
      // the problem accordingly
      Alert.alert("Login failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <WaterCurrentBackground />

      {/* this will move the form accordingly to make sure that the 
      form is visible when the keyboard is present*/}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoider}
      >
        <ScrollView
          // when the keyboard is still visible, when the login 
          // button is being tapped, it should still register. 
          // however, draggin should dismiss it 
          contentContainerStyle={styles.scrollContent}
          keyboardDismissMode={
            Platform.OS === "ios" ? "interactive" : "on-drag"
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formatForForm}>
            <Text style={styles.styForTitle}>SG Flood Sense</Text>

            <Text style={styles.styForSubTitle}>
              Login to continue your preparedness journey.
            </Text>

            {/* here the input for the email is normalised 
            where the capitalisation is disabled */}
            <TextInput
              placeholder="Email"
              placeholderTextColor={COLOURS.textLight}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              returnKeyType="next"
              style={styles.styForInput}
            />

            {/* in the password input, the characters are
             being entered will be hidden while the 
             controlled state remains */}
            <TextInput
              placeholder="Password"
              placeholderTextColor={COLOURS.textLight}
              value={password}
              onChangeText={setPassword}
              autoComplete="current-password"
              returnKeyType="done"
              secureTextEntry
              style={styles.styForInput}
            />

            {/* here, users can finally press submit to 
            submit their credentials or choose to click 
            the sign up button to create a new account 
            in the sign up page */}
            <TouchableOpacity onPress={handleLogin} style={styles.styForBtn}>
              <Text style={styles.styForBtntxt}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.stylforLinkToSignUp}>
                New user? Create an account
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// references made:
// https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user
// https://reactnavigation.org/docs/auth-flow/
// https://reactnavigation.org/docs/navigation-container/

import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./src/services/firebase";
import AppNavigator from "./src/navigation/AppNavigator";

// this is the main app component where the user's firebase login will be checked before the screens are shown
export default function App() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setloadingAuth] = useState(true);

  // here, when the app starts, the subcription to the 
  // firebase authentication changes where the callback 
  // will update the current user and then the returned 
  // function will unsubscribe during the cleanup
  useEffect(() => {
    const AuthUnsubscribing = onAuthStateChanged(
      auth,
      (userAuthenticated) => {
        setUser(userAuthenticated);
        setloadingAuth(false);
      }
    );

    return AuthUnsubscribing;
  }, []);

  return (
    <SafeAreaProvider>
      {/* while firebase is checking for the 
      saved login, this loading symbol will 
      be shown to the users*/}
      {loadingAuth ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <NavigationContainer>
          {/* finally, after the check, based on the login state of the user, screens will be avaiable to them if they are logged in successfully */}
          <AppNavigator user={user} />
        </NavigationContainer>
      )}
    </SafeAreaProvider>
  );
}

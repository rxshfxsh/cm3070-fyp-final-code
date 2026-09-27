// references made:
// https://reactnavigation.org/docs/auth-flow/
// https://reactnavigation.org/docs/nesting-navigators/
// https://reactnavigation.org/docs/screen-options-resolution/
import React from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";

import ChecklistScreen from "../screens/ChecklistScreen";
import LearningScreen from "../screens/LearningScreen";
import EmergencyHubScreen from "../screens/EmergencyHubScreen";
import ProfileScreen from "../screens/ProfileScreen";
import QuizScreen from "../screens/QuizScreen";
import LearningMapScreen from "../screens/LearningMapScreen";
import LeaderboardScreen from "../screens/LeaderboardScreen";
import ReportScreen from "../screens/ReportScreen";

const StackForNavigator = createNativeStackNavigator();
const TabsAtBottom = createBottomTabNavigator();

// these are the bottom tabs for the 
// learning map, emergency hub, emergency 
// checklist and the leaderboard screen
function NavigatorForMainTab() {
  return (
    <TabsAtBottom.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0066CC",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <TabsAtBottom.Screen
        name="LearningMap"
        component={LearningMapScreen}
        options={{
          title: "Map",
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>🗺️</Text>,
        }}
      />

      <TabsAtBottom.Screen
        name="EmergencyHub"
        component={EmergencyHubScreen}
        options={{
          title: "Hub",
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>🚨</Text>,
        }}
      />

      <TabsAtBottom.Screen
        name="Checklist"
        component={ChecklistScreen}
        options={{
          title: "Bag",
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>🎒</Text>,
        }}
      />

      <TabsAtBottom.Screen
        // The leaderboard shows the points earned across the other features.
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          title: "Trophy",
          tabBarIcon: () => <Text style={{ fontSize: 22 }}>🏆</Text>,
        }}
      />
    </TabsAtBottom.Navigator>
  );
}

export default function AppNavigator({ user }) {
  return (
    // the single root stack is used here for both 
    // the authentication states so that when the user
    //  changes, the previous group of screens can be 
    // removed by react nav
    <StackForNavigator.Navigator
      screenOptions={{
        animation: "default",
      }}
    >
      {/* here, when the user is signed out, they need to pick 
      the authentication screens accordingly and then the 
      application screens when signed in */}
      {!user ? (
        <>
          {/* this is the login and sign up screens*/}
          <StackForNavigator.Screen name="Login" component={LoginScreen} />
          <StackForNavigator.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : (
        <>
          {/* this is the home page that users will first see upon logging in successfully */}
          <StackForNavigator.Screen name="Home" component={HomeScreen} />

          <StackForNavigator.Screen
            name="MainTabs"
            component={NavigatorForMainTab}
            options={({ route: routeForTheMainTabs }) => {
              // as the nested state may be absent on the first render, the default is used here
              const nameOfTab =
                routeForTheMainTabs.state?.routes?.[
                  routeForTheMainTabs.state.index
                ]?.name || "LearningMap";

              let titleOfHeader = "Map";

              if (nameOfTab === "EmergencyHub") {
                titleOfHeader = "Hub";
              }

              if (nameOfTab === "Checklist") {
                titleOfHeader = "Bag";
              }

              if (nameOfTab === "Leaderboard") {
                titleOfHeader = "Trophy";
              }

              return {
                // the back button will bring the user back to the home page
                title: titleOfHeader,
                headerBackTitle: "Home",
              };
            }}
          />

          {/* after viewing the respective screens, below, 
          the back button will bring them back to the homepage 
          or to the maintabs accordingly */}
          <StackForNavigator.Screen
            name="Learning"
            component={LearningScreen}
            options={{
              headerBackTitle: "Home",
            }}
          />

          <StackForNavigator.Screen
            name="Quiz"
            component={QuizScreen}
            options={{
              headerBackTitle: "Home",
            }}
          />

          <StackForNavigator.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              title: "Profile",
              headerBackTitle: "Home",
            }}
          />

          <StackForNavigator.Screen
            name="Report"
            component={ReportScreen}
            options={{
              title: "Community Reporting",
              headerBackTitle: "Home",
            }}
          />
        </>
      )}
    </StackForNavigator.Navigator>
  );
}

// references made + data obtained:
// https://docs.expo.dev/versions/latest/sdk/location/
// https://api-open.data.gov.sg/v2/real-time/api/weather/flood-alerts
// https://api-open.data.gov.sg/v2/real-time/api/twenty-four-hr-forecast

import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import { styles } from "../styles/EmergencyHubScreenStyl";
import EmergencyFloodMapCard from "../components/EmergencyFloodMapCard";
import EmergencyFloodMapDemoCard from "../components/EmergencyFloodMapDemoCard";
import EmergencyWeatherCard from "../components/EmergencyWeatherCard";

import {
  URL_FOR_FLOOD_ALERTS_API,
  URL_FOR_WEATHER_FORECAST_API,
  INTERVAL_FOR_FLOOD_REFRESH_MS,
  INTERVAL_FOR_WEATHER_REFRESH_MS,
  USE_THIS_LOC_FOR_TESTING,
  LOC_FOR_TESTING,
  weatherForecastParsing,
  floodAlertsParsing,
} from "../utils/emergency";

export default function EmergencyHubScreen() {
  // here, the Location, remote data, loading and error values 
  // are all independent so one unavailable service does not 
  // prevent the other cards from rendering. then, for 
  // locOfuser, it either uses the coordinates of the device 
  // or the fallback coordinates of SG and usingLocFallback 
  // tells the map whether it can label the point as the user
  const [locOfuser, setLocOfUser] = useState(null);

  const [usingLocFallback, setUsingLocFallback] =
    useState(false);

  const [alertsForFlood, setAlertsForFlood] = useState([]);
  // the 2 apis return different shapes. so the flood alerts use 
  // the array and the latest 24-hour forecast uses one object 
  // or it is null before it loads
  const [weather, setWeather] = useState(null);

  const [loadingOfLoc, setLoadingOfLoc] = useState(true);

  const [
    loadingAlertsForFlood,
    setLoadingAlertsForFlood,
  ] = useState(true);

  const [leadingOfWeather, setLeadingOfWeather] =
    useState(true);

  const [errOfLoc, setErrOfLoc] = useState("");
  // there are separate error messages for each card. this is 
  // so that when there is a failure, it can explain the error 
  // the clearly without simply hiding the successful data 
  // that is returned by the other services
  const [errOfFlood, setErrOfFlood] = useState("");
  const [errOfWeather, setErrOfWeather] = useState("");

  const [updateForFloodLast, setUpdateForFloodLast] =
    useState(null);

  useEffect(() => {
    // it is load immediately and then each of 
    // the official feed is refereshed at its own interval
    userLocGetting();
    // the 3 calls here are independent. 
    // therefore, they will begin tgt on mount
    alertsForFloodFetching();
    weatherForecastFetching();

    const timerForFloodRefresh = setInterval(
      alertsForFloodFetching,
      INTERVAL_FOR_FLOOD_REFRESH_MS
    );

    const timerForWeatherRefresh = setInterval(
      weatherForecastFetching,
      INTERVAL_FOR_WEATHER_REFRESH_MS
    );

    // here, when user us leaving the hub, the 
    // timers are cleared so that the future scheduled 
    // requests are prevented
    return () => {
      clearInterval(timerForFloodRefresh);
      clearInterval(timerForWeatherRefresh);
    };
  }, []);

  async function userLocGetting() {
    // in the case that the permission to get the 
    // location from the user is denied, then the 
    // singapore fallback is used here so that the 
    // map is still useful
    setLoadingOfLoc(true);
    setErrOfLoc("");

    try {
      let coord;

      if (USE_THIS_LOC_FOR_TESTING) {
        // this explicit switch is used here to make 
        // the simulator testing repeatable without 
        // pretending that the fallback coord is 
        // the real device location
        coord = LOC_FOR_TESTING;
        setUsingLocFallback(true);
      } else {
        // since the location is being read on demand,
        // the foreground permission is sufficient
        const responseForPermission =
          await Location.requestForegroundPermissionsAsync();

        if (responseForPermission.status !== "granted") {
          // if the permission to get the location is denied, 
          // it should not remove the safety map entirely. 
          // therefore, the map will be centred on singapore 
          // and it will be explained why the marker of the 
          // user is unavailable
          coord = LOC_FOR_TESTING;
          setUsingLocFallback(true);

          setErrOfLoc(
            "Location permission was not granted. Showing a Singapore-wide map instead."
          );
        } else {
          // the balanced accuray is enough for the regional safety 
          // overview here and it will usually use less time and 
          // power than the gps req of high accuracy
          const currLoc =
            await Location.getCurrentPositionAsync({
              accuracy: Location.Accuracy.Balanced,
            });

          coord = {
            latitude: currLoc.coords.latitude,
            longitude: currLoc.coords.longitude,
          };

          setUsingLocFallback(false);
        }
      }

      setLocOfUser(coord);
      // here, the coordinate is stored in 
      // state and will be passed again whenever 
      // the componenet renders
    } catch (error) {
      console.error("Location error:", error);

      setLocOfUser(LOC_FOR_TESTING);
      // if there are any unexpected errors with the 
      // provider, then it will use the same safe 
      // fallback as the permission denial
      setUsingLocFallback(true);

      setErrOfLoc(
        "Your current location could not be detected. Showing a Singapore-wide map instead."
      );
    } finally {
      setLoadingOfLoc(false);
    }
  }

  async function alertsForFloodFetching() {
    // the official endpoint is fetched here and it 
    // will preserve the readable errors for the card
    try {
      setLoadingAlertsForFlood(true);
      // here, the earlier error is cleared because the 
      // new req could recover successfully
      setErrOfFlood("");

      const response = await fetch(
        URL_FOR_FLOOD_ALERTS_API,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      // if there is HTTP 429 error, this is explained 
      // separately because when the process of retrying 
      // immediately could worsen it
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            "The flood service is receiving too many requests. Please wait before refreshing."
          );
        }

        throw new Error(
          `The flood service returned status ${response.status}.`
        );
      }

      const dataOfResponse = await response.json();

      if (dataOfResponse.code !== 0) {
        // here, the endpoint could return HTTP success even 
        // though its JSON body may report a service level 
        // error. therefore, both of these status layers have 
        // to be checked
        throw new Error(
          dataOfResponse.errorMsg ||
            "The flood alert data was unavailable."
        );
      }

      // here, the shape of the expected response is guarded 
      // before its records are passed to the parser
      let records = [];

      if (
        dataOfResponse.data &&
        Array.isArray(dataOfResponse.data.records)
      ) {
        records = dataOfResponse.data.records;
      }

      setAlertsForFlood(floodAlertsParsing(records));

      // the invalid, duplicate and expired alerts are removed by 
      // parsing and this is done before the state is given to 
      // the map. so this will keep the presentation code focused 
      // on rendering

      if (
        records.length > 0 &&
        records[0].updatedTimestamp
      ) {
        // here, the source's own update time is preferred 
        // when it is included in the feed
        setUpdateForFloodLast(
          records[0].updatedTimestamp
        );
      } else {
        // in the case that the source omits it, this will 
        // be shown when the successful req is completed
        setUpdateForFloodLast(new Date().toISOString());
      }
    } catch (error) {
      console.error("Flood alert API error:", error);

      setErrOfFlood(
        error.message ||
          "Live flood alerts could not be loaded."
      );
    } finally {
      // then here, the map can leave its loading state 
      // despite the success or failed state
      setLoadingAlertsForFlood(false);
    }
  }

  // this function is used to fetch the weather forecast
  async function weatherForecastFetching() {
    // here, the weather uses the same defensive req pattern 
    // that was used for the flood alert feed
    try {
      setLeadingOfWeather(true);
      setErrOfWeather("");

      const response = await fetch(
        URL_FOR_WEATHER_FORECAST_API,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            "The weather service is receiving too many requests. Please try again shortly."
          );
        }

        throw new Error(
          `The weather service returned status ${response.status}.`
        );
      }

      const dataOfResponse = await response.json();

      if (dataOfResponse.code !== 0) {
        // here just like what was done for the flood date, 
        // the data.gov.sg is response code is inspected
        //  together with HTTP
        throw new Error(
          dataOfResponse.errorMsg ||
            "The weather forecast was unavailable."
        );
      }

      let records = [];

      if (
        dataOfResponse.data &&
        Array.isArray(dataOfResponse.data.records)
      ) {
        records = dataOfResponse.data.records;
      }

      // here, the response specific to the api is converted 
      // into the stable view model of the card
      const latestForecast =
        weatherForecastParsing(records);

      if (!latestForecast) {
        // here, even if the response is successful, it 
        // cannot populate the card if it is empty
        throw new Error(
          "No Singapore weather forecast was returned."
        );
      }

      setWeather(latestForecast);
      // only after the completed parsed forecast exists, 
      // then only the existing weather can get replaced
    } catch (error) {
      console.error("Weather API error:", error);

      setErrOfWeather(
        error.message ||
          "The Singapore weather forecast could not be loaded."
      );
      // here, the weather is not deliberately cleared. this 
      // is so that the previous forecast that has been fetched 
      // successfully can still be visible with the refresh warning 
      // rather just leaving a blank card
    } finally {
      // Re-enable manual refresh once this request has settled.
      // once the req has been settled, then the manual 
      // refresh will re-enabled once
      setLeadingOfWeather(false);
    }
  }

  // this function is used for the refreshing the data of the map
  async function refreshingDataOfMap() {
    // here, the location and the alerts are refreshed 
    // concurrently by the manual map
    await Promise.all([
      userLocGetting(),
      alertsForFloodFetching(),
    ]);
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.stylForHeader}>
        Emergency Hub
      </Text>

      {/* even when the remote services fail, the emergency contact
       here will still remain available for users*/}
      <View style={styles.stylForCard}>
        <Text style={styles.stylForTitle}>
          Emergency Contacts
        </Text>

        <Text style={styles.stylForContent}>
          🚑 SCDF: 995
        </Text>

        <Text style={styles.stylForContent}>
          👮 Police: 999
        </Text>

        <Text style={styles.stylForContent}>
          🌧️ PUB Flood Hotline: 1800-CALL-PUB
        </Text>
      </View>

      {/* here, the data and actions are passed down */}
      <EmergencyWeatherCard
        errOfWeather={errOfWeather}
        leadingOfWeather={leadingOfWeather}
        onRefresh={weatherForecastFetching}
        weather={weather}
      />

      <EmergencyFloodMapCard
        alertsForFlood={alertsForFlood}
        errOfFlood={errOfFlood}
        errOfLoc={errOfLoc}
        loadingAlertsForFlood={loadingAlertsForFlood}
        loadingOfLoc={loadingOfLoc}
        locOfuser={locOfuser}
        onRefresh={refreshingDataOfMap}
        updateForFloodLast={updateForFloodLast}
        usingLocFallback={usingLocFallback}
      />

      <EmergencyFloodMapDemoCard />

      {/* here are the quick points for users to see while they view the live infromation*/}
      <View style={styles.stylForCard}>
        <Text style={styles.stylForTitle}>
          Before a Flash Flood
        </Text>

        <Text style={styles.stylForContent}>
          • Complete the emergency checklist and prepare the
          items in advance.
        </Text>

        <Text style={styles.stylForContent}>
          • Move important items away from low-lying areas.
        </Text>

        <Text style={styles.stylForContent}>
          • Monitor official weather and flood updates.
        </Text>

        <Text style={styles.stylForContent}>
          • Avoid flood-prone roads and underpasses.
        </Text>
      </View>
    </ScrollView>
  );
}

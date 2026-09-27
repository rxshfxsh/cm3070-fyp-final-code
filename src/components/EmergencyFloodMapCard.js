// references made:
// https://github.com/react-native-maps/react-native-maps

import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";

import { COLOURS } from "../constants/colours";
import { styles } from "../styles/EmergencyHubScreenStyl";
import {
  REGION_BASED_IN_SG,
  sgTimingFormatting,
} from "../utils/emergency";

export default function EmergencyFloodMapCard({
  alertsForFlood,
  errOfFlood,
  errOfLoc,
  loadingAlertsForFlood,
  loadingOfLoc,
  locOfuser,
  onRefresh,
  updateForFloodLast,
  usingLocFallback,
}) {
  // here, the full placeholder will be shown 
  // while both of the initial requests are pending. 
  // when one of it settles, then the map will be 
  // rendered with partial loading or with its error states
  const LoadingOfMap =
    loadingOfLoc && loadingAlertsForFlood;

  // when the initial requsts are still pending, thats when the 
  // full placeholder part is needed. but after that, partial 
  // info parts and errors will be shown on the card 

  // as the refresh part will start both of the operations, it will be 
  // disabled until it is not busy
  const disablingRefreshForMap =
    loadingOfLoc || loadingAlertsForFlood;
  
  // it will start off with the clear state and 
  // then be filled with the loading, error or alerts part
  let stylingForFldStatus =
    styles.stylForStatusOfFloodClear;
  
  let iconForFldStatus = "✓";
  
  let titleForFldTitle =
    "No active flood alerts returned";
  
  if (loadingAlertsForFlood) {
    titleForFldTitle = "Refreshing flood alerts...";

  } else if (errOfFlood) {
    stylingForFldStatus =
      styles.stylForStatusOfFloodWarning;
  
    iconForFldStatus = "!";
    titleForFldTitle = "Live alerts unavailable";

  } else if (alertsForFlood.length > 0) {
    stylingForFldStatus =
      styles.stylForStatusOfFloodActive;
  
    iconForFldStatus = "!";
  
    if (alertsForFlood.length === 1) {
      // to show one flash alert
      titleForFldTitle = "1 active flood alert";
    } else {
      // to show the number of flash alerts but getting the number of alerts
      titleForFldTitle =
        `${alertsForFlood.length} active flood alerts`;
    }
  }
  
  let txtForFldUpdate =
    "Waiting for the latest data";
  
  if (updateForFloodLast) {
    // here, the timestamp provided by the API is 
    // getting converted into SG timing. however, 
    // the timestamp will not always be provided 
    // by the api, the parent may sometimes provide 
    // the current req time as the fallback
    txtForFldUpdate =
      `Data updated ${sgTimingFormatting(
        updateForFloodLast
      )}`;
  }

  return (
    <View style={styles.stylForCard}>
          <View style={styles.stylForTitleRowM}>
            <View style={styles.stylForTitleTxtContM}>
              <Text style={styles.stylForTitle}>
                Live Singapore Flood Map
              </Text>
    
              <Text style={styles.stylForDescripM}>
                View live PUB flood events from data.gov.sg,
                your current location and affected areas
                across Singapore.
              </Text>
            </View>
    
            <TouchableOpacity
              // to prevent repeat requests from users, 
              // there is a disabled prop and styling made for it
              style={[
                styles.stylForRefreshBtn,
                disablingRefreshForMap
                  ? styles.stylForRefreshBtnDisabled
                  : null,
              ]}
              onPress={onRefresh}
              disabled={disablingRefreshForMap}
            >
              <Text style={styles.stylForRefreshBtnTxt}>
                ↻
              </Text>
            </TouchableOpacity>
          </View>
    
          {LoadingOfMap ? (
            // here, after at least one initial req has been 
            // settled, then the map will be mount
            <View style={styles.stylForLoadingCont}>
              <ActivityIndicator
                size="large"
                color={COLOURS.primary}
              />
    
              <Text style={styles.stylForLoadingTxt}>
                Loading the Singapore safety map...
              </Text>
            </View>
          ) : (
            <>
              <View
                style={[
                  styles.stylForStatusOfFlood,
                  stylingForFldStatus,
                ]}
              >
                {loadingAlertsForFlood ? (
                  <ActivityIndicator
                    size="small"
                    color={COLOURS.primary}
                  />
                ) : (
                  <Text
                    style={
                      styles.stylForStatusOfFloodIcon
                    }
                  >
                    {iconForFldStatus}
                  </Text>
                )}
    
                <View
                  style={
                    styles.stylForStatusOfFloodTxtCont
                  }
                >
                  <Text
                    style={
                      styles.stylForStatusOfFloodTitle
                    }
                  >
                    {titleForFldTitle}
                  </Text>
    
                  <Text
                    style={
                      styles.stylForStatusOfFloodTime
                    }
                  >
                    {txtForFldUpdate}
                  </Text>
                </View>
              </View>
    
              {errOfLoc ? (
                // here, even if there is an error in loading the 
                // location, the alerts will still be displayed
                <Text style={styles.stylForErrTxt}>
                  {errOfLoc}
                </Text>
              ) : null}
    
              {errOfFlood ? (
                // in the case that there is an error 
                // with the api, it will be shown accordingly
                <Text style={styles.stylForErrTxt}>
                  {errOfFlood}
                </Text>
              ) : null}
  
              {/* here, the map will start by being centered on SG 
              and if there is a genuine user loc, then it will be 
              displayed separately as a marker*/}
              <MapView
                style={styles.stylForM}
                initialRegion={REGION_BASED_IN_SG}
                showsCompass
                showsMyLocationButton={false}
                showsUserLocation={false}
              >
                {locOfuser && !usingLocFallback ? (
                  <Marker
                    coordinate={locOfuser}
                    title="You are here"
                    description="Your current location"
                    pinColor={COLOURS.success}
                  />
                ) : null}
    
                {/* the flood alerts for the areas will be diplayed 
                with a pin and cicle encompassing that area */}
                {alertsForFlood.map((alert) => (
                  <React.Fragment key={alert.id}>
                    <Circle
                      center={{
                        latitude: alert.latitude,
                        longitude: alert.longitude,
                      }}
                      radius={alert.radius}
                      strokeColor="rgba(220, 38, 38, 0.85)"
                      fillColor="rgba(220, 38, 38, 0.22)"
                      strokeWidth={2}
                    />
    
                    <Marker
                      // when the user presses the marker of the flood alert, 
                      // it will display the headline part and its area
                      coordinate={{
                        latitude: alert.latitude,
                        longitude: alert.longitude,
                      }}
                      title={
                        `${alert.headline}: ` +
                        `${alert.nameOfArea}`
                      }
                      description={alert.instruc}
                      pinColor="#DC2626"
                    />
                  </React.Fragment>
                ))}
              </MapView>
    
              <View style={styles.stylForLegend}>
                {locOfuser && !usingLocFallback ? (
                  <View style={styles.stylForLegendItem}>
                    <View
                      style={[
                        styles.stylForLegendCirc,
                        styles.stylForLegendUser,
                      ]}
                    />
    
                    <Text style={styles.stylForLegendtxt}>
                      You
                    </Text>
                  </View>
                ) : null}
    
                <View style={styles.stylForLegendItem}>
                  <View
                    style={[
                      styles.stylForLegendCirc,
                      styles.stylForLegendFlood,
                    ]}
                  />
    
                  <Text style={styles.stylForLegendtxt}>
                    PUB flood alert
                  </Text>
                </View>
              </View>
    
              {/* this is the disclaimer to inform users to seek info from 
              the official pages in the event of an flood event */}
              <Text style={styles.stylForDisclaimer}>
               These flood events have been derived from 
                PUB's data from data.gov.sg website. Therefore, 
                for official flood alerts and instructions, 
                please seek the official page.
              </Text>
    
              {/* here, the cards will be repeated if 
              there are more flood alerts  */}
              {alertsForFlood.length > 0 ? (
                <View style={styles.stylForListA}>
                  <Text style={styles.stylForListTitleA}>
                    Active alert details
                  </Text>
    
                  {alertsForFlood.map((alert) => (
                    <View
                      key={`details-${alert.id}`}
                      style={styles.stylForCardA}
                    >
                      <View
                        style={styles.stylForHeadingRwA}
                      >
                        <Text
                          style={styles.stylForHeadlineA}
                        >
                          {alert.headline}
                        </Text>
    
                        <Text
                          style={styles.stylForSeverityA}
                        >
                          {alert.severity}
                        </Text>
                      </View>
    
                      <Text style={styles.stylForAreaA}>
                        📍 {alert.nameOfArea}
                      </Text>
    
                      {alert.decrip ? (
                        <Text
                          style={styles.stylForDescriptionA}
                        >
                          {alert.decrip}
                        </Text>
                      ) : null}
    
                      <Text
                        style={styles.stylForInstructionA}
                      >
                        {alert.instruc}
                      </Text>
    
                      <Text style={styles.stylForTimeA}>
                        Issued{" "}
                        {sgTimingFormatting(alert.issuedAt)}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : null}
            </>
          )}
        </View>
  );
}

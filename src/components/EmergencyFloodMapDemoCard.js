// references made:
// https://github.com/react-native-maps/react-native-maps

import React from "react";
import { Text, View } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";

import { COLOURS } from "../constants/colours";
import { FLOOD_DEMO_EVENT } from "../data/floodDemoData";
import { styles } from "../styles/EmergencyHubScreenStyl";
import { REGION_BASED_IN_SG } from "../utils/emergency";

export default function EmergencyFloodMapDemoCard() {
  // here, the total number of areas that are affected is 
  // derived so that it stays correct if the fixture were to change.
  const numberOfAreas =
    FLOOD_DEMO_EVENT.affectedAreas.length;

  return (
    <View style={styles.stylForCard}>
      <View style={styles.stylForDemoHeaderRow}>
        <View style={styles.stylForDemoTitleContainer}>
          <Text style={styles.stylForTitle}>
            Historical Flood Map Demo
          </Text>

          <Text style={styles.stylForDescripM}>
            See how the map looks when flood-risk notices are
            active, using a major 2026 rainfall event.
          </Text>
        </View>

        <View
          style={styles.stylForDemoBadge}
          accessibilityLabel="Demo, not live"
        >
          <Text style={styles.stylForDemoBadgeTxt}>
            DEMO · NOT LIVE
          </Text>
        </View>
      </View>

      {/* these are the labels to differentiate between 
      the live flood map and the demo version */}
      <View style={styles.stylForDemoEventBanner}>
        <Text style={styles.stylForDemoEventTitle}>
          Heavy rainfall event · {FLOOD_DEMO_EVENT.date}
        </Text>

        <Text style={styles.stylForDemoEventTxt}>
          Historical alert replay for learning and testing only
        </Text>
      </View>

      {/* here is the summary of the measurement for the 
      rainfall and locations where it is taking place */}
      <View style={styles.stylForDemoMetrics}>
        <View style={styles.stylForDemoMetric}>
          <Text style={styles.stylForDemoMetricValue}>
            {FLOOD_DEMO_EVENT.rainfall} mm
          </Text>

          <Text style={styles.stylForDemoMetricLabel}>
            highest daily rainfall
          </Text>

          <Text style={styles.stylForDemoMetricPlace}>
            at {FLOOD_DEMO_EVENT.rainfallLocation}
          </Text>
        </View>

        <View style={styles.stylForDemoMetricDivider} />

        <View style={styles.stylForDemoMetric}>
          <Text style={styles.stylForDemoMetricValue}>
            {numberOfAreas}
          </Text>

          <Text style={styles.stylForDemoMetricLabel}>
            flood-risk locations
          </Text>

          <Text style={styles.stylForDemoMetricPlace}>
            in PUB advisories
          </Text>
        </View>
      </View>

      {/* here, the rainfall station is plotted and 
      each advisory area (historically) too */}
      <MapView
        style={styles.stylForM}
        initialRegion={REGION_BASED_IN_SG}
        showsCompass
        showsMyLocationButton={false}
        showsUserLocation={false}
      >
        <Marker
          // measurement station is rep by the blue marker 
          // and this does not rep the flood area
          coordinate={FLOOD_DEMO_EVENT.rainfallCoordinate}
          title={`${FLOOD_DEMO_EVENT.rainfall} mm rainfall`}
          description={
            `Recorded at ${FLOOD_DEMO_EVENT.rainfallLocation} ` +
            `on ${FLOOD_DEMO_EVENT.date}`
          }
          pinColor={COLOURS.primary}
        />

        {FLOOD_DEMO_EVENT.affectedAreas.map((area) => (
          // the same circle and marker that has been used for the live flood map 
          // is used here too so that users can see how it will actually 
          // look like on the real live flood map
          <React.Fragment key={area.id}>
            <Circle
              center={{
                latitude: area.latitude,
                longitude: area.longitude,
              }}
              radius={area.radius}
              strokeColor="rgba(220, 38, 38, 0.85)"
              fillColor="rgba(220, 38, 38, 0.22)"
              strokeWidth={2}
            />

            <Marker
              coordinate={{
                latitude: area.latitude,
                longitude: area.longitude,
              }}
              title={`${area.alertType}: ${area.nameOfArea}`}
              description={area.instruc}
              pinColor="#DC2626"
            />
          </React.Fragment>
        ))}
      </MapView>

      {/* this section of the legend have to differentiate 
      between the advisory areas and the rainfall station maker */}
      <View style={styles.stylForLegend}>
        <View style={styles.stylForLegendItem}>
          <View
            style={[
              styles.stylForLegendCirc,
              styles.stylForLegendFlood,
            ]}
          />

          <Text style={styles.stylForLegendtxt}>
            Historical flood-risk notice
          </Text>
        </View>

        <View style={styles.stylForLegendItem}>
          <View
            style={[
              styles.stylForLegendCirc,
              styles.stylForLegendRainfall,
            ]}
          />

          <Text style={styles.stylForLegendtxt}>
            Rainfall reading
          </Text>
        </View>
      </View>

      {/* this part shows the disclaimer for the users to know that 
      this demo part has been made using weather data collected 
      from 19 feb 2026 so that the flood map can be showcased. */}
      <Text style={styles.stylForDisclaimer}>
        This is just a demonstration of the live flood map as per 
        the weather data collected from PUB for 19 February 2026. 
        Please be advised to always follow official alerts.
      </Text>

      <View style={styles.stylForListA}>
        <Text style={styles.stylForListTitleA}>
          Historical alert details
        </Text>

        {FLOOD_DEMO_EVENT.affectedAreas.map((area) => (
          <View key={`demo-${area.id}`} style={styles.stylForCardA}>
            <View style={styles.stylForHeadingRwA}>
              <Text style={styles.stylForHeadlineA}>
                {area.alertType}
              </Text>

              <Text style={styles.stylForSeverityA}>
                HISTORICAL
              </Text>
            </View>

            <Text style={styles.stylForAreaA}>
              📍 {area.nameOfArea}
            </Text>

            <Text style={styles.stylForInstructionA}>
              {area.instruc}
            </Text>

            <Text style={styles.stylForTimeA}>
              Issued {area.issuedAt} on {FLOOD_DEMO_EVENT.date}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

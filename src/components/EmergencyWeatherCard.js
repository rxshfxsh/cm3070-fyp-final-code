// weather data collected from:
// https://api-open.data.gov.sg/v2/real-time/api/twenty-four-hr-forecast

import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLOURS } from "../constants/colours";
import { styles } from "../styles/EmergencyHubScreenStyl";
import {
  gettingIconOfWeather,
  sgTimingFormatting,
} from "../utils/emergency";

export default function EmergencyWeatherCard({
  errOfWeather,
  leadingOfWeather,
  onRefresh,
  weather,
}) {
  // here, the state selection is isolated 
  // from the fixed card header and the 
  // refresh control
  function showingContentForWeather() {
    if (leadingOfWeather && !weather) {
      // since the first req has no earlier forecast 
      // to retain, a compact loading state will be 
      // shown in the place of the summary and metrics
      return (
        <View style={styles.stylForLoadingContainerW}>
          <ActivityIndicator
            size="small"
            color={COLOURS.primary}
          />
  
          <Text style={styles.stylForLoadingTxtW}>
            Loading Singapore forecast...
          </Text>
        </View>
      );
    }
  
    // if there is no weather shown after 
    // loading, then it means that an error 
    // has prevented the initial data
    if (!weather) {
      return (
        <Text style={styles.stylForErrTxt}>
          {errOfWeather}
        </Text>
      );
    }
  
    // the exisiting weather will stay visible 
    // even if the later refresh reports an error. 
    // this is done so that the useful recent info 
    // does not get discarded during this temp fault
    return (
      <>
        <View style={styles.stylForSummaryW}>
          <Text style={styles.stylForIconW}>
            {/* the icon here is derived from 
            the forecast wording */}
            {gettingIconOfWeather(
              weather.weatherForecasr
            )}
          </Text>
  
          <View style={styles.stylForSummaryTxtW}>
            <Text style={styles.stylForForecastW}>
              {weather.weatherForecasr}
            </Text>
  
            <Text style={styles.stylForValidPeriodW}>
              {weather.periodThatIsValid}
            </Text>
          </View>
        </View>
  
        {/* every metric here is in the safely formatted 
        range from the parser */}
        <View style={styles.stylForMetricsW}>
          <View style={styles.stylForMetricW}>
            <Text style={styles.stylForMetricLblW}>
              Temperature
            </Text>
  
            <Text style={styles.stylForMetricValW}>
              {weather.tempValue}
            </Text>
          </View>
  
          <View style={styles.stylForMetricDividerW} />
  
          <View style={styles.stylForMetricW}>
            <Text style={styles.stylForMetricLblW}>
              Humidity
            </Text>
  
            <Text style={styles.stylForMetricValW}>
              {weather.humidValue}
            </Text>
          </View>
  
          <View style={styles.stylForMetricDividerW} />
  
          <View style={styles.stylForMetricW}>
            <Text style={styles.stylForMetricLblW}>
              Wind
            </Text>
  
            <Text style={styles.stylForMetricValW}>
              {weather.speedOfWindValue}
            </Text>
  
            <Text style={styles.stylForDirOfWindW}>
              {weather.dirOfWindValue}
            </Text>
          </View>
        </View>
  
        <Text style={styles.stylForUpdatedTxtW}>
          Updated{" "}
          {sgTimingFormatting(weather.updatedTiming)}
        </Text>
  
        {errOfWeather ? (
          // this failed refresh will appear below 
          // the last forecast that has been loaded 
          // successfully
          <Text style={styles.stylForWarningTxtW}>
            {errOfWeather}
          </Text>
        ) : null}
      </>
    );
  }

  return (
    <View style={styles.stylForCard}>
          <View style={styles.stylForTitleRowW}>
            <View style={styles.stylForTitleContainerW}>
              <Text style={styles.stylForTitle}>
                Singapore Weather
              </Text>
    
              <Text style={styles.stylForDscrpW}>
                NEA 24-hour forecast from data.gov.sg
              </Text>
            </View>
    
            {/* this refresh will be disabled when 
            a req is alr in  progress */}
            <TouchableOpacity
              style={[
                styles.stylForRefreshBtn,
                leadingOfWeather
                  ? styles.stylForRefreshBtnDisabled
                  : null,
              ]}
              onPress={onRefresh}
              disabled={leadingOfWeather}
              accessibilityRole="button"
              accessibilityLabel="Refresh Singapore weather forecast"
            >
              {/* while the req is running, the refrsh glyph 
              will be replaced with progress */}
              {leadingOfWeather ? (
                <ActivityIndicator
                  size="small"
                  color={COLOURS.primary}
                />
              ) : (
                <Text style={styles.stylForRefreshBtnTxt}>
                  ↻
                </Text>
              )}
            </TouchableOpacity>
          </View>
    
          {showingContentForWeather()}
        </View>
  );
}


// this is where the data has been retrieved:
// https://api-open.data.gov.sg/v2/real-time/api/weather/flood-alerts
// https://api-open.data.gov.sg/v2/real-time/api/twenty-four-hr-forecast

// here, the map region of singapore is used
export const REGION_BASED_IN_SG = {
  latitude: 1.3521,
  longitude: 103.8198,
  latitudeDelta: 0.4,
  longitudeDelta: 0.5,
};

export const URL_FOR_FLOOD_ALERTS_API =
  "https://api-open.data.gov.sg/v2/real-time/api/weather/flood-alerts";

export const URL_FOR_WEATHER_FORECAST_API =
  "https://api-open.data.gov.sg/v2/real-time/api/twenty-four-hr-forecast";

// this is an alert expiry lifetime
export const DURATION_FOR_FLOOD_ALERT_MS = 60 * 60 * 1000;
// these are the duration at which the api will be refreshed
export const INTERVAL_FOR_FLOOD_REFRESH_MS = 2 * 60 * 1000;
export const INTERVAL_FOR_WEATHER_REFRESH_MS = 30 * 60 * 1000;

// this is will be set to true only if the testing is done
//  without the location of the device and it will also be 
// used as the production fallback when the permission has 
// been denied or if there is a location failure
export const USE_THIS_LOC_FOR_TESTING = false;

// this is the temp location that will be used for testing the app in SG
export const LOC_FOR_TESTING = {
  latitude: 1.3521,
  longitude: 103.8198,
};

// as the api text can contain many line breaks or repeated spaces, this function 
// is used to replace the whitespace line breaks with one space
export function txtForCleanAlert(value) {
  if (typeof value === "string") {
    return value.replace(/\s+/g, " ").trim();
  }

  return "";
}

// this function is format the SG timing where it will first check if there are any 
// missing or invalid timestamps. and if it is indeed missing, then it will 
// return Not Available.
export function sgTimingFormatting(value) {
  // Missing or invalid timestamps are handled without displaying Invalid Date.
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return date.toLocaleString("en-SG", {
    // these are the locale and time zone that will be kept 
    // consistent across all the user devices
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Singapore",
  });
}

// this function is used to match the weather terms to the forecast of the weather
//  and then return the emoji based on the weather terms
export function gettingIconOfWeather(forecastOfWeather) {
  const description = (forecastOfWeather || "").toLowerCase();

  if (description.includes("thunder")) {
    return "⛈️";
  }

  if (
    description.includes("shower") ||
    description.includes("rain")
  ) {
    return "🌧️";
  }

  if (description.includes("partly cloudy")) {
    return "⛅";
  }

  if (description.includes("cloudy")) {
    return "☁️";
  }

  if (
    description.includes("fair") ||
    description.includes("sunny")
  ) {
    return "☀️";
  }

  if (description.includes("wind")) {
    return "💨";
  }

  return "🌤️";
}

// this function is used to format the range of the weather 
export function formattingRangeOfWeather(
  valueLow,
  valueHigh,
  valueSuffix
) {
  if (
    !Number.isFinite(valueLow) ||
    !Number.isFinite(valueHigh)
  ) {
    return "Not available";
  }

  return `${valueLow}–${valueHigh}${valueSuffix}`;
}
// this is the function used to parse the weather forecast. 
export function weatherForecastParsing(records) {
  // here the latest records is returned by data.gov.sg and 
  // from this, only the most latest ones is displayed
  const recordLatest = records[0];
  const general = recordLatest?.general;

  if (!recordLatest || !general) {
    // here, the general forecast metrics is expected by 
    // the ui and if it is absent, then it will return null
    return null;
  }

  return {
    // the individual missing measurements are managed by 
    // the chaining here and the helper functions are used 
    // to convert it to not available display strings
    weatherForecasr:
      general.forecast?.text || "Forecast unavailable",

    tempValue: formattingRangeOfWeather(
      Number(general.temperature?.low),
      Number(general.temperature?.high),
      "°C"
    ),

    humidValue: formattingRangeOfWeather(
      Number(general.relativeHumidity?.low),
      Number(general.relativeHumidity?.high),
      "%"
    ),

    speedOfWindValue: formattingRangeOfWeather(
      Number(general.wind?.speed?.low),
      Number(general.wind?.speed?.high),
      " km/h"
    ),

    dirOfWindValue:
      general.wind?.direction || "Not available",

    periodThatIsValid:
      general.validPeriod?.text || "Next 24 hours",

    updatedTiming:
      recordLatest.updatedTimestamp ||
      recordLatest.timestamp ||
      null,
  };
}

// this function is used to parse the flood alerts
export function floodAlertsParsing(records) {
  // all the alert readings are parsed first, then the 
  // expired or invalid enteries are discarded. following 
  // this, the events that refer to the same coordinates 
  // and event type are deduplicated
  const now = Date.now();
  const alertsOfFlood = [];
  const usedKeysForAlert = [];

  for (const record of records) {
    // this one api record can contain many readings
    //  where each of it has its own affected area
    let readings = [];

    if (
      record.item &&
      Array.isArray(record.item.readings)
    ) {
      readings = record.item.readings;
    }

    for (
      let indexOfReading = 0;
      indexOfReading < readings.length;
      indexOfReading++
    ) {
      const reading = readings[indexOfReading];
      // here, it will either accept the array or a 
      // array of one element containing the delimited string
      let circleRaw = null;

      if (reading.area) {
        circleRaw = reading.area.circle;
      }

      let valuesOfCircle = [];

      if (Array.isArray(circleRaw)) {
        valuesOfCircle = circleRaw;
      }

      // this circle is expected as latitude, longtitude
      //  and radius in km (kilometres)
      if (
        valuesOfCircle.length === 1 &&
        typeof valuesOfCircle[0] === "string"
      ) {
        // here, it is accepting the spaces or commas so that 
        // these small differences in the formatting do not break it
        valuesOfCircle = valuesOfCircle[0]
          .trim()
          .split(/[\s,]+/);
      }

      const latitude = Number(valuesOfCircle[0]);
      const longitude = Number(valuesOfCircle[1]);
      const radInKm = Number(valuesOfCircle[2]);

      if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude)
      ) {
        // the marker cannot be plotted with having both valid coords
        continue;
      }

      // here, it will first take on the explcit expiry, 
      // if not, it will keep an alert for one hour
      const issuedAt =
        record.datetime || record.updatedTimestamp;

      const timingOfIssues = new Date(issuedAt).getTime();

      let expiresAt =
        timingOfIssues + DURATION_FOR_FLOOD_ALERT_MS;

      if (reading.expires) {
        // when the supplied expiry parses successfully, 
        // then only the fallback will be replaced
        const suppliedExpiry = new Date(
          reading.expires
        ).getTime();

        if (Number.isFinite(suppliedExpiry)) {
          expiresAt = suppliedExpiry;
        }
      }

      if (
        !Number.isFinite(timingOfIssues) ||
        now > expiresAt
      ) {
        // here, the invalid issue times and the expired 
        // notices are excluded from the live date
        continue;
      }

      // the repeated records that produce map markers are 
      // //stopped by these stable keys that are based on the content
      const keyForAlert =
        `${latitude.toFixed(5)}-${longitude.toFixed(5)}-` +
        `${reading.event || "flood"}`;

      if (usedKeysForAlert.includes(keyForAlert)) {
        // here, the repeated feed should only produce one circle 
        // or the details card and not make copies of it
        continue;
      }

      usedKeysForAlert.push(keyForAlert);

      let idForAlert =
        `${record.datetime}-${indexOfReading}-` +
        `${keyForAlert}`;

      let nameOfArea = "Affected area";
      let radius = 100;

      if (record.item && record.item.identifier) {
        // the source identifier is preferred here 
        // over the local id as it it more stable
        idForAlert = record.item.identifier;
      }

      if (reading.area && reading.area.areaDesc) {
        nameOfArea = reading.area.areaDesc;
      }

      if (Number.isFinite(radInKm)) {
        // while the api kilometres is being converted to
        //  metres, the min val is being enforced here
        radius = Math.max(radInKm * 1000, 50);
      }

      let instruction = txtForCleanAlert(
        reading.instruction
      );

      if (!instruction) {
        // when there is a source with no instruction text,
        //  then this instruction will given instead
        instruction =
          "Avoid the affected area and follow official instructions.";
      }

      // here, the radius is being converted to metres as 
      // the react-native-maps expects metres
      alertsOfFlood.push({
        id: idForAlert,
        headline: reading.headline || "Flood Alert",
        decrip: txtForCleanAlert(reading.description),
        instruc: instruction,
        nameOfArea: nameOfArea,
        severity: reading.severity || "Unknown",
        certainty: reading.certainty || "Unknown",
        latitude: latitude,
        longitude: longitude,
        radius: radius,
        issuedAt: issuedAt,
        expiresAt: new Date(expiresAt).toISOString(),
      });
    }
  }

  return alertsOfFlood;
}

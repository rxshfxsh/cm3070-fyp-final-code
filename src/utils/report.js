// this is reference used to understand the location and address objects part: 
// https://docs.expo.dev/versions/latest/sdk/location/

export const MAX_LENGTH_FOR_DESCRIPTION = 1000;
export const MIN_LENGTH_FOR_DESCRIPTION = 10;
export const NO_OF_MAX_REPORTS = 50;

// this function is used to format the date 
// for the report
export function SGDateFormatting(value) {
  // here, the firestore timestamp objects provide 
  // toDate and the locally created values do not
  if (!value) {
    // in the first snapshot, the timestamp of 
    // the server can be temporarily unresolved
    return "Date unavailable";
  }

  let date;

  if (value.toDate) {
    // here, the firestore serverTimestamp is 
    // resolving to a Timestamp with the toDate method
    date = value.toDate();
  } else {
    // then here, the iso strings and date objects 
    // created by the clients can use the normal constructor
    date = new Date(value);
  }

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleString("en-SG", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Singapore",
  });
}

// this function is used to format the coordinates 
// of the location for the report feature
export function coordFormatting(location) {
  // here, both the values are validated before toFixed 
  // is called to avoid the runtime error
  if (!location) {
    return "Coordinates unavailable";
  }

  if (!Number.isFinite(location.latitude)) {
    return "Coordinates unavailable";
  }

  if (!Number.isFinite(location.longitude)) {
    return "Coordinates unavailable";
  }

  // here, the five decimal places are used so that it is 
  // kept readable and also made precise for the local report
  return `${location.latitude.toFixed(
    5
  )}, ${location.longitude.toFixed(5)}`;
}

// this function is used to build the address for the report feature
export function addressBuilding(address) {
  // the address fields that are dependent of the platform
  //  is returned by expo and those that are available are joined
  if (!address) {
    return "";
  }

  const possibleParts = [
    address.name,
    address.street,
    address.district,
    address.city,
    address.region,
    address.postalCode,
  ];

  // here, the repeated names such as the district 
  // and city that has the same name label is avoided
  const parts = [];

  for (const part of possibleParts) {
    if (part && !parts.includes(part)) {
      // here, the missing fields are ignored and 
      // the same place name is also avoided 
      // from being shown twice
      parts.push(part);
    }
  }

  return parts.join(", ");
}

// this function acts as the bounding box to be used as a scope 
// check but it is not a precise boundary of the nation. so the 
// latitude and longtitude is made to fall in the range of 
// singapore's boundary
export function withinSGChecking(location) {
  return (
    location.latitude >= 1.1 &&
    location.latitude <= 1.5 &&
    location.longitude >= 103.5 &&
    location.longitude <= 104.1
  );
}

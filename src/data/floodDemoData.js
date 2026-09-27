// these are the references made:
// https://www.weather.gov.sg/category/news/page/2/
// https://www.straitstimes.com/singapore/public-urged-to-avoid-areas-in-pioneer-jurong-east-due-to-risk-of-flash-floods

// these is the demo flood data that will be used for 
// the live flood map (demo version)
export const FLOOD_DEMO_EVENT = {
  // this is the highest total rainfall that has been 
  // recorded for MSS at Margaret Drive. these data has 
  // been kept in one file so that it will not be mixed 
  // with or be treated as the live data returned by 
  // data.gov.sg accidentally
  date: "19 February 2026",
  rainfall: 148.6,
  rainfallLocation: "Margaret Drive",
  rainfallCoordinate: {
    latitude: 1.2991,
    longitude: 103.8039,
  },
  // these are the 3 affected road sections and times 
  // that has been reported by PUB advisories
  affectedAreas: [
    {
      // the coordinates and the radius here are displayed as 
      // approximations for these road areas and its source 
      // text and time remains visible in the accompanying detail card
      id: "jurong-town-hall-road",
      nameOfArea:
        "Jurong Town Hall Road (Street 11 to Street 12)",
      alertType: "Risk of flash floods",
      issuedAt: "Around 4:00 pm",
      latitude: 1.3296,
      longitude: 103.7428,
      radius: 450,
      instruc:
        "Avoid the affected road and use an alternative route.",
    },
    {
      id: "pandan-road",
      nameOfArea: "Pandan Road",
      alertType: "Risk of flash floods",
      issuedAt: "Around 4:00 pm",
      latitude: 1.3093,
      longitude: 103.7484,
      radius: 450,
      instruc:
        "Avoid the affected road and use an alternative route.",
    },
    {
      id: "dunearn-road",
      nameOfArea:
        "Dunearn Road (Yarwood Avenue to Binjai Park)",
      alertType: "Risk of flash floods",
      issuedAt: "Around 4:50 pm",
      latitude: 1.3378,
      longitude: 103.7865,
      radius: 500,
      instruc:
        "Avoid the affected road and use an alternative route.",
    },
  ],
};

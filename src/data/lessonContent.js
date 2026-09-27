// this is where the lesson content has been derived from too
export const URL_FOR_PUB_SAFETY =
  "https://www.pub.gov.sg/Public/KeyInitiatives/Get-Flood-Wise/Flood-Safety-Tips";

export const CONTENT_OF_LESSONS = {
  // this lesson 1 will develop the early recognition and 
  // decisions to make for the route change. 
  // so with regards to the lesson structure, these lessons 
  // will be rendered by LearningScreen. it will follow the 
  // structure of using one scenario then it will consist of 
  // 4 sections and then a summary page
  lesson1: {
    unitForLesson: "Unit 1",
    noOfTheLesson: "Lesson 1",
    titleForLesson: "Recognising Flood Risk Early",
    subtitleForLesson:
      "Learn to notice changing conditions and make a safer decision before the route becomes dangerous.",
    iconForLesson: "👀",
    scenarioForLesson: {
      // this is the type of realistic scenario that users will be 
      // presented with tgt with the safer decisions that they can make
      titleForLesson: "Leaving the campus after a heavy rain",
      situationForLesson:
        "The shortest path to the MRT passes through a low underpass. Water is collecting quickly, but several people are still heading towards it.",
      decisionForLesson:
        "Do not follow the crowd and assume that route to be safe. Choose a higher ground. Delay the journey if needed and reassess the conditions from a safe place.",
    },
    sectionsForLesson: [
      // these 4 ordered explanations will become pages 2 to 5 in the LearningScreen
      {
        headingForLesson: "How conditions can change",
        contentForLesson:
          "A short period of intense rain can produce more runoff than what the nearby drains can carry. Water may then collect and rise quickly. This could happen especially along lower roads, paths and entrances.",
      },
      {
        headingForLesson:
          "Notice what the environment is showing you",
        contentForLesson:
          "Look for water spreading across a path, a kerb disappearing from your view, road markings becoming difficult to see or a current becoming faster. These observations can indicate that the route is becoming unsafe.",
      },
      {
        headingForLesson: "Make the decision early",
        contentForLesson:
          "Before entering a questionable area, pause and compare your options. Taking a longer route or delaying the journey by waiting in a safe location is always preferable than to become trapped after the water rises.",
      },
      {
        headingForLesson: "Use information carefully",
        contentForLesson:
          "Consider reliable weather and flood advisories together with what you can see around you. Verify unconfirmed messages before sharing them. Never let a message persuade you to ignore visible danger.",
      },
    ],
    keyPointsForLesson: [
      // these are the key points for users to note regarding this lesson
      "Flash flood conditions can develop within a short time.",
      "Visible changes to paths, kerbs and road markings are warning signs.",
      "Change or delay a journey before the safer options disappear.",
      "Check that the information is reliable before acting on it or sharing it.",
    ],
  },

  // lesson 2 is about how predestrians and commuters should behave during the times of floods
  lesson2: {
    unitForLesson: "Unit 1",
    noOfTheLesson: "Lesson 2",
    titleForLesson: "Travelling Safely on Foot",
    subtitleForLesson:
      "Apply safer choices when a walkway, crossing or public transport stop is affected by water.",
    iconForLesson: "🚶",
    scenarioForLesson: {
      titleForLesson: "The flooded route to a bus stop",
      situationForLesson:
        "Murky moving water covers the walkway to your usual bus stop and reaches above your shoe level. Other commuters are stepping into it.",
      decisionForLesson:
        "Turn back and use a different stop or route. Moving water can affect your balance. The murky water can hide the drains, damaged surfaces and changes in ground level.",
    },
    sectionsForLesson: [
      {
        headingForLesson:
          "Following others does not make a route safe",
        contentForLesson:
          "People have different levels of balance, mobility and awareness of the risks. Hence, you need to decide from the condition of the route itself rather than assuming that it is safe because someone else has crossed via that pathway.",
      },
      {
        headingForLesson: "Moving water changes your balance",
        contentForLesson:
          "Even water that appears shallow can push against your legs or make the ground slippery. Do not enter the water if it is flowing rapidly or it is rising a alot. Turn back from it and move towards a higher and drier location.",
      },
      {
        headingForLesson: "Floodwater hides hazards",
        contentForLesson:
          "You may not be able to see an open drain, a pothole, debris or an uneven edge below the cloudy water. Hence, it should not be treated as any other ordinary puddle and should be avoided.",
      },
      {
        headingForLesson: "Adjust the whole journey",
        contentForLesson:
          "A safe decision may mean using another station exit, waiting at a sheltered higher location, selecting a different bus stop or postponing the trip altogether. Do not alight at the location where the surrounding route is visibly flooded.",
      },
    ],
    keyPointsForLesson: [
      "The behaviour of other pedestrians is not a safety measurement.",
      "Avoid moving or rising water and move to a higher location.",
      "Assume murky water may conceal dangerous ground conditions.",
      "Change the journey rather than forcing your way through a flooded route.",
    ],
  },

  // lesson 3 is about the decisions that one should make before, 
  // during and after driving in the floodwaters
  lesson3: {
    unitForLesson: "Unit 1",
    noOfTheLesson: "Lesson 3",
    titleForLesson: "Making Safe Driving Decisions",
    subtitleForLesson:
      "Assess a flooded road, respond to a stalled vehicle and check the vehicle afterwards.",
    iconForLesson: "🚗",
    scenarioForLesson: {
      titleForLesson: "Road markings disappear ahead",
      situationForLesson:
        "You are driving home when water covers the lane markings and the road kerb. A larger vehicle has already crossed this flooded section.",
      decisionForLesson:
        "Do not assume that your vehicle can follow. As the lane markings and the road kerb are already covered by the water, it means that it is difficult to judge the visuals of the road. So choose to turn around and take another safer route.",
    },
    sectionsForLesson: [
      {
        headingForLesson: "Know when not to enter",
        contentForLesson:
          "A submerged kerb or invisible road markings remove the visual reference of the depth and positions. The size of the vehicle also matters, so another driver with a bigger vehicle crossing successfully does not prove that your vehicle can do the same.",
      },
      {
        headingForLesson:
          "If a shallow section is confirmed passable",
        contentForLesson:
          "The safer option is always to avoid floodwater. However, if there are no alternative safer routes, make sure that the current section is confirmed to be shallow and passable. Then, slowly proceed with one vehicle at a time and maintain it at a slow and steady spped without abruptly braking or accelerating.",
      },
      {
        headingForLesson: "Respond to a stalled vehicle",
        contentForLesson:
          "If rising water causes the engine to stall, do not repeatedly attempt to restart it. Instead, use the hazard lights, then request for assistance and move to a safer, higher location where you can exit through without entering the dangerous water.",
      },
      {
        headingForLesson:
          "Check the vehicle before continuing",
        contentForLesson:
          "Water can reduce the effectiveness of braking. Hence, after leaving the shallow flooded section, apply the brakes gently in a safe area. Then confirm that they respond normally before returning to the ordinary traffic speed.",
      },
    ],
    keyPointsForLesson: [
      "Turn around when water hides the kerb or road markings.",
      "Another vehicle crossing does not prove that your vehicle can cross.",
      "Do not repeatedly restart a vehicle stalled by rising water.",
      "Test wet brakes gently before resuming normal driving.",
    ],
  },

  // lesson 4 is about the preparing to protect the property 
  // and also about electrical safety
  lesson4: {
    unitForLesson: "Unit 1",
    noOfTheLesson: "Lesson 4",
    titleForLesson: "Protecting Homes & Workplaces",
    subtitleForLesson:
      "Plan before heavy rain, reduce property damage and avoid electrical hazards.",
    iconForLesson: "🏠",
    scenarioForLesson: {
      titleForLesson: "Water enters a small shop",
      situationForLesson:
        "Water has reached the storeroom floor near a refrigerator. The appliance is still connected to the power socket and an important stock box remains nearby.",
      decisionForLesson:
        "While the area is wet, keep people away from it and do not touch the appliance or switch. Personal safety comes before retrieving the  stock. Leave immediately if the conditions continue to worsen.",
    },
    sectionsForLesson: [
      {
        headingForLesson: "Prepare before the rain",
        contentForLesson:
          "Identify the lowest entrances and storage areas in the property. Keep private drains clear, inspect any flood barriers and make sure household members or employees know where protective equipment is stored.",
      },
      {
        headingForLesson: "Protect important items early",
        contentForLesson:
          "Move the important items such as the medication, documents, electronics and essential stock above floor level before water enters. The barrier and lifting of the items to a safer place should be done early and not after the route gets flooded.",
      },
      {
        headingForLesson:
          "Treat electricity as a separate danger",
        contentForLesson:
          "Water near electrical equipment may create a shock hazard. Therefore, do not touch a switch, cable or appliance while it is wet or stand on a damp or flooded surface.",
      },
      {
        headingForLesson: "Put people before property",
        contentForLesson:
          "If evacuation is required, account for everyone present and exit through the dry, safe route. Switch off the main supply and disconnect the appliances only when the controls can be reached without any contact with water. If not, leave them alone and evacuate.",
      },
    ],
    keyPointsForLesson: [
      "Prepare drains, barriers and storage areas before heavy rain.",
      "Raise essential items before water enters the property.",
      "Never handle electrical equipment from a wet surface.",
      "Protect and evacuate people before attempting to save belongings.",
    ],
  },
};

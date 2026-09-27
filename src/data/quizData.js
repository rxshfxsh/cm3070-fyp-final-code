// this is the reference used for the creation of this quiz of the lesson content:
// https://www.pub.gov.sg/Public/KeyInitiatives/Get-Flood-Wise/Flood-Safety-Tips

// this ID is stored in the quizRewards so that the challange can grant 
// points only once even when the learner repeats it
export const ID_FOR_QUIZ = "flashFloodDecisionChallenge1";

// Each object provides a topic, prompt, choices and the exact correct choice.
export const qnsForQuiz = [
  {
    // the correct ans for each of these questions is stored in the matching 
    // option sring respectively. this will make the comparison of the 
    // QuizScreen explicit and easy to audit
    typeOfMod: "Recognising Risk",
    typeOfQn:
      "After an intense rain, the water is gathering quickly in a low underpass on your route. What is the safest choice?",
    typeOfOptions: [
      "Use a higher alternative route or delay the journey",
      "Follow the crowd through the underpass",
      "Wait at the lowest point to see if the water rises",
    ],
    typeOfAns:
      "Use a higher alternative route or delay the journey",
  },
  {
    typeOfMod: "Recognising Risk",
    typeOfQn:
      "Which observation suggests that a road is becoming difficult to assess safely?",
    typeOfOptions: [
      "The kerb and road markings are disappearing under water",
      "The headlights of the vehicles are switched on",
      "The rain has become quieter",
    ],
    typeOfAns:
      "The kerb and road markings are disappearing under water",
  },
  {
    typeOfMod: "Recognising Risk",
    typeOfQn:
      "A friend sends an unverified message claiming that the nearby road is safe. What should you do?",
    typeOfOptions: [
      "Verify it using reliable information and visible conditions",
      "Immediately forward it to everyone",
      "Just ignore the visible flooding at the nearby road and go through it as the message says it is safe.",
    ],
    typeOfAns:
      "Verify it using reliable information and visible conditions",
  },
  {
    typeOfMod: "Travelling on Foot",
    typeOfQn:
      "Several commuters are crossing a flooded walkway. What does their behaviour tell you?",
    typeOfOptions: [
      "It does not prove that the walkway is safe",
      "The route must be safe for everyone",
      "The water cannot contain any hidden hazards",
    ],
    typeOfAns:
      "It does not prove that the walkway is safe",
  },
  {
    typeOfMod: "Travelling on Foot",
    typeOfQn:
      "Murky moving water covers the path to your usual bus stop. What should you do?",
    typeOfOptions: [
      "Use another route or wait in a higher, dry location",
      "Enter the water because the bus might arrive soon",
      "Remove your shoes and continue walking through it",
    ],
    typeOfAns:
      "Use another route or wait in a higher, dry location",
  },
  {
    typeOfMod: "Travelling on Foot",
    typeOfQn:
      "Why is a flooded walkway difficult to judge by sight alone?",
    typeOfOptions: [
      "Water may hide drains, debris and uneven ground",
      "Floodwater always makes the ground appear flatter",
      "Clear water always guarantees that the surface is safe",
    ],
    typeOfAns:
      "Water may hide drains, debris and uneven ground",
  },
  {
    typeOfMod: "Driving Decisions",
    typeOfQn:
      "A larger vehicle crosses the flooded road successfully. What should you conclude about your own car?",
    typeOfOptions: [
      "Its success does not prove that your car can cross safely",
      "All vehicles can now use the same road",
      "Following the larger vehicle immediately behind will remove the risk",
    ],
    typeOfAns:
      "Its success does not prove that your car can cross safely",
  },
  {
    typeOfMod: "Driving Decisions",
    typeOfQn:
      "Your vehicle stalls while water is rising around it. What is the safer response?",
    typeOfOptions: [
      "Use the hazard lights, seek help and move higher when safe",
      "Keep restarting the engine until it works again",
      "Remain there at the same place without informing anyone",
    ],
    typeOfAns:
      "Use the hazard lights, seek help and move higher when safe",
  },
  {
    typeOfMod: "Driving Decisions",
    typeOfQn:
      "After leaving a shallow flooded section, what should you check before returning to normal speed?",
    typeOfOptions: [
      "Gently test that the brakes respond normally",
      "Check that the radio still works",
      "Accelerate immediately to dry the tyres",
    ],
    typeOfAns:
      "Gently test that the brakes respond normally",
  },
  {
    typeOfMod: "Homes & Workplaces",
    typeOfQn:
      "Which action is the most useful before a period of heavy rain?",
    typeOfOptions: [
      "Clear private drains, check barriers and raise essential items",
      "Wait until the water enters before locating the protective equipment",
      "Store all the important documents directly on the floor",
    ],
    typeOfAns:
      "Clear private drains, check barriers and raise essential items",
  },
  {
    typeOfMod: "Homes & Workplaces",
    typeOfQn:
      "Water has reached the floor around a connected appliance. What should you do?",
    typeOfOptions: [
      "Keep away and do not touch the appliance or switch",
      "Unplug it while standing on the wet floor",
      "Switch it on to check whether it is still working",
    ],
    typeOfAns:
      "Keep away and do not touch the appliance or switch",
  },
  {
    typeOfMod: "Homes & Workplaces",
    typeOfQn:
      "During an evacuation, which priority should guide your decision?",
    typeOfOptions: [
      "Move people through a safe exit before trying to save property",
      "Recover every valuable item before leaving the flooded area",
      "Cross through the deeper water if it shortens the evacuation route",
    ],
    typeOfAns:
      "Move people through a safe exit before trying to save property",
  },
];

// this is to ensure that the user answers at least 70% 
// correctly in order to pass
export const SCORE_TO_PASS_QUIZ = Math.ceil(
  qnsForQuiz.length * 0.7
);

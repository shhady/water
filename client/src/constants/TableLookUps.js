export default (word) => {
  //get the lang out of attribute as has been set in the constants/index.js file
  let lang = document.getElementsByTagName("html")[0].getAttribute("lang");

  const lookUps = {
    he: {
      triggers: "טריגרים",
      "Config Conditions": "תנאי הגדרות ",
      city: "עיר",
      street: "רחוב ",
      number: "מספר",
      latitude: "קו רוחב",
      longitude: "קו אורך",
      createdAt: "נוצר בתאריך",
      updatedAt: "עודכן בתאריך",
      IdentifierID: "זיהוי",
      trigger: "טריגר",
      meaning: "טריגר ",
      number: "מספר",
      system: "מערכת",
      status: "מעמד",
      createdAt: "נוצר בתאריך",
      updatedAt: "עודכן בתאריך",
      additionalIdentifier: "זיהוי נוסף",
      status: "מצב",
      "config Condition ID": "מזהה תנאי הגדרות",
      systemId: "systemId",
      previousSystemId: "מזהה המערכת הקודמת",
      type: "סוג",
      triggerName: "שם הטריגר",
      valueType: "סוג הערך",
      measuredValue: "ערך מודד",
      Level: "רמה",
      Identifiers: "מזהים",
    },
    en: {
      Identifiers: "Identifiers",
      triggers: "Triggers",
      "Config Conditions": "Config Conditions",
      Level: "Level",
      valueType: "value Type",
      measuredValue: "Measured Value",
      triggerName: "triggerName",
      type: "type",
      previousSystemId: "Previous System Id",
      systemId: "System ID",
      "config Condition ID": "config Condition ID",
      status: "Status",
      city: "City",
      street: "Street",
      number: "Number",
      latitude: "Latitude",
      longitude: "Longitude",
      createdAt: "Created",
      updatedAt: "Updated",
      IdentifierID: "Identifier ID",
      additionalIdentifier: "Additional Identifier",
      trigger: "Trigger",
      meaning: "Meaning",
      number: "Number(Sensor)",
      system: "System",
      status: "Status",
      createdAt: "Created",
      updatedAt: "Updated",
    },
  };
  ////if set lang is not supported do back to english///
  if (!lookUps[lang]) lang = "en";
  if (!lookUps[lang][word]) {
    return "translation error";
  }
  return lookUps[lang][word];
};

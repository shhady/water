import ConfigCondition from "../models/configCondition.Model.js";
import Identifier from "../models/Identifiers.Model.js";
import Trigger from "../models/Trigger.Model.js";

// Get all config conditions
const getConfigConditions = async (req, res) => {
  try {
    const configConditions = await ConfigCondition.find();
    res.json(configConditions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch config conditions" });
  }
};

// Get config condition by ID
const getConfigConditionById = async (req, res) => {
  try {
    const { id } = req.params;
    const configCondition = await ConfigCondition.findById(id);

    if (!configCondition) {
      return res.status(404).json({ error: "Config condition not found" });
    }

    res.json(configCondition);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch config condition" });
  }
};

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function checkPH() {
  const numberLevel = Math.floor(Math.random() * 14);
  if (7 == numberLevel) {
    return [numberLevel, "normal"];
  }
  if (0 <= numberLevel < 7) {
    return [numberLevel, "low"];
  }
  return [numberLevel, "hight"];
}
function checkML() {
  const numberLevel = Math.floor(Math.random() * 3000);
  if (numberLevel >= 300 && numberLevel <= 800) {
    return [numberLevel, "too drink and worthy of irrigation"];
  } else if (numberLevel >= 0 && numberLevel <= 800) {
    return [numberLevel, "normal"];
  } else if (numberLevel >= 300 && numberLevel <= 2000) {
    return [numberLevel, "worthy of irrigation"];
  }

  return [numberLevel, "not apply"];
}
const generateConfigConditions = async (req, res) => {
  try {
    const numberLimit = req.body.numberLimit;
    let documents = await Identifier.find({}, "_id");
    const identifierElementIds = documents.map((doc) => doc._id.toString());
    documents = await Trigger.find({}, "_id");
    const triggersElementIds = documents.map((doc) => doc._id.toString());

    const triggerNames = [
      "conductivity",
      "opacity",
      "acidity",
      "chlorine",
      "Permissions",
      "blackmail",
      "spam",
      "fishing",
      "DoS",
      "virus",
    ];

    for (let i = 0; i < numberLimit; ++i) {
      const autoGenerator = Math.random() < 0.5;
      const systemId = getRandom(triggersElementIds);
      const previousSystemId = getRandom(identifierElementIds);
      let trigger = Math.floor(Math.random() * triggerNames.length);
      const typeOFTriggers = {
        cyber: ["Permissions", "blackmail", "spam", "fishing", "DoS", "virus"],
        WaterQuality: ["conductivity", "opacity", "acidity", "chlorine"],
      };
      const triggerName = triggerNames[trigger];
      const type = Object.keys(typeOFTriggers).find((key) =>
        typeOFTriggers[key].includes(triggerName)
      );
      let level = "";
      let measuredValue = "";
      let valueType = "";
      let res = [];
      trigger += 1;
      switch (triggerName) {
        case "chlorine":
          res = checkML();
          measuredValue = res[0];
          valueType = res[1];
          level = "mlg";
          break;
        case "acidity":
          res = checkPH();
          measuredValue = res[0];
          valueType = res[1];
          level = "ph";
          break;
        default:
          break;
      }
      await ConfigCondition.create({
        autoGenerator,
        systemId,
        previousSystemId,
        trigger,
        type,
        triggerName,
        measuredValue,
        valueType,
        level,
      });
    }
    res.status(200).send("DONE");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

// Create a new config condition
const createConfigCondition = async (req, res) => {
  try {
    const configConditionData = req.body;
    const configCondition = await ConfigCondition.create(configConditionData);
    res.status(201).json(configCondition);
  } catch (error) {
    res.status(500).json({ error: "Failed to create config condition" });
  }
};

// Update config condition by ID
const updateConfigCondition = async (req, res) => {
  try {
    const { id } = req.params;
    const configConditionData = req.body;
    const configCondition = await ConfigCondition.findByIdAndUpdate(
      id,
      configConditionData,
      { new: true }
    );

    if (!configCondition) {
      return res.status(404).json({ error: "Config condition not found" });
    }

    res.json(configCondition);
  } catch (error) {
    res.status(500).json({ error: "Failed to update config condition" });
  }
};

// Delete config condition by ID
const deleteConfigCondition = async (req, res) => {
  try {
    const { id } = req.params;
    const configCondition = await ConfigCondition.findByIdAndDelete(id);

    if (!configCondition) {
      return res.status(404).json({ error: "Config condition not found" });
    }

    res.json({ message: "Config condition deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete config condition" });
  }
};

export {
  getConfigConditions,
  getConfigConditionById,
  createConfigCondition,
  updateConfigCondition,
  deleteConfigCondition,
  generateConfigConditions,
};

/**
 * 
 * {
    "types": [
        "Hydrants", "Cyber", "Water quality"
    ],
    "triggerNames": [
        "reverse flow", "water flow", "vandalism", "update", "life line", "battery",
        "water pressure", "chlorine", "chlorine", "acidity", "acidity", "acidity", "virus", "blackmail" 
    ],
    "valueFlucts": [
        [0,0],
        [0,0],
        [0,0],
        [0,0],
        [0,0],
        [0,0],
        [0,0],
        [0, 300],
        [300, 2000],
        [0,7],
        [7,7],
        [7,14],
        [0,0],
        [0,0]
    ],
    "stati": [
            "","","","","","","",
            "in order", "for irregation", "too low", "in order", "too high", "under attack",
            "under attack"
    ],
    "valueTypes": [
        "","","","","","","",
        "mgL", "mgl", "pH", "pH", "pH", "", ""
    ],
    "numberLimit": 20
}
 * 
 * 
 * 
 */

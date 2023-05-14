import Identifier from "../models/Identifiers.Model.js";

// Get all identifiers
const getIdentifiers = async (req, res) => {
  try {
    const identifiers = await Identifier.find();
    res.json(identifiers);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single identifier by ID
const getIdentifierById = async (req, res) => {
  const { id } = req.params;
  try {
    const identifier = await Identifier.findById(id);
    if (!identifier) {
      return res.status(404).json({ message: "Identifier not found" });
    }
    res.json(identifier);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

function createUniqueString(additionalIdentifier) {
  const date = new Date();
  const dateString = date.toISOString().slice(0, 19).replace(/[-:]/g, "");
  return `${dateString}-${additionalIdentifier}-${Math.random().toString(36).slice(2)}`;
}

function getRandomIndex(array) {
  return array[Math.floor(Math.random() * array.length)];
}
const generateIdentifiers = async (req, res) => {
  try {
    let cities = req.body.cities;
    let streets = req.body.streets;
    let numbers = req.body.numbers;
    let stati = req.body.stati;
    const numberLimit = req.body.numberLimit;

    for (let i = 0; i < numberLimit; i++) {
      const additionalIdentifier = createUniqueString("");
      const number = getRandomIndex(numbers);
      const city = getRandomIndex(cities);
      const street = getRandomIndex(streets);
      const status = getRandomIndex(stati);
      const latitude = Math.random()*1000;
      const longitude = Math.random()*1000;
      await Identifier.create({ additionalIdentifier, number, city, street,status,latitude,longitude });
    }

    res.status(200).send("Identifiers generated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};



// Create a new identifier
const createIdentifier = async (req, res) => {
  const {
    identifierId,
    additionalIdentifier,
    status,
    city,
    street,
    number,
    latitude,
    longitude,
  } = req.body;
  try {
    const newIdentifier = await Identifier.create({
      identifierId,
      additionalIdentifier,
      status,
      city,
      street,
      number,
      latitude,
      longitude,
    });
    res.status(201).json(newIdentifier);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an existing identifier by ID
const updateIdentifier = async (req, res) => {
  const { id } = req.params;
  const {
    identifierId,
    additionalIdentifier,
    status,
    city,
    street,
    number,
    latitude,
    longitude,
  } = req.body;
  try {
    const updatedIdentifier = await Identifier.findByIdAndUpdate(
      id,
      {
        identifierId,
        additionalIdentifier,
        status,
        city,
        street,
        number,
        latitude,
        longitude,
      },
      { new: true }
    );
    if (!updatedIdentifier) {
      return res.status(404).json({ message: "Identifier not found" });
    }
    res.json(updatedIdentifier);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an identifier by ID
const deleteIdentifier = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedIdentifier = await Identifier.findByIdAndDelete(id);
    if (!deletedIdentifier) {
      return res.status(404).json({ message: "Identifier not found" });
    }
    res.json({ message: "Identifier deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getIdentifiers,
  createIdentifier,
  getIdentifierById,
  updateIdentifier,
  deleteIdentifier,
  generateIdentifiers
};
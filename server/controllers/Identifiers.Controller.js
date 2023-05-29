import Identifier from "../models/Identifiers.Model.js";
import mongoose from "mongoose";

// to create Unique text use it in additionalIdentifier
function createUniqueString(additionalIdentifier) {
  const date = new Date();
  const dateString = date.toISOString().slice(0, 19).replace(/[-:]/g, "");
  return `${dateString}-${additionalIdentifier}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

//to get random index in array
function getRandomIndex(array) {
  return array[Math.floor(Math.random() * array.length)];
}

//use to generate fake data
const generateIdentifiers = async (req, res) => {
  try {
    let cities = req.body.cities;
    let streets = req.body.streets;
    let numbers = req.body.numbers;
    const numberLimit = req.body.numberLimit;

    const statusArray = ["new", "in progress", "postponed", "canceled"];
    for (let i = 0; i < numberLimit; i++) {
      const additionalIdentifier = createUniqueString("");
      const number = getRandomIndex(numbers);
      const city = getRandomIndex(cities);
      const street = getRandomIndex(streets);
      const latitude = Math.random() * 1000;
      const longitude = Math.random() * 1000;
      const index = Math.floor(Math.random() * statusArray.length);
      const status = statusArray[index];
      await Identifier.create({
        additionalIdentifier,
        status,
        city,
        street,
        number,
        latitude,
        longitude,
      });
    }

    res.status(200).send("Identifiers generated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get all identifiers
const getIdentifiers = async (req, res) => {
  try {
    const identifiers = await Identifier.find().populate("sensor");
    res.json(identifiers);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single identifier by ID
const getIdentifierById = async (req, res) => {
  const { id } = req.params;
  try {
    const identifier = await Identifier.findById(id).populate("sensor");
    if (!identifier) {
      return res.status(404).json({ message: "Identifier not found" });
    }
    res.json(identifier);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new identifier
const createIdentifier = async (req, res) => {
  const {
    sensor,
    status,
    city,
    street,
    number,
    latitude,
    longitude,
    additionalIdentifier,
  } = req.body;
  try {
    const newIdentifier = await Identifier.create({
      sensor,
      status,
      city,
      street,
      number,
      latitude,
      longitude,
      additionalIdentifier,
    });
    res.status(201).json(newIdentifier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing identifier by ID
const updateIdentifier = async (req, res) => {
  const { id } = req.params;
  const { sensor, status, city, street, number, latitude, longitude } =
    req.body;
  try {
    const updatedIdentifier = await Identifier.findByIdAndUpdate(
      id,
      {
        sensor,
        status,
        city,
        street,
        number,
        latitude,
        longitude,
      },
      { new: true }
    ).populate("sensor");
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
    const deletedIdentifier = await Identifier.findByIdAndDelete(id).populate(
      "sensor"
    );
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
  generateIdentifiers,
};

require("dotenv").config();
const mongoose = require("mongoose");

const User = require("./schema/UserSchema");
const Patient = require("./schema/patientSchema");
const Doctor = require("./schema/doctorSchema");
const Appointment = require("./schema/appointmentSchema");
const MedicalRecord = require("./schema/medicalInfoSchema");
const testRecord = require("./schema/testSchema");
const medicationRecord = require("./schema/medicationSchema");

const models = [
  User,
  Patient,
  Doctor,
  Appointment,
  MedicalRecord,
    testRecord,
    medicationRecord
];

async function createCollections() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    for (const model of models) {
      const exists = await mongoose.connection.db
        .listCollections({ name: model.collection.name })
        .hasNext();

      if (!exists) {
        await model.createCollection();
        console.log(`Created: ${model.collection.name}`);
      } else {
        console.log(`Already exists: ${model.collection.name}`);
      }
    }

    console.log("All collections processed.");
  } catch (error) {
    console.error("Collection creation failed:", error);
  } finally {
    await mongoose.disconnect();
  }
}

module.exports = createCollections;
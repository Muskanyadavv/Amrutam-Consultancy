const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // added
  password: { type: String, required: true }, // added (hashed in controller)
  specialty: { type: String, required: true },
  experience: { type: Number, required: true },
  college: { type: String },
  bio: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Doctor", doctorSchema);

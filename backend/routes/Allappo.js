const express= require("express");
const  Appointment= require("../models/Appointments.js"); // assuming you have an Appointment model

const router = express.Router();

// ✅ Get all appointments (booked + cancelled)
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId", "name email") // show patient info
      .populate("doctorId", "name email") // show doctor info
      .populate("slotId") // show slot timing
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports= router;

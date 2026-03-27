// routes/availability.js
const express = require("express");
const Availability = require("../models/availability");
const Appointment = require("../models/appointment");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Doctor generates slots
router.post("/generate", protect(["doctor"]), async (req, res) => {
  try {
    const { date, startHour, endHour, slotDuration } = req.body;
    const doctorId = req.user.id;

    const startTime = new Date(date);
    startTime.setHours(startHour, 0, 0, 0);

    const endTime = new Date(date);
    endTime.setHours(endHour, 0, 0, 0);

    const slots = [];
    let current = new Date(startTime);

    while (current < endTime) {
      const slotEnd = new Date(current.getTime() + slotDuration * 60000);
      slots.push({
        doctorId,
        date: new Date(date),
        startAt: new Date(current),
        endAt: slotEnd,
      });
      current = slotEnd;
    }

    await Availability.insertMany(slots);
    res.json({ message: "Slots generated", slots });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get available slots for a doctor
router.get("/:doctorId", async (req, res) => {
  try {
    const slots = await Availability.find({
      doctorId: req.params.doctorId,
      booked: false,
      startAt: { $gte: new Date() },
    }).sort({ startAt: 1 });

    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// User books a slot
router.post("/book", protect(["user"]), async (req, res) => {
  try {
    const { slotId } = req.body;
    const userId = req.user.id;

    const slot = await Availability.findOne({ _id: slotId, booked: false });
    if (!slot) return res.status(400).json({ error: "Slot unavailable" });

    // Lock slot
    slot.booked = true;
    await slot.save();

    // Create appointment
    const appointment = await Appointment.create({
      doctorId: slot.doctorId,
      patientId: userId,
      slotId: slot._id,
      status: "Booked",
    });

    res.json({ message: "Slot booked", appointment });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Doctor gets upcoming appointments
router.get("/doctor/upcoming", protect(["doctor"]), async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.user.id,
      status: "Booked",
    })
      .populate("patientId", "name email")
      .populate("slotId");

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;


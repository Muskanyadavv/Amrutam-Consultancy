import express from "express";
import Availability from "../models/availability.js";

const router = express.Router();

router.get("/:doctorId", async (req, res) => {
  try {
    const slots = await Availability.find({ doctorId: req.params.doctorId, isBooked: false })
      .sort({ startAt: 1 });
    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: "Error fetching slots" });
  }
});

export default router;

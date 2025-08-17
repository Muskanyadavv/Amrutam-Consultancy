import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  startAt: { type: Date, required: true },
   date: { type: Date, required: true },
  endAt: { type: Date, required: true },
  isBooked: { type: Boolean, default: false }
});

export default mongoose.models.Availability || mongoose.model("Availability", availabilitySchema);

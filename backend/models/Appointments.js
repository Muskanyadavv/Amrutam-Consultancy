const  mongoose= require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: "Availability", required: true },
  status: { type: String, enum: ["booked", "cancelled"], default: "booked" },
  createdAt: { type: Date, default: Date.now }
});
module.exports =mongoose.model("Appointment", appointmentSchema);

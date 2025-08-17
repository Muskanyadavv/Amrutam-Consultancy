const express = require("express");
const bcrypt = require("bcrypt");
const Doctor = require("../models/Doctors");
const router = express.Router();
const jwt= require("jsonwebtoken");

// In doctorRoutes.js
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select("-password");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get all doctors
router.get("/", async (req, res) => {
  try {
    console.log("Fetching all doctors...");
    const doctors = await Doctor.find().select("-password").sort({createdAt: -1}); // Don't send passwords
    console.log(`Found ${doctors.length} doctors`);
    res.json(doctors);
  } catch (error) {
    console.error("Get doctors error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Register new doctor
router.post("/", async (req, res) => {
  console.log("=== Doctor Registration Request ===");
  console.log("Request body:", { ...req.body, password: "[HIDDEN]" });
  
  const { name, email, password, specialty, experience, college, bio } = req.body;

  // Validation
  if (!name || !email || !password || !specialty || experience === undefined || experience === null) {
    console.log("❌ Validation failed: Missing required fields");
    console.log("Received:", { name: !!name, email: !!email, password: !!password, specialty: !!specialty, experience });
    return res.status(400).json({ 
      message: "Missing required fields: name, email, password, specialty, and experience are required",
      received: {
        name: !!name,
        email: !!email,
        password: !!password,
        specialty: !!specialty,
        experience: experience !== undefined && experience !== null
      }
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log("❌ Invalid email format:", email);
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Validate password length
  if (password.length < 6) {
    console.log("❌ Password too short");
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  // Validate experience
  const experienceNum = parseInt(experience);
  if (isNaN(experienceNum) || experienceNum < 0 || experienceNum > 50) {
    console.log("❌ Invalid experience value:", experience);
    return res.status(400).json({ message: "Experience must be a number between 0 and 50 years" });
  }

  try {
    // Check if email already exists
    console.log("🔍 Checking if email exists:", email.toLowerCase());
    const existingDoctor = await Doctor.findOne({ email: email.toLowerCase() });
    if (existingDoctor) {
      console.log("❌ Email already exists:", email);
      return res.status(400).json({ message: "Email already registered" });
    }

    console.log("🔐 Hashing password...");
    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("✅ Password hashed successfully");

    // Create new doctor object
    const doctorData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      specialty: specialty.trim(),
      experience: experienceNum,
      college: college ? college.trim() : "",
      bio: bio ? bio.trim() : ""
    };

    console.log("💾 Creating new doctor:", { ...doctorData, password: "[HIDDEN]" });
    
    const newDoctor = new Doctor(doctorData);
    const savedDoctor = await newDoctor.save();
    
    console.log("✅ Doctor saved successfully with ID:", savedDoctor._id);

    // Return success (without password)
    const doctorResponse = savedDoctor.toObject();
    delete doctorResponse.password;

    res.status(201).json({ 
      message: "Doctor registered successfully!", 
      doctor: doctorResponse 
    });

  } catch (error) {
    console.error("❌ Doctor registration error:", error);
    
    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      console.log("Validation errors:", validationErrors);
      return res.status(400).json({ 
        message: "Validation error", 
        errors: validationErrors 
      });
    }
    
    if (error.code === 11000) {
      console.log("Duplicate key error - email already exists");
      return res.status(400).json({ message: "Email already registered" });
    }
    
    res.status(500).json({ 
      message: "Internal server error", 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
});

// Get doctor by ID
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select("-password");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    console.error("Get doctor by ID error:", error);
    res.status(500).json({ message: error.message });
  }
});
// Doctor login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const doctor = await Doctor.findOne({ email: email.toLowerCase() });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: doctor._id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "15m" }
    );

    res.json({
      token,
      user: {
        id: doctor._id,
        email: doctor.email,
        name: doctor.name,
        role: "doctor",
      },
    });
  } catch (error) {
    console.error("Doctor login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;

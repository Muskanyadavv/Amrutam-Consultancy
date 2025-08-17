const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User= require("../models/User.js");
const Doctor = require("../models/Doctors.js");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  });
};

const login = async (req, res) => {
  try {
    const { email, password,role } = req.body;
if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
 let account;

    //email = email.trim().toLowerCase();
 if (role === "doctor") {
      account = await Doctor.findOne({ email: email.toLowerCase() });
    } else {
      account = await User.findOne({ email: email.toLowerCase() });
    }

    // let account = await User.findOne({ email });
    // let role = "patient";

    // if (!account) {
    //   account = await Doctor.findOne({ email });
    //   if (account) role = "doctor";
    // }

    if (!account) {
      return res.status(404).json({ message: `${role} not found`  });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(account._id, role);

    res.json({
      token,
      user: {
        id: account._id,
        email: account.email,
        name: account.name,
        role: role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = login;


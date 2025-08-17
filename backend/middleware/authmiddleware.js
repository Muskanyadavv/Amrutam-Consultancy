// middleware/auth.js
const jwt = require("jsonwebtoken");

exports.protect = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Role check
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Not authorized" });
      }

      req.user = decoded; // { id, role, ... }
      next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
  };
};


//only users
router.get("/profile", protect(), (req, res) => {
  res.json({ message: `Hello ${req.user.role}`, userId: req.user.id });
});

// Only doctors
router.get("/doctor/slots", protect(["doctor"]), (req, res) => {
  res.json({ message: `Doctor ${req.user.id} - here are your slots` });
});


// export const doctorOnly = (req, res, next) => {
//   if (req.user.role !== "doctor") {
//     return res.status(403).json({ message: "Access denied: Doctors only" });
//   }
//   next();
//};

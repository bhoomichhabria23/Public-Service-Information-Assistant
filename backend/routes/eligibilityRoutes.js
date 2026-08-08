const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Eligibility = require("../models/Eligibility");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      schemeId,
      schemeName,
      userDetails,
      evaluation,
    } = req.body;

    if (typeof schemeId !== "number" || !schemeName || !userDetails || !evaluation) {
      return res.status(400).json({ message: "Missing required eligibility data." });
    }

    let submittedBy;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (user) {
          submittedBy = user._id;
        }
      } catch (err) {
      }
    }

    const eligibilityEntry = await Eligibility.create({
      schemeId,
      schemeName,
      userDetails,
      evaluation,
      submittedBy,
    });

    res.status(201).json({ message: "Eligibility data saved.", data: eligibilityEntry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const mongoose = require("mongoose");

const eligibilitySchema = new mongoose.Schema(
  {
    schemeId: {
      type: Number,
      required: true,
    },
    schemeName: {
      type: String,
      required: true,
    },
    userDetails: {
      fullName: String,
      age: Number,
      gender: String,
      candidateCategory: String,
      annualIncome: Number,
      maritalStatus: String,
      occupation: String,
      state: String,
      familyMembers: Number,
      existingBenefits: String,
    },
    evaluation: {
      eligible: Boolean,
      title: String,
      summary: String,
      reasons: [String],
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Eligibility", eligibilitySchema);

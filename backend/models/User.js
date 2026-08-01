const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

    state: {
      type: String,
    },

    savedSchemes: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
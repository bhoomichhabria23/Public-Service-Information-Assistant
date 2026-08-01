const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config.js/db");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
<<<<<<< HEAD
const contactRoutes = require("./routes/contactRoutes");
// console.log(contactRoutes);
=======
const eligibilityRoutes = require("./routes/eligibilityRoutes");

>>>>>>> 4d36773 (my part done)
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("API is running");
});

app.use("/api/auth", authRoutes);
<<<<<<< HEAD
app.use("/api/contact", contactRoutes);
=======
app.use("/api/eligibility", eligibilityRoutes);
>>>>>>> 4d36773 (my part done)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
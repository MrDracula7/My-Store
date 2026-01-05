const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors({
  origin: "https://mrdracula7.github.io",
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

const otpRoutes = require("./routes/otpRoutes");
app.use("/api/otp", otpRoutes);

app.use("/uploads", express.static("uploads"));



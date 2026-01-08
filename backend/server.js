const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const otpRoutes = require("./routes/otpRoutes");
const adminProductRoutes = require("./routes/adminProductRoutes");

const app = express();

app.use(cors({
  origin: "https://mrdracula7.github.io",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);

app.use("/api/admin", require("./routes/admin"));
app.post("/api/admin/login", require("./controllers/adminAuth").adminLogin);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);
app.use("/api/admin/products", adminProductRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));














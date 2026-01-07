const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

mongoose.connect("mongodb+srv://mystore:ol6zRPf6IZeO8ntp@cluster0.sshwz0c.mongodb.net/mystoredb?retryWrites=true&w=majority&authSource=admin");

(async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await Admin.create({
    email: "mrdracula534@gmail.com",
    password: $2b$10$iAfAZenFQF8UBCV2nIBzXe3dFzALCpXZkzdkESfKpmQJPLI0dcuWu,
    role: "admin"
  });

  console.log("Admin created");
  process.exit();
})();

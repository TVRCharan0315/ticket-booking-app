const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const indexRoutes = require("./src/routes/index");
const bookingRoutes = require("./src/routes/bookings");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src/views")));

app.use("/", indexRoutes);
app.use("/bookings", bookingRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Ticket Booking App running on http://localhost:${PORT}`);
});

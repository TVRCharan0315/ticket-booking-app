const Booking = require("../models/bookingModel");

exports.createBooking = (req, res) => {
  const { name, event, tickets } = req.body;
  const newBooking = new Booking(name, event, tickets);
  console.log("🎫 New booking received:", newBooking);

  res.sendFile(require("path").join(__dirname, "../views/success.html"));
};

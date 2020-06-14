// All Requires
const mongoose = require("mongoose");

// Extracting The Schema From The Mongoose
const schema = mongoose.Schema;

// Creating The Schema For Students
const requestSchema = new schema(
  {
    userId: [{ type: schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// Making The Model Of The Schema
const Request = mongoose.model("Request", requestSchema);

// Exporting The Model Of The Schema
module.exports = Request;

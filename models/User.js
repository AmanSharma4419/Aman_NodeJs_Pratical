// All Requires
const mongoose = require("mongoose");

// Extracting The Schema From The Mongoose
const schema = mongoose.Schema;

// function validate email
var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

// Creating The Schema For Students
const userSchema = new schema(
  {
    firstName: {
      type: String,
      required: "Firstname is required",
    },
    lastName: {
      type: String,
      required: "Lastname is required",
    },
    Email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    userName: { type: String, required: true },
    Gender: { type: String, required: true },
    Country: { type: String, required: true },
    City: { type: String, required: true },
    Hobbies: [],
    RequestIds: [{ type: schema.Types.ObjectId, ref: "User" }],
    FriendIds: [{ type: schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// Making The Model Of The Schema
const User = mongoose.model("User", userSchema);

// Exporting The Model Of The Schema
module.exports = User;

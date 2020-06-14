var express = require("express");
var router = express.Router();
var auth = require("../utils/auth");
var User = require("../models/User");
/* GET users liesting. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// Route To handle the login of the user
router.post("/login", async (req, res, next) => {
  try {
    if (!req.body.Email) {
      return res
        .status(404)
        .json({ respose: "Login credentials are mandotary" });
    } else {
      const { Email } = req.body;
      await User.findOne({ Email }, (err, user) => {
        if (err) return next(err);
        if (!user)
          return res
            .status(401)
            .json({ response: "User not found with this email" });
        var token = auth.genToken(Email);
        return res.status(200).json({ response: user, token });
      });
    }
  } catch (error) {
    return res.status(500).json({ response: error.message });
  }
});

// Route for adding the credentials of user
router.post("/user-credentials", async (req, res, next) => {
  console.log(req.body, "getting the response");
  try {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.Email ||
      !req.body.userName ||
      !req.body.Gender ||
      !req.body.Country ||
      !req.body.City ||
      !req.body.Hobbies
    ) {
      return res.status(400).json({ response: "Please fill all credentials" });
    } else {
      await User.create(req.body, (err, hobbies) => {
        if (err) return next(err);
        return res.status(200).json({ response: hobbies });
      });
    }
  } catch (error) {
    return res.status(500).json({ response: error.message });
  }
});

// Getting all the users form database
router.get("/all-users", async (req, res, next) => {
  try {
    await User.find({}, (err, users) => {
      if (err) return next(err);
      return res.status(200).json({ response: users });
    });
  } catch (error) {
    return res.status(500).json({ response: error.message });
  }
});

// Adding the friend 5ee598afa3106227905986bb 5ee5b3835708c32264b59626
router.post("/add-friend/:fromId/:toId", async (req, res, next) => {
  try {
    if (!req.params.fromId || !req.params.toId) {
      return res.status(400).json({ response: "Id's cant be empty" });
    } else {
      console.log(req.params.fromId, req.params.toId, "getting the userids");
      await User.findByIdAndUpdate(
        req.params.fromId,
        { $push: { RequestIds: req.params.fromId } },
        { new: true },
        (err, updatedUser) => {
          if (err) return next(error);
          return res.status(200).json({ response: updatedUser });
        }
      );
    }
  } catch (error) {
    return res.status(500).json({ response: error.message });
  }
});

// Accepting the request
router.post("/accept-request/:Id", async (req, res, next) => {
  if (!req.params.Id) {
    return res.status(400).json({ response: "Id is requried" });
  } else {
    await User.findByIdAndUpdate(
      req.params.Id,

      { $push: { FriendIds: req.params.Id } },
      { new: true },
      (err, updatedUser) => {
        if (err) return next(err);
        return res.status(200).json({ response: updatedUser });
      }
    );
  }
  try {
  } catch (error) {
    return res.status(500).json({ response: error.message });
  }
});
// Declining the user
router.post("/decline-user/:Id", async (req, res, next) => {
  try {
    if (!req.params.Id) {
      return res.status(400).json({ response: "Id is requried" });
    } else {
      User.findByIdAndUpdate(
        req.params.Id,
        {
          $pull: { RequestIds: req.params.Id },
        },
        { new: true },
        (err, updatedUser) => {
          if (err) return next(err);
          return res.status(200).json({ response: updatedUser });
        }
      );
    }
  } catch (error) {
    return res.status(500).json({ response: error.message });
  }
});
// Getting the individual user
router.get("/individual-user/:Id", async (req, res, next) => {
  if (!req.params.Id) {
    return res.status(400).json({ response: "Id is requried" });
  } else {
    await User.findById(req.params.Id, (err, user) => {
      if (err) return next(err);
      return res.status(200).json({ response: user });
    });
  }
  try {
  } catch (error) {
    return res.status(500).json({ response: error.message });
  }
});

module.exports = router;

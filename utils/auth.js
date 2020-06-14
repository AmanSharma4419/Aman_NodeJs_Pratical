  
const jwt = require("jsonwebtoken");

function genToken(payload) {
  return jwt.sign({ payload }, "xyz", {
    expiresIn: "10d"
  });
}

module.exports = { genToken };
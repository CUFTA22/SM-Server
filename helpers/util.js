const jwt = require("jsonwebtoken");

const signAccessToken = (userId) => {
  return jwt.sign(
    {
      iss: "SingiMedia",
      sub: userId,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "15m",
    }
  );
};

const signRefreshToken = (userId) => {
  return jwt.sign(
    {
      iss: "SingiMedia",
      sub: userId,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = {
  signAccessToken,
  signRefreshToken,
};

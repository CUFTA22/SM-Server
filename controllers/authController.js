const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { signAccessToken, signRefreshToken } = require("../helpers/util");

module.exports = {
  register: async (req, res) => {
    try {
      let { password, passwordCheck, displayName } = req.body;

      // Validate

      if (!password || !displayName || !passwordCheck)
        return res
          .status(400)
          .json({ variant: "error", message: "No empty fields!" });
      if (displayName.length < 3 || displayName.length > 15)
        return res.status(400).json({
          variant: "info",
          message: "Username must be between 3 and 15 characters!",
        });
      if (password.length < 7 || password.length > 20)
        return res.status(400).json({
          variant: "info",
          message: "Password must be between 7 and 20 characters!",
        });
      if (password !== passwordCheck)
        return res
          .status(400)
          .json({ variant: "warning", message: "Password must match!" });

      const existingUser = await User.findOne({ displayName });
      if (existingUser)
        return res
          .status(400)
          .json({ variant: "warning", message: "Username is taken!" });

      // Save user to DB

      const newUser = new User({
        displayName: displayName,
        password: password,
      });
      const savedUser = await newUser.save();

      res.status(200).json({
        variant: "success",
        message: "Account successfully created!",
      });
    } catch (error) {
      res.status(500).json({ message: "If you see this, shit went down!" });
    }
  },

  login: async (req, res) => {
    try {
      let { password, displayName } = req.body;

      // Validate

      if (!password || !displayName)
        return res
          .status(400)
          .json({ variant: "error", message: "No empty fields!" });

      const existingUser = await User.findOne({ displayName });
      if (!existingUser)
        return res
          .status(400)
          .json({ variant: "warning", message: "Invalid Credentials!" });

      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ variant: "warning", message: "Invalid Credentials!" });

      // Sign Tokens

      const accessToken = signAccessToken(existingUser.id);
      const refreshToken = signRefreshToken(existingUser.id);

      // Set Cookies

      res.cookie("refreshToken", refreshToken, {
        signed: true,
        httpOnly: true,
      });

      res.status(200).json({
        userInfo: {
          displayName,
          isAdmin: existingUser.isAdmin,
        },
        accessToken,
        variant: "success",
        message: "Authentication successful!",
      });
    } catch (error) {
      res.status(500).json({
        variant: "error",
        message: "If you see this, shit went down!",
      });
    }
  },

  logout: (req, res) => {
    res
      .status(202)
      .clearCookie("refreshToken")
      .json({ message: "Signed Out!" });
  },

  refreshToken: (req, res) => {},

  checkAuth: async (req, res) => {
    const { signedCookies = {} } = req;
    const { refreshToken } = signedCookies;
    if (!refreshToken) return;

    const payload = jwt.decode(refreshToken);

    const user = await User.findById(payload.sub);
    const accessToken = signAccessToken(payload.sub);

    res.status(200).json({
      userInfo: {
        displayName: user.displayName,
        isAdmin: user.isAdmin,
      },
      accessToken,
    });
  },
};

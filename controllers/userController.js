const User = require("../models/userModel");
const Chip = require("../models/chipModel");
const mongoose = require("mongoose");

module.exports = {
  get: async (req, res) => {
    try {
      const displayName = req.query.displayName;

      if (!displayName)
        res.status(400).json({ message: "Missing Parameters!" });

      const user = await User.findOne({ displayName })
        .populate("chips", "-_id")
        .select("-password -updatedAt");

      if (!user) res.status(404).json({ message: "User Not Found!" });

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message: "If you see this, shit went down!",
      });
    }
  },
};

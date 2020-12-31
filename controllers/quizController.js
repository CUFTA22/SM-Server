const User = require("../models/userModel");
const Chip = require("../models/chipModel");

module.exports = {
  success: async (req, res) => {
    try {
      const { subject } = req.body;
      const userId = req.user;

      const chip = await Chip.findOne({ lang: subject });

      const user = await User.findById(userId);

      // Check if user.chips contains chip._id
      if (user.chips.indexOf(chip._id) !== -1)
        return res.status("400").json({
          message: `You already own ${subject} badge!`,
        });

      // Add chip if user doesn't already own it
      await user.updateOne({ $push: { chips: chip._id } });

      res.status("201").json({
        message: `Test Passed, enjoy ${subject} your badge!`,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: error, message: "If you see this, shit went down!" });
    }
  },
};

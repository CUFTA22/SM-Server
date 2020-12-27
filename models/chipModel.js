const mongoose = require("mongoose");

const chipSchema = new mongoose.Schema({
  lang: { type: String, required: true },
  desc: { type: String, required: true },
});

module.exports = Chip = mongoose.model("chips", chipSchema);

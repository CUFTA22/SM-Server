const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    lang: { type: String, required: true },
    ghLink: { type: String, required: true },
    stars: { type: Number, default: 0 },
    usersStar: { type: Array }, // Array of displayNames
  },
  { timestamps: true }
);

module.exports = Post = mongoose.model("posts", postSchema);

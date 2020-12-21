const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    language: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = Post = mongoose.model("posts", postSchema);

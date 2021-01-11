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
    usersStar: { type: Array }, // Array of displayNames
    usersSave: { type: Array }, // Array of displayNames
  },
  { timestamps: true }
);

postSchema.index(
  {
    title: "text",
    desc: "text",
    lang: "text",
  },
  {
    name: "PostIndex",
    weights: {
      title: 10,
      desc: 8,
      lang: 6,
    },
  }
);

module.exports = Post = mongoose.model("posts", postSchema);

const Post = require("../models/postModel");
const User = require("../models/userModel");

module.exports = {
  add: async (req, res) => {
    try {
      const { displayName, title, lang, desc, ghLink } = req.body;

      // Validation
      if (!displayName || !title || !lang || !desc || !ghLink)
        return res
          .status(400)
          .json({ variant: "error", message: "No empty fields!" });

      // check gh link

      // Get user
      const user = await User.find({ displayName });

      // Save user to DB
      const newPost = new Post({
        user: user[0].id,
        ghLink,
        desc,
        title,
        lang,
      });
      const savedPost = await newPost.save();

      res.status("201").json({
        variant: "success",
        message: "Post created successfully!",
        postId: savedPost.id,
      });
    } catch (error) {
      res.status(500).json({ message: "If you see this, shit went down!" });
    }
  },

  get: async (req, res) => {},

  front: async (req, res) => {
    try {
      const filter = req.query.filter;

      switch (filter) {
        case "Stars":
          const posts1 = await Post.find().sort({ stars: -1 }).limit(8);
          res.status(200).json(posts1);
          break;
        case "Oldest":
          const posts2 = await Post.find().sort({ createdAt: 1 }).limit(8);
          res.status(200).json(posts2);
          break;
        case "Newest":
          const posts3 = await Post.find().sort({ createdAt: -1 }).limit(8);
          res.status(200).json(posts3);
          break;

        default:
          break;
      }
    } catch (error) {
      res.status(500).json({ message: "If you see this, shit went down!" });
    }
  },

  delete: async (req, res) => {},
};

const Post = require("../models/postModel");
const User = require("../models/userModel");

module.exports = {
  add: async (req, res) => {
    try {
      const { displayName, title, lang, desc, ghLink } = req.body;
      const ghRegEx = /^(https:\/\/github\.com\/[\w\/\-_.]+)$/;
      // Validation
      if (!displayName || !title || !lang || !desc || !ghLink)
        return res
          .status(400)
          .json({ variant: "error", message: "No empty fields!" });

      // check gh link
      if (!ghRegEx.test(ghLink))
        return res
          .status(400)
          .json({ variant: "error", message: "Invalid URL!" });

      // Get user for id
      const user = await User.find({ displayName });

      // Save post to DB
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
      res
        .status(500)
        .json({ error: error, message: "If you see this, shit went down!" });
    }
  },

  getOne: async (req, res) => {
    try {
      const id = req.query.id;

      const foundPost = await Post.findById(id).populate(
        "user",
        "displayName -_id"
      );

      if (!foundPost)
        return res.status(404).json({ message: "Post not found!" });

      res.status(200).json(foundPost);
    } catch (error) {
      res
        .status(500)
        .json({ error: error, message: "If you see this, shit went down!" });
    }
  },

  forOneUser: async (req, res) => {
    try {
      const displayName = req.query.displayName;

      const user = await User.findOne({ displayName });

      const posts = await Post.find({ user: user._id })
        .populate("user", "displayName -_id")
        .sort({ stars: -1 });

      res.status(200).json(posts);
    } catch (error) {
      res
        .status(500)
        .json({ error: error, message: "If you see this, shit went down!" });
    }
  },

  front: async (req, res) => {
    try {
      const filter = req.query.filter;
      const count = Number(req.query.count);

      switch (filter) {
        case "Stars":
          const posts1 = await Post.find()
            .populate("user", "displayName -_id")
            .sort({ usersStar: -1 })
            .limit(count);
          res.status(200).json(posts1);
          break;
        case "Oldest":
          const posts2 = await Post.find()
            .populate("user", "displayName -_id")
            .sort({ createdAt: 1 })
            .limit(count);
          res.status(200).json(posts2);
          break;
        case "Newest":
          const posts3 = await Post.find()
            .populate("user", "displayName -_id")
            .sort({ createdAt: -1 })
            .limit(count);
          res.status(200).json(posts3);
          break;

        default:
          break;
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: error, message: "If you see this, shit went down!" });
    }
  },

  star: async (req, res) => {
    try {
      const postId = req.body.postId;
      const userId = req.user;

      const post = await Post.findById(postId);

      const user = await User.findById(userId);

      // Check if User has already starred
      if (post.usersStar.indexOf(user.displayName) !== -1) {
        await post.updateOne({ $pull: { usersStar: user.displayName } });
        res.status(201).json({ message: "Unstarred!" });
      } else {
        await post.updateOne({ $push: { usersStar: user.displayName } });
        res.status(201).json({ message: "Starred!" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: error, message: "If you see this, shit went down!" });
    }
  },

  delete: async (req, res) => {
    try {
      const postId = req.body.postId;

      await Post.findByIdAndDelete(postId);

      res.status(200).json({ message: "Deleted Successfully!" });
    } catch (error) {
      res
        .status(500)
        .json({ error: error, message: "If you see this, shit went down!" });
    }
  },
};

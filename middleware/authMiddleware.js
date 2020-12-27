const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader)
      return res
        .status(401)
        .json({ message: "No authentication header, access denied." });

    const token = authHeader.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ message: "No authentication token, access denied." });

    const verified = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    if (!verified)
      return res
        .status(401)
        .json({ message: "Token verification failed, access denied." });

    req.user = verified.sub;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = authMiddleware;

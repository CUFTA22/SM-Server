const router = require("express").Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

//? Create ==========================================================================

router.post("/add", authMiddleware, postController.add);

//? Submit Star ===========================================================================

router.post("/star", authMiddleware, postController.star);

//? Get One ==========================================================================

router.get("/getOne", postController.getOne);

//? Get Many, Front Page =============================================================

router.get("/front", postController.front);

//? Get Many, Profile Page ===========================================================

router.get("/forOneUser", postController.forOneUser);

//? Delete ===========================================================================

router.post("/delete", authMiddleware, postController.delete);

module.exports = router;

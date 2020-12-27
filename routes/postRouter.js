const router = require("express").Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

//? Create ==========================================================================

router.post("/add", postController.add);

//? Get One ==========================================================================

router.get("/getOne", postController.getOne);

//? Get Many, Front Page =============================================================

router.get("/front", postController.front);

//? Get Many, Profile Page ===========================================================

router.get("/forOneUser", authMiddleware, postController.forOneUser);

//? Delete ===========================================================================

router.delete("/delete", postController.delete);

module.exports = router;

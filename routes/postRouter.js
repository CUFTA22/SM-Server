const router = require("express").Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

//? Create ==========================================================================

router.post("/add", authMiddleware, postController.add);

//? Search ==========================================================================

router.get("/search", postController.search);

//? Submit Star =====================================================================

router.post("/star", authMiddleware, postController.star);

//? Save Post =======================================================================

router.post("/savePost", authMiddleware, postController.savePost);

//? Get One ==========================================================================

router.get("/getOne", postController.getOne);

//? Get Many, Front Page =============================================================

router.get("/front", postController.front);

//? Get Many, Profile Page Users =====================================================

router.get("/forOneUser", postController.forOneUser);

//? Get Many, Profile Page Saved =====================================================

router.get("/forOneSaved", postController.forOneSaved);

//? Delete ===========================================================================

router.post("/delete", authMiddleware, postController.delete);

module.exports = router;

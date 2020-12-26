const router = require("express").Router();
const postController = require("../controllers/postController");

//? Create ==========================================================================

router.post("/add", postController.add);

//? Get One ==========================================================================

router.get("/getOne", postController.getOne);

//? Get Many, Front Page =============================================================

router.get("/front", postController.front);

//? Delete ===========================================================================

router.delete("/delete", postController.delete);

module.exports = router;

const router = require("express").Router();
const postController = require("../controllers/postController");

//? Create ==========================================================================

router.post("/add", postController.add);

//? Get One ==========================================================================

router.get("/get", postController.get);

//? Get Many ==========================================================================

router.get("/many", postController.many);

//? Delete ==========================================================================

router.delete("/delete", postController.delete);

module.exports = router;

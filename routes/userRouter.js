const router = require("express").Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

//? Get Info by ID ==========================================================================

router.get("/get", authMiddleware, userController.get);

//? Update - Avatar ==========================================================================

// router.update("/update/avatar", userController.updateAvatar);

//? Earn a Chip =============================================================

// router.get("/chip", userController.front);

//? Delete ===========================================================================

// router.delete("/delete", userController.delete);

module.exports = router;

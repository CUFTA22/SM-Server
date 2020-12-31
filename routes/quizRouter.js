const router = require("express").Router();
const quizController = require("../controllers/quizController");
const authMiddleware = require("../middleware/authMiddleware");

//? Submit result ==========================================================================

router.post("/success", authMiddleware, quizController.success);

module.exports = router;

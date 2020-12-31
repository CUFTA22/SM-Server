const router = require("express").Router();
const authController = require("../controllers/authController");

//? Register ==========================================================================

router.post("/register", authController.register);

//? Login ==========================================================================

router.post("/login", authController.login);

//? Logout ==========================================================================

router.post("/logout", authController.logout);

//? Check Auth ==========================================================================

router.post("/checkAuth", authController.checkAuth); // Page Refresh + Silent Auth

module.exports = router;

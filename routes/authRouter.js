const router = require("express").Router();
const authController = require("../controllers/authController");

//? Register ==========================================================================

router.post("/register", authController.register);

//? Login ==========================================================================

router.post("/login", authController.login);

//? Logout ==========================================================================

router.post("/logout", authController.logout);

//? Refresh Token ==========================================================================

router.post("/refreshToken", authController.refreshToken); // Silent Auth

//? Check Auth ==========================================================================

router.post("/checkAuth", authController.checkAuth); // Page Refresh

module.exports = router;

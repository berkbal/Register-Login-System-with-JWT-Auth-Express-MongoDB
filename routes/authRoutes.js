const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController.js")


// Get requests
router.get("/register", authController.register_get);
router.get("/login", authController.login_get);

// Post Requests
router.post("/register", authController.register_post);
router.post("/login", authController.login_post);

module.exports = router;
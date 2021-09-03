const express = require("express");
const router = express.Router();
const { getUserLogin, createNewUser } = require("../controllers/user.controller");

router.post("/login", getUserLogin);
router.post("/signup", createNewUser);

module.exports = router;
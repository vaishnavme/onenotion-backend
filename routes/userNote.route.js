const express = require("express");
const router = express.Router();
const { saveUserNote } = require("../controllers/userNote.controller");
const verifyToken = require("../middleware/verifyToken");


router.post("/:userId", saveUserNote)

module.exports = router;
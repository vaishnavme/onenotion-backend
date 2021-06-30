const express = require("express");
const router = express.Router();
const { saveUserNote } = require("../controllers/userNote.controller");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken)
router.post("/", saveUserNote)

module.exports = router;
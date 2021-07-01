const express = require("express");
const router = express.Router();
const { getUserNotes, saveUserNote, getNoteById, updateNoteById, deleteNote } = require("../controllers/userNote.controller");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken)
router.get("/", getUserNotes);
router.post("/", saveUserNote);
router.get("/:noteId", getNoteById);
router.post("/:noteId", updateNoteById);
router.delete("/:noteId", deleteNote);

module.exports = router;
const express = require("express");
const router = express.Router();
const { sharePublic, getPublicPage, deletePublicPage } = require("../controllers/public.controller");
const verifyToken = require("../middleware/verifyToken");

router.post("/:pageId", verifyToken, sharePublic);
router.get("/shared/:pageId", getPublicPage);
router.delete("/:pageId", verifyToken, deletePublicPage);

module.exports = router;
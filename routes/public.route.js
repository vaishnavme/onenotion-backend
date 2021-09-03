const express = require("express");
const router = express.Router();
const { getAllPublicPages, sharePublic, getPublicPage, deletePublicPage } = require("../controllers/public.controller");
const verifyToken = require("../middleware/verifyToken");

router.get("/pages", verifyToken, getAllPublicPages);
router.post("/:pageId", verifyToken, sharePublic);
router.get("/shared/:pageId", getPublicPage);
router.delete("/:pageId", verifyToken, deletePublicPage);

module.exports = router;
const express = require("express");
const router = express.Router();
const { createPage, getPages, getPage, updatePage, deletePage } = require("../controllers/page.controller");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken)
router.get("/", getPages);
router.post("/", createPage);
router.get("/:pageId", getPage);
router.post("/:pageId", updatePage);
router.delete("/:pageId", deletePage);

module.exports = router;
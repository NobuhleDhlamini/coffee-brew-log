const express = require("express");

const {
  getBrews,
  getBrew,
  createBrew,
  updateBrew,
  deleteBrew,
} = require("../controllers/brewController");

const router = express.Router();

router.get("/", getBrews);
router.get("/:id", getBrew);
router.post("/", createBrew);
router.put("/:id", updateBrew);
router.delete("/:id", deleteBrew);

module.exports = router;
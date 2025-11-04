const express = require("express")
const router = express.Router();
const { getAllRuns, getRunById, createRun, updateRun, deleteRun } = require("../controllers/runningController.js")

router.get("/getAllRuns", getAllRuns);
router.post("/createRun", createRun);
router.put("/updateRun/:id", updateRun);
router.delete("/deleteRun/:id", deleteRun);
router.get("/:id", getRunById);

module.exports = router;

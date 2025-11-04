const express = require("express")
const router = express.Router();
const { getAllClubs,getClubById,createClub,deleteClub,assignRunnerToClub,unassignRunnerFromClub, } = require("../controllers/clubController.js")

router.get("/getAllClubs", getAllClubs);
router.get("/getClubById/:id", getClubById);
router.post("/createClub", createClub);
router.delete("/deleteClub/:id", deleteClub);
router.post("/assignRunner", assignRunnerToClub);
router.post("/unassignRunner", unassignRunnerFromClub);

module.exports = router;
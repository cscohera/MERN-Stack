const clubs = require("../models/clubs.js")
const user = require("../models/storeUser.js");

//get all clubs
const getAllClubs = async (req, res) => {
  try {
    const club = await clubs.find();
    res.json(club);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single club with runners
const getClubById = async (req, res) => {
  try {
    const club = await clubs.findById(req.params.id);
    if (!club) return res.status(404).json({ message: "Club not found" });

    const users = await user.find({ club: club._id });
    res.json({ club, users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Create a new club
const createClub = async (req, res) => {
  const { name, description } = req.body;
  try {
    const club = new clubs({ name, description });
    await club.save();
    res.status(201).json(club);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const assignRunnerToClub = async (req, res) => {
    try {
      const { runnerId, clubId } = req.body; // ✅ both from body
  
      if (!runnerId || !clubId) {
        return res.status(400).json({ message: "Runner ID and Club ID are required" });
      }
  
      const runner = await user.findById(runnerId);
      if (!runner) return res.status(404).json({ message: "Runner not found" });
  
      if (runner.club) {
        return res.status(400).json({
          message: "Runner is already assigned to a club",
          currentClub: runner.club,
        });
      }
  
      const club = await clubs.findById(clubId);
      if (!club) return res.status(404).json({ message: "Club not found" });
  
      runner.club = clubId;
      await runner.save();
  
      res.json({ message: "Runner assigned to club successfully", runner });
    } catch (err) {
      console.error("Error in assignRunnerToClub:", err);
      res.status(500).json({ message: err.message });
    }
  };
  

  const deleteClub = async (req, res) => {
    try {
      const deletedClub = await clubs.findByIdAndDelete(req.params.id);
      if (!deletedClub) return res.status(404).json({ message: "Club not found" });
  
      // Unassign runners from this club
      await user.updateMany({ club: deletedClub._id }, { $unset: { club: "" } });
  
      res.json({ message: "Club deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const unassignRunnerFromClub = async (req, res) => {
    try {
      const { runnerId, clubId } = req.body;
  
      const runner = await user.findById(runnerId);
      if (!runner) return res.status(404).json({ message: "Runner not found" });
  
      if (!runner.club) {
        return res.status(400).json({ message: "Runner is not currently assigned to any club" });
      }
  
      const club = await clubs.findById(clubId);
      if (!club) return res.status(404).json({ message: "Club not found" });
  
      runner.club = null;
      await runner.save();
  
      res.json({ message: "Runner unassigned successfully", runner });
    } catch (err) {
      console.error("Error in unassignRunnerFromClub:", err);
      res.status(500).json({ message: err.message });
    }
  };
  

module.exports = {getAllClubs, getClubById, createClub, assignRunnerToClub, deleteClub, unassignRunnerFromClub};



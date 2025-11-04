const run = require("../models/run.js")

//get all runs created by users
const getAllRuns = async (_, res) => {
    try {
        const runs = await run.find().sort({createdAt:-1}); //newest run first
        res.status(200).json(runs);
    }
    catch (error) {
        console.error("Error in getAllRuns controller", error);
        res.status(500).json({message:"Internal server error"});
    }
};

//get a specific run created by user
const getRunById = async (req, res) => {
    try {
        const specificRun = await run.findById(req.params.id);
        if(!specificRun) return res.status(404).json({message:"Run not found"});
        res.status(200).json(specificRun);
    }
    catch (error) {
        console.error("Error in getRunById controller", error);
        res.status(500).json({message:"Internal server error"});
    }
};

//allows a user to create a run
const createRun = async (req,res) => {
    try {
        const { user, title, distance, pace, time } = req.body;
        const Run = new run({user, title, distance, pace, time});
        const savedRun = await Run.save();
        res.status(201).json({savedRun});
    }
    catch (error) {
        console.error("Error in createRun controller", error);
        res.status(500).json({message:"Internal server error"});
    }
};

//updates a run by id if user wants to change information about the run
const updateRun = async (req,res) => {
    try {
        const { user, title, distance, pace, time } = req.body;
        const updatedRun = await run.findByIdAndUpdate(req.params.id,{user, title, distance, pace, time}, {new:true});
        if(!updatedRun) return res.status(404).json({message:"Run not found"});
        res.status(200).json({message:"Run updated successfully"});
    }
    catch (error) {
        console.error("Error in updateRun controller", error);
        res.status(500).json({message:"Internal server error"});
    }
};

//allows users to delete runs
const deleteRun = async (req,res) => {
   try {
    const deletedRun = await run.findByIdAndDelete(req.params.id);
    if(!deletedRun) return res.status(404).json({message:"Run not found"});
    res.status(200).json({message:"Run deleted successfully"});
   }
   catch (error) {
    console.error("Error in deleteRun controller", error);
    res.status(500).json({message:"Internal server error"});
   }
};


module.exports = { getAllRuns, getRunById, createRun, updateRun, deleteRun };
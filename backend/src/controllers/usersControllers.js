const users = require("../models/storeUser.js")

//get all runs created by users
const getAllUsers = async (_, res) => {
    try {
      const allUsers = await users
        .find()
        .sort({ createdAt: -1 }) 
        .populate("club", "name"); 
  
      res.status(200).json(allUsers);
    } catch (error) {
      console.error("Error in getAllUsers controller", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

//get a specific run created by user
const getUserById = async (req, res) => {
    try {
        const specificUser = await users.findById(req.params.id);
        if(!specificUser) return res.status(404).json({message:"Run not found"});
        res.status(200).json(specificUser);
    }
    catch (error) {
        console.error("Error in getRunById controller", error);
        res.status(500).json({message:"Internal server error"});
    }
};

//identify if a user exists
const getUserByUsername = async (req, res) => {
       
    try {
        const elementName = req.query.username;
        const elementPass = req.query.password;
        const resultName = await users.findOne({username: elementName})
        const resultPass = await users.findOne({password: elementPass})

        if(!resultName && !resultPass) return res.status(404).json({message:"User/Pass not found"});
        res.status(200).json(resultName);

    } catch (error) {
        console.error("Error fetching users existence", error);
        res.status(500).json({message:"Internal server error"});
    }
}

//allows a user to create a user
const createUser = async (req,res) => {
    try {
        const { email, username, password, role } = req.body;
        const User = new users({email, username, password, role});
        const savedUser = await User.save();
        res.status(201).json({savedUser});
    }
    catch (error) {
        console.error("Error in createRun controller", error);
        res.status(500).json({message:"Internal server error"});
    }
};

//updates a user by id if user wants to change information about the run
const updateUser = async (req,res) => {
    try {
        const { email, username, password, role } = req.body;
        const updatedUser = await users.findByIdAndUpdate(req.params.id,{email, username, password, role}, {new:true});
        if(!updatedUser) return res.status(404).json({message:"Run not found"});
        res.status(200).json({message:"Run updated successfully"});
    }
    catch (error) {
        console.error("Error in updateRun controller", error);
        res.status(500).json({message:"Internal server error"});
    }
};

//allows coaches to delete runners
const deleteUser = async (req,res) => {
   try {
    const deletedUser = await users.findByIdAndDelete(req.params.id);
    if(!deletedUser) return res.status(404).json({message:"Run not found"});
    res.status(200).json({message:"Run deleted successfully"});
   }
   catch (error) {
    console.error("Error in deleteRun controller", error);
    res.status(500).json({message:"Internal server error"});
   }
};


module.exports = { getAllUsers, getUserById, getUserByUsername, createUser, updateUser, deleteUser };
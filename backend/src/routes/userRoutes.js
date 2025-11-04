const express = require("express")
const router = express.Router();
const { getAllUsers, getUserById, getUserByUsername, createUser, updateUser, deleteUser } = require("../controllers/usersControllers.js")

//put id catches last don't forget
router.get("/getAllUsers", getAllUsers);
router.get("/getUsername", getUserByUsername);
router.post("/createUser", createUser);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);
router.get("/:id", getUserById);

module.exports = router;
const express = require("express");
const router = express.Router();
 const { validateUser, validateId } = require("../middlewares/validate");
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
 
} = require("../controllers/userController");

// Routes CRUD complet
router.get("/", getUsers);           
router.post("/",validateUser, createUser);        
router.get("/:id",validateId, getUserById);     
router.put("/:id",validateId, updateUser);      
router.delete("/:id",validateId, deleteUser);   
module.exports = router;



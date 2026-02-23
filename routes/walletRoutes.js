const express = require("express");
const router = express.Router();
const {
  getWallets,
  createWallet
 
 
} = require("../controllers/walletController");

// Routes CRUD complet
router.get("/", getWallets);           
router.post("/", createWallet);        
// router.get("/:id", getUserById);     
// router.put("/:id", updateUser);      
// router.delete("/:id", deleteUser);   
module.exports = router;
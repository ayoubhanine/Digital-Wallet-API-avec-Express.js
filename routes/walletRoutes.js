const express = require("express");
const router = express.Router();
const {
  getWallets,
  createWallet,
  getWalletById,
  updateWallet,
 deleteWallet
 
} = require("../controllers/walletController");

// Routes CRUD complet
router.get("/", getWallets);           
router.post("/", createWallet);        
router.get("/:id", getWalletById);     
router.put("/:id", updateWallet);      
router.delete("/:id", deleteWallet);   
module.exports = router;
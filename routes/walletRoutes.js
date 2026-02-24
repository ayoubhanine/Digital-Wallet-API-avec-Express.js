const express = require("express");
const router = express.Router();
const {
  getWallets,
  createWallet,
  getWalletById,
  updateWallet,
 deleteWallet,
 deposit,
 retirer
 
} = require("../controllers/walletController");

// Routes CRUD complet
router.get("/", getWallets);           
router.post("/", createWallet);        
router.get("/:id", getWalletById);     
router.put("/:id", updateWallet);      
router.delete("/:id", deleteWallet);   

router.post("/:id/deposit",deposit);
router.post("/:id/retirer",retirer)
module.exports = router;
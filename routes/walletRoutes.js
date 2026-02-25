const express = require("express");
const router = express.Router();
 const { validateWallet, validateAmount, validateId } = require("../middlewares/validate");
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
router.post("/",validateWallet, createWallet);        
router.get("/:id", validateId,getWalletById);     
router.put("/:id",validateId, updateWallet);      
router.delete("/:id",validateId, deleteWallet);   

router.post("/:id/deposit",validateId, validateAmount,deposit);
router.post("/:id/retirer",validateId, validateAmount,retirer)
module.exports = router;



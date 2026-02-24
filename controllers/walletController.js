const { wallets,users } = require("../data/dataStore");
function getWallets(req,res){
    res.status(200).json(wallets);
}
function createWallet(req,res){
    const {user_id,name}=req.body;
    if(!user_id || !name){
       return res.status(400).json({message:"user_id et name sont obligatoires "})
    }
    const userExists=users.find(user=>user.id===parseInt(user_id));
    if(!userExists){
       return res.status(400).json({message:"user not found"})
    }
    const maxId = wallets.length > 0 
  ? Math.max(...wallets.map(wallet =>wallet.id)) 
  : 0;
  const newWallet={id:maxId+1,user_id:parseInt(user_id),name,sold:0};
  wallets.push(newWallet);
   res.status(201).json(newWallet);
}
function getWalletById(req,res){
      const id=parseInt(req.params.id);
      const wallet=wallets.find(w=>w.id===id)
      if(!wallet){
         return res.status(400).json({message:"wallet not found"})
      }
      res.status(200).json(wallet);

}
function updateWallet(req,res){
   const id=parseInt(req.params.id);
   const {name}=req.body;
   const walletIndex=wallets.findIndex(w=>w.id===id)
   if(walletIndex===-1){
      return res.status(404).json({message:"wallet not found"})
   }
if(name)
   wallets[walletIndex].name=name;
   res.status(200).json(wallets[walletIndex])


}
function deleteWallet(req,res){
   const id=parseInt(req.params.id)
   const walletIndex=wallets.findIndex(w=>w.id===id);
   if(walletIndex===-1){
      return res.status(404).json({message:"wallet not found"})
   }
   const deletedWallet=wallets.splice(walletIndex,1);
   res.status(200).json({message:"wallet deleted",wallet:deletedWallet[0]})
}
function deposit(req,res){
   const id=parseInt(req.params.id);
   const {amount}=req.body
   const wallet=wallets.find(w=>w.id===id)
   if(!wallet){
      return res.status(404).json({message:"wallet not found"})
   }
   if(!amount || amount<=0){
      return res.status(400).json({message:"sold doit etre positive"})
   }
   wallet.sold=wallet.sold+amount;
   res.status(200).json({message:"depot est faite avec succes",wallet})
}
function retirer(req,res){
   const id=parseInt(req.params.id);
   const {amount}=req.body;
   const wallet=wallets.find(w=>w.id===id);
   if(!wallet){
      return res.status(404).json({message:"wallet not found"})
   }
   if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Amount must be strictly positive" });
  }
  if(wallet.sold<amount){
   return res.status(400).json({message:"insuffisant balance"})
  }
  wallet.sold=wallet.sold-amount
  res.status(200).json({message:"retrait avec succes",wallet})
}

module.exports = {
  getWallets,
  createWallet,
  getWalletById,
  updateWallet,
  deleteWallet,
  deposit,
  retirer
};
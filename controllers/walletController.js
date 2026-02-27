// const { wallets,users } = require("../data/dataStore");
const { readData, writeData } = require("../utils/fileUtils");
function getWallets(req,res){
   const wallets=readData("wallets.json");
     // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Filtrage par user_id si fourni
    let filteredWallets = wallets;
    if (req.query.user_id) {
      const userId = parseInt(req.query.user_id);
      filteredWallets = wallets.filter(w => w.user_id === userId);
    }

    //  Slice pour pagination
    const result = filteredWallets.slice(startIndex, endIndex);

    res.status(200).json({
      page,
      limit,
      total: filteredWallets.length,
      totalPages: Math.ceil(filteredWallets.length / limit),
      data: result
    });
}
function createWallet(req,res){
   const wallets=readData("wallets.json")
   const users=readData("users.json")
    const {user_id,name}=req.body;
   
    const userExists=users.find(user=>user.id===parseInt(user_id));
    if(!userExists){
       return res.status(404).json({message:"user not found"})
    }
    const maxId = wallets.length > 0 
  ? Math.max(...wallets.map(wallet =>wallet.id)) 
  : 0;
  const newWallet={id:maxId+1,
   user_id:parseInt(user_id),
   name,
   sold:0};
  wallets.push(newWallet);
  writeData("wallets.json",wallets)
   res.status(201).json(newWallet);
}
function getWalletById(req,res){
      const id=parseInt(req.params.id);
      const wallets=readData("wallets.json")
      const wallet=wallets.find(w=>w.id===id)
      if(!wallet){
         return res.status(404).json({message:"wallet not found"})
      }
      res.status(200).json(wallet);

}
function updateWallet(req,res){
   const id=parseInt(req.params.id);
   const wallets=readData("wallets.json")
   const {name}=req.body;
   const walletIndex=wallets.findIndex(w=>w.id===id)
   if(walletIndex===-1){
      return res.status(404).json({message:"wallet not found"})
   }
if(name)
   wallets[walletIndex].name=name;
   writeData("wallets.json",wallets)
   res.status(200).json(wallets[walletIndex])


}
function deleteWallet(req,res){
   const id=parseInt(req.params.id);
   const wallets=readData("wallets.json")
   const walletIndex=wallets.findIndex(w=>w.id===id);
   if(walletIndex===-1){
      return res.status(404).json({message:"wallet not found"})
   }
   const deletedWallet=wallets.splice(walletIndex,1);
   writeData("wallets.json",wallets)
   res.status(200).json({message:"wallet deleted",wallet:deletedWallet[0]})
}
function deposit(req,res){
  try{ const id=parseInt(req.params.id);
   const wallets=readData("wallets.json");
   const history=readData("history.json")
   const {amount}=req.body;
   const amountNumber = parseFloat(amount);
   const wallet=wallets.find(w=>w.id===id)
   if(!wallet){
      return res.status(404).json({message:"wallet not found"})
   }
   wallet.sold=wallet.sold+amountNumber;
   history.push({
    id: Date.now(),
    wallet_id: wallet.id,
    type: "deposit",
    amount: amountNumber,
    date: new Date().toISOString()
  });
   writeData("wallets.json",wallets)
   writeData("history.json",history)
   res.status(200).json({message:"depot est faite avec succes",wallet})
}
catch(error){
      console.error(error);
      res.status(500).json({message:"server error",error:error.message})
}
}
function retirer(req,res){
   const id=parseInt(req.params.id);
   const wallets=readData("wallets.json")
   const history=readData("history.json")
   const {amount}=req.body;
   const amountNumber = parseFloat(amount);
   const wallet=wallets.find(w=>w.id===id);
   if(!wallet){
      return res.status(404).json({message:"wallet not found"})
   }
   if (!amountNumber || amountNumber <= 0) {
    return res.status(400).json({ message: "Amount must be strictly positive" });
  }
  if(wallet.sold<amountNumber){
   return res.status(400).json({message:"insuffisant balance"})
  }
  wallet.sold=wallet.sold-amountNumber
  history.push({
    id: Date.now(),
    wallet_id: wallet.id,
    type: "retirer",
    amount: amountNumber,
    date: new Date().toISOString()
  });
  writeData("wallets.json",wallets)
  writeData("history.json",history)
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
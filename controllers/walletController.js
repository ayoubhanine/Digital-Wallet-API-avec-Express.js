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


module.exports = {
  getWallets,
  createWallet
};
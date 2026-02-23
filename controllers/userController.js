const { users } = require("../data/dataStore");

function createUser(req, res) {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }
const maxId = users.length > 0 
  ? Math.max(...users.map(user => user.id)) 
  : 0;

  const newUser = { id: maxId + 1, name, email, phone };
  users.push(newUser);
  res.status(201).json(newUser);
}
function getUsers(req,res){
res.status(200).json(users)
}
function getUserById(req,res){
const id=parseInt(req.params.id)
const user=users.find(user=>user.id===id)
if(!user){
     return res.status(404).json({message:"user not found!!"});
}
res.status(200).json(user)
}
function updateUser(req,res){
    const id=parseInt(req.params.id)
    const{name ,email, phone}=req.body
    const userIndex=users.findIndex(u=>u.id===id);
    if(userIndex===-1){
            return res.status(404).json({message:"user not found"})
    }
    if(name) users[userIndex].name=name;
    if(email) users[userIndex].email=email;
    if(phone) users[userIndex].phone=phone;
    res.status(200).json(users[userIndex]);
}
function deleteUser(req,res){
    const id=parseInt(req.params.id);
    const userIndex=users.findIndex(u=>u.id===id);
    if(userIndex===-1){
      return  res.status(404).json({message:"user not found"})
    }
const deletedUser=users.splice(userIndex,1)
res.status(200).json({message:"user a ete supprimé",user:deletedUser[0]});
}

module.exports = { getUsers, createUser,getUserById,updateUser,deleteUser };
const { users } = require("../data/dataStore");

function getUsers(req, res) {
  res.json(users);
}

function createUser(req, res) {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const newUser = { id: users.length + 1, name, email, phone };
  users.push(newUser);
  res.status(201).json(newUser);
}

module.exports = { getUsers, createUser };
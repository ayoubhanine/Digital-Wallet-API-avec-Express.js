
function validateUser(req, res, next) {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "All user fields are required" });
  }

  next(); // passer au controller
}

function validateWallet(req, res, next) {
  const { user_id, name } = req.body;

  if (!user_id || !name) {
    return res.status(400).json({ message: "user_id and name are required" });
  }

  next();
}

//Vérifier le montant (deposit / withdraw)
function validateAmount(req, res, next) {
  const { amount } = req.body;

  if (amount === undefined || amount <= 0) {
    return res.status(400).json({ message: "Amount must be strictly positive" });
  }

  next();
}

// Vérifier que l'id est valide
function validateId(req, res, next) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  next();
}

module.exports = {
  validateUser,
  validateWallet,
  validateAmount,
  validateId
};
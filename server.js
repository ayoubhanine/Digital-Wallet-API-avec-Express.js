const express = require("express");
const userRoutes = require("./routes/userRoutes");
const walletRoutes = require("./routes/walletRoutes");

const app = express();
const PORT = 3000;

// Middleware pour lire JSON
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/wallets", walletRoutes);
// Route par défaut si non trouvée
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
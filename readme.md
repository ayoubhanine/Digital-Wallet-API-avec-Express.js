
# Digital Wallet API

Ce projet est une API **Node.js** utilisant **Express** pour gérer des utilisateurs et des portefeuilles numériques.  

---

## 1. Structure de projet 

## Structure du projet

Digital Wallet API AVEC EXPRESS
├─ controllers/
│  ├─ userController.js
│  └─ walletController.js
├─ data/
│  └─ dataStore.js
├─ middlewares/
│  └─ validate.js
├─ routes/
│  ├─ userRoutes.js
│  └─ walletRoutes.js
├─ history.json
├─ package.json
├─ package-lock.json
├─ readme.md
└─ serveur.js


## 2. Fonctionnalités

- Gestion des utilisateurs (`/users`) :
  - Ajouter un utilisateur
  - Lister tous les utilisateurs
  - Modifier ou supprimer un utilisateur

- Gestion des portefeuilles (`/wallets`) :
  - Créer un portefeuille
  - Consulter le solde
  - Effectuer des opérations (retraits, dépôts)

- Gestion des erreurs :
  - Routes inexistantes renvoient un `404`
  - Middleware JSON pour lire les requêtes

---


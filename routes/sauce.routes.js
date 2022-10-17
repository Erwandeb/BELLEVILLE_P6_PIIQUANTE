const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/sauce.controllers');
const authentification = require("../middlewares/authentification.js");
const multer = require("../middlewares/multer-config");


// GESTION DES SAUCES
router.get("/", authentification , sauceController.getAllSauce);
router.get("/:id", authentification , sauceController.getOneSauce);

// CRUD SAUCES
router.post("/", authentification, multer, sauceController.createSauce);
router.post("/:id/like", authentification, sauceController.likeSauce);
router.put("/:id", authentification, multer, sauceController.modifySauce);
router.delete("/:id", authentification, sauceController.deleteSauce);


module.exports = router;
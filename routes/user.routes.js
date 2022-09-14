const router = require('express').Router();
const authController = require('../controllers/auth.controllers');

/*
 * 
 * Authentification
 * 
 */ 
router.post('/signup', authController.signUp);



/*
 * 
 * GESTION DES SAUCES
 * 
 */ 

 // router.post ('');



module.exports = router;
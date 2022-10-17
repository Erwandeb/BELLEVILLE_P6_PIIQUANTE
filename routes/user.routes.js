const router = require('express').Router();
const authController = require('../controllers/auth.controllers');


 
// Authentification
router.post('/signup', authController.signUp);
router.post("/login", authController.login);



module.exports = router;
const UserModel = require('../models/userModel');
require("dotenv").config();
const jsonWebToken = require("jsonwebtoken");
const bcrypt = require("bcrypt");


exports.signUp = async(req, res) => {

    const {email, password} = req.body;
    
    if(!email || !password){
        return res.status(400).json({message:"bad request"})
    }
    try{
        const user = await UserModel.create({email, password});
        res.status(201).json({
            message: "Ajout d'un nouvel utilisateur !"
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"internal serveur error"})
    }
}


exports.login = (req, res) => {
    UserModel.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message:"Utilisateur existe pas OU mot de passe incorrect" });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({message:"Utilisateur existe pas OU mot de passe incorrect" });
            }
            res.status(200).json({
              userId: user._id,
              token: jsonWebToken.sign(
                { userId: user._id },
                process.env.SECURITY_TOKEN,
                {
                  expiresIn: "72h",
                }
              ),
              message: "l' Utilisateur est connecté !",
            });
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  };
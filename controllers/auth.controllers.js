const User = require("../models/userModel");
require("dotenv").config();
const jsonWebToken = require("jsonwebtoken");
const bcrypt = require('bcrypt');



exports.signUp = (req, res) => {
  const {email, password} = req.body;
    
    if(!email || !password){
        return res.status(400).json({message:"bad request"})
    }
    User.findOne({ email })
    .then((userExist) => {
      if(userExist){
        return res.status(400).json({message:"Cet email existe déjà"}) 
      }else{
        bcrypt 
            .hash(req.body.password, 10) 
            .then((hash) =>{
              const newUser = new User ({
                    email, 
                    password: hash
              });
            newUser
                .save()
                .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                .catch((error) => res.status(500).json({ error :" Internal server error"}));
          })
      };
    });
    
}


exports.login = (req, res) => {
  const {email, password} = req.body;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Ressource not found" });
      }
      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Ressource not found" });
          }
          res.status(200).json({
            userId: user._id,
            token: jsonWebToken.sign(
              { userId: user._id },
              process.env.SECURITY_TOKEN,
              {
                expiresIn: "1h",
              }
            ),
            message: "Utilisateur connecté !",
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

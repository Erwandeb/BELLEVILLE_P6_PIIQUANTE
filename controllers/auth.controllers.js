const UserModel = require("../models/userModel");
require("dotenv").config();
const jsonWebToken = require("jsonwebtoken");
const bcrypt = require('bcrypt');


exports.signUp = (req, res) => {

    const {email, password} = req.body;
    
    if(!email || !password){
        return res.status(400).json({message:"bad request"})
    }

    UserModel.findOne({ email: req.body.email })
    .then(userExist => {
        if(userExist){
            return res.status(400).json({message:"Cet email existe déjà"}) 
        }else{
            const newUser = UserModel.create({
                email: email, 
                password: password
            });
            
            bcrypt.genSalt(10, (err,salt) => {
                bcrypt.hash(newUser.password, salt, (err,hash) => {
                    if(err){
                        return res.status(500).json({message:"Internal serveur error"})
                    }else{
                        newUser.password = hash;
                        newUser.save()
                            .then(newUser => res.json(newUser))
                            .catch(err => console.log(err));
                    }
                });
            });
            
            res.status(201).json({
                message: "Ajout d'un nouvel utilisateur !",
                newUser: newUser.id
            })
        }
    })
   // .catch(err =>{ res.status(500).json({message:"internal serveur error"})})
    
    
}

/*
exports.login = async(req, res) => {

    const {email, password} = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message:"Utilisateur existe pas OU mot de passe incorrect" });
    }
    try{
       const user = UserModel.findOne({ email: req.body.email })
        console.log(password)
        //console.log('test', user);
        if(user) {
            const auth = await bcrypt.compare(password, user.password);
            if(auth){
                res.status(200).json({
                    userId: user._id,
                    token: jsonWebToken.sign(
                      { userId: user._id },
                      process.env.SECURITY_TOKEN,
                      {
                        expiresIn: "24h",
                      }
                    ),
                    message: "Utilisateur connecté !",
                  });
            }
            throw Error('Mot de passe OU Email incorrect !');
        }
        throw Error ('Mot de passe OU Email incorrect !');
      
    }
    catch(error){
        res.status(500).json({ error });
    } 
    
};
*/



/*
    // décrytpage des mot de passes
    userModel.statics.login = async function(email, password){
        const user = await this.findOne({email});
        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if(auth){
                return user;
            }
            throw Error('Mot de passe OU Email incorrect !');
        }
        throw Error ('Mot de passe OU Email incorrect !');
    
        // faire return 404
    
        // reprendre base de code
    }
*/



/*
exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jsonWebToken.sign(
              { userId: user._id },
              process.env.SECURITY_TOKEN,
              {
                expiresIn: "24h",
              }
            ),
            message: "Utilisateur connecté !",
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
*/
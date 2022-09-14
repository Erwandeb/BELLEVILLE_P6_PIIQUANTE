const UserModel = require('../models/userModel');


exports.signUp = async(req, res) => {

    const {email, password} = req.body;
    
    if(!email || !password){
        return res.status(400).json({message:"bad request"})
    }
    try{
        const user = await UserModel.create({email, password});
        res.status(201).json({
            message: "User created !"
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"internal serveur error"})
    }
}


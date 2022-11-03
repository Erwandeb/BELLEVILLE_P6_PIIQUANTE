const Sauce = require("../models/sauceModel");
const fs = require('fs');


// GET ALL SAUCE
exports.getAllSauce = (req, res) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(500).json({error: "internal server error"}));
};

// GET ONE SAUCE
exports.getOneSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if(!sauce){
        return res.status(404).json({error: "ressource not found"})
      }
      res.status(200).json(sauce)
    })
    .catch((error) => res.status(500).json({error: "internal server error"}));
};



// CREATE A SAUCE 
exports.createSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "nouvelle sauce enregistrée !"}))
    .catch((error) => {
      res.status(500).json({ error: "internal server error" });
    });
};



// MODIFY A SAUCE
exports.modifySauce = (req, res) => {

  const modifiedSauce = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }  : { ...req.body };

  delete modifiedSauce._userId;

  Sauce.updateOne({ _id: req.params.id }, { ...modifiedSauce })
  .then((sauce) => {
    if (sauce.userId != req.authorization.userId) {
      return res.status(401).json({ message : 'Not authorized'});
    }
    Sauce.updateOne({ _id: req.params.id}, { ...modifiedSauce})
    .then(() => res.status(200).json({message : 'Sauce modifiée!'}))
    .catch(error => res.status(401).json({ error }));
  })
  .catch(error => res.status(500).json({error: "internal server error"}));
};


// DELETE A SAUCE 
exports.deleteSauce = (req, res) => {

  Sauce.findOne({_id: req.params.id})
  /*
  Sauce.findOne({
    _id: req.params.id,
    sauceUserId : req.body.userId,
    userId : req.userId,
  })
  */
    .then((sauce) => {
      if(sauce.userId != req.userId){
        return res.status(403).json({message: 'Not authorized'});
      } 
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() =>{
            if(sauce.userId != req.userId){
              return res.status(403).json({message: 'Not authorized'});
            }
            res.status(200).json({ message: "Sauce supprimée !"})
          })
          .catch((error) => res.status(500).json({error: "internal server error" }));
      });
    })
    .catch((error) => res.status(500).json({error: "internal server error" }));
};
 


// LIKE & DISLIKE A SAUCE 
exports.likeSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })

  .then((sauce) =>{
    const sauceLikes = sauce.usersLiked;
    const sauceDislikes = sauce.usersDisliked;

    //  LIKE
    if(req.body.like === 1) {
      if(!sauceLikes.includes(req.userId) && !sauceDislikes.includes(req.userId)){
        sauceLikes.push(req.userId);
        sauce.likes++;
        sauce.save();
        return res.status(200).json({ message: 'sauce like' });
      }
      return res.status((403)).json({error: "la sauce est déjà likée" });
    }

    // DISLIKE
    if(req.body.like === -1) {
      if(!sauceLikes.includes(req.userId) && !sauceDislikes.includes(req.userId)){
        sauceDislikes.push(req.userId);
        sauce.dislikes++;
        sauce.save();
        return res.status(200).json({ message: 'sauce like' });
      } 
      return res.status(403).json({error: "La sauce est déjà disliké" });
    }

    // NO LIKE
    if (req.body.like === 0) {
      if(sauceLikes.includes(req.userId)) {
        let indexUser = sauceLikes.indexOf(req.userId);
        sauceLikes.splice(indexUser, 1);
        sauce.likes--;
        sauce.save();
        return res.status(200).json({ message: 'sauce like' });
      }
      if(sauceDislikes.includes(req.userId)) {
          let indexUser = sauceDislikes.indexOf(req.userId);
          sauceDislikes.splice(indexUser, 1);
          sauce.dislikes--;
          sauce.save();
          return res.status(200).json({ message: 'sauce like' });
      } 
    }
  })
  .catch((error) =>res.status(500).json({error: "internal server error" }) )
};
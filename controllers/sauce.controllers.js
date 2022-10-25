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

// CREATE
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

// MODIFY
exports.modifySauce = (req, res) => {
  const modifiedSauce = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }  : { ...req.body };
  
  Sauce.updateOne({ _id: req.params.id }, { ...modifiedSauce, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet modifié !'}))
  .catch(error => res.status(500).json({error: "internal server error"}));
  
  /*
  delete modifiedSauce._userId;
  Sauce.findOne({_id: req.params.id})
      .then((element) => {
          if (element.userId != req.auth.userId) {
              res.status(401).json({ message : 'Not authorized'});
          } else {
              Sauce.updateOne({ _id: req.params.id}, { ...modifiedSauce, _id: req.params.id})
              .then(() => res.status(200).json({message : 'Objet modifié!'}))
              .catch(error => res.status(500).json({ error: "internal server error" }));
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
*/
  
};


// DELETE
/*
exports.deleteSauce = (req, res) => {  
  Sauce.deleteOne({ _id: req.params.id })
    .then((sauce) =>{
      console.log(sauce.imageUrl);
      const filename = sauce.imageUrl.split("/images/")[1];
      console.log("test",filename);
      fs.unlink(`images/${filename}`, () => {
        res.status(200).json({ message: "La sauce est bien supprimée" })
        console.log('oui')
      })
  })
  .catch(error => res.status(500).json({error: "internal server error" }) )
};
*/

exports.deleteSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() =>
            res.status(200).json({ message: "Sauce supprimée !"})
          )
          .catch((error) => res.status(500).json({error: "internal server error" }));
      });
    })
    .catch((error) => res.status(500).json({error: "internal server error" }));
};
 

// LIKE & DISLIKE
exports.likeSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id });



};
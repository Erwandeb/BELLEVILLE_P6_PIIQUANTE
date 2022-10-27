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

  // Verification ID 
  const modifiedSauce = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }  : { ...req.body };
  
  Sauce.updateOne({ _id: req.params.id }, { ...modifiedSauce, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet modifié !'}))
  .catch(error => res.status(500).json({error: "internal server error"}));
  
};


// DELETE A SAUCE 
exports.deleteSauce = (req, res) => {
  // Verifier user ID 
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if(!sauce){
        res.status(500).json({error: "internal server error" })
      }
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
 


// LIKE & DISLIKE A SAUCE 

// User a 3 actions possibles  
// tableau d'ID et on récupère le total du tableau pour avoir le nombre de like


exports.likeSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
  .then((sauce) =>{
   
    console.log("like", req.body.like);
    const sauceLikes = sauce.usersLiked;
    const sauceDislikes = sauce.usersDisliked;
    console.log('before',sauceLikes);
    console.log('before',sauceDislikes);

    
    //  LIKE
    if(req.body.like === 1) {
      // Si utilisateur existe pas dans les 2 tableaux :
      if (!sauceLikes.includes(req.userId) && !sauceDislikes.includes(req.userId)){
          console.log('LIKE CONDITIONS')
          sauceLikes.push(req.userId);
          sauce.likes++;
        }else {
          res.status((500)).json({error: "internal server error" });
        }
    }

      // DISLIKE
      if(req.body.like === -1) {
        if (!sauceLikes.includes(req.userId) && !sauceDislikes.includes(req.userId)){
            console.log('DISLIKE CONDITIONS')
            sauceDislikes.push(req.userId);
            sauce.dislikes++;
          } else {
            res.status(500).json({error: "internal server error" });
          }
      }

    // NO LIKE -- INITIAL STATE
    if (req.body.like === 0) {
      console.log('NO LIKE CONDITIONS')

      if(sauceLikes.includes(req.userId)) {
        let indexUser = sauceLikes.indexOf(req.userId);
        sauceLikes.splice(indexUser, 1);
        sauce.likes--;
        console.log('no like');
      } else {
          res.status(500).json({error: "internal server error" });
      }

      if(sauceDislikes.includes(req.userId)) {
          let indexUser = sauceDislikes.indexOf(req.userId);
          sauceDislikes.splice(indexUser, 1);
          sauce.dislikes--;
          console.log('no like');
        } else {
          res.status(500).json({error: "internal server error" });
      }
      
    
    }
    
    console.log('after',sauceLikes);
    console.log('after',sauceDislikes);

    sauce.save();
    res.status(200).json({ message: 'sauce like' });

  })
  .catch((error) =>res.status(500).json({error: "internal server error" }) )


  /*
  const sauce = Sauce.findOne({ _id: req.params.id });
  const sauceLikes = sauce.usersLiked;
  const sauceDislikes = sauce.usersDisliked;

    console.log(sauce);

    // LIKE
    if (req.body.like === 1) {
      if (!sauceLikes.includes(req.userId)) {
        if (!sauceDislikes.includes(req.userId)) {
          sauceLikes.push(req.userId);
          sauce.likes++;
          console.log('like');
        } else {
          res.status((500)).json({error: "internal server error" });
        }
      } else {
        res.status(500).json({error: "internal server error" });
      }
    }

    // DISLIKE
    if (req.body.like === -1) {
      if (!sauceDislikes.includes(req.userId)) {
        if (!sauceLikes.includes(req.userId)) {
          sauceDislikes.push(req.userId);
          sauce.dislikes++;
          console.log('dislike')
        } else {
          res.status(400).json({error: "internal server error" });
        }
      } else {
        res.status(400).json({error: "internal server error" });
      }
    }



    // NO LIKE
    if (req.body.like === 0) {

      
      if (sauceLikes.includes(req.userId)) {
        let indexUser = sauceLikes.indexOf(req.userId);
        sauceLikes.splice(indexUser, 1);
        sauce.likes--;
        console.log("no like")
      } else {
          res.status(500).json({error: "internal server error" });
      }

      if (sauceDislikes.includes(req.userId)) {
          let indexUser = sauceDislikes.indexOf(req.userId);
          sauceDislikes.splice(indexUser, 1);
          sauce.dislikes--;
          console.log('no like');
        } else {
          res.status(500).json({error: "internal server error" });
      }


    }

    Sauce.save();
    res.status(200).json({ message: 'sauce like' });
    */
};
const Sauce = require("../models/sauceModel");

exports.getAllSauce = (req, res) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(500).json({error: "internal server error"}));
};


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


exports.createSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "nouvelle sauce enregistrée !", sauce }))
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.modifySauce = (req, res) => {
};

exports.likeSauce = async (req, res) => {
};

exports.deleteSauce = (req, res) => {
};

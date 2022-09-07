const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://'+process.env.DB_ADMIN_LOGIN+'@cluster0.5dw3j.mongodb.net/Piiquante/Piiquante',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
.then(()=>{console.log("La connexion avec mongoDB est établie ! ")})
.catch((err)=>{console.log("Erreur lors de la connexion à MongoDB", err)});

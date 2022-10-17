const express = require('express');
const userModel = require('./models/userModel');
const userRoutes = require('./routes/user.routes');
const saucesRoutes = require('./routes/sauce.routes.js')
require('dotenv').config({path:'./config/.env'})
require('./config/database-config/dbConfig');
const cors = require('cors');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(cookieparser());



// User routes
app.use('/api/auth/', userRoutes)

// Routes sauces
app.use("/api/sauces/", saucesRoutes);

// Serveur
app.listen(process.env.PORT, ()=>{
    console.log(`Le serveur tourne sur le port ${process.env.PORT}.`)
})




/* TO DO LIST
*
* 1/ Intégrer le front
* 2/ Tester la route create sauce en commencant par créer un utilisateur puis en s'identifiant avec un token 
*
*    User : erwan@gmail.com 
*    MDP :  test
*/
// 
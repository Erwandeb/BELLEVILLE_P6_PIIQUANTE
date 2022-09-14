const express = require('express');
const userModel = require('./models/userModel');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({path:'./config/.env'})
require('./config/database-config/dbConfig');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyparser.json());

/////////////////////////////////////////////////
/////// Start using this API here. //////////////
/////////////////////////////////////////////////


// Authentification routes
app.use('/api/auth/', userRoutes)


// Serveur
app.listen(process.env.PORT, ()=>{
    console.log(`Le serveur tourne sur le port ${process.env.PORT}.`)
})
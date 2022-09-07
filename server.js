const express = require('express');
require('dotenv').config({path:'./config/.env'})
require('./config/database-config/dbConfig');

const app = express();

/***
 * 
 * Start using this API here.
 * 
 */


// Serveur
app.listen(process.env.PORT, ()=>{
    console.log(`Le serveur tourne sur le port ${process.env.PORT}.`)
})
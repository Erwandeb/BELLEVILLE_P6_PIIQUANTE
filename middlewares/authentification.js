require("dotenv").config();
const jsonWebToken = require("jsonwebtoken");
const { restart } = require('nodemon')


module.exports = (req, res, next) => {
  
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jsonWebToken.verify(token, process.env.SECURITY_TOKEN);
    const userId = decodedToken.userId;
    req.userId = userId;
    next();
  } catch {
    res.status(401).json({
      error: new Error("unauthorized"),
    });
  }
  
};

/*
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if(token){
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) =>{
          if(err){
              res.locals.user = null;
              res.cookie('jwt', '', {maxAge: 1});
              next();
          } else {
              let user = await UserModel.findById(decodedToken.id);
              res.locals.user = user;
              next();
          }
      })
  } else {
      res.locals.user = null;
      next();
  }
} 
*/

/*
module.exports = (req, res, next) => {
  let response = {}

  try {
    if (!req.headers.authorization) {
      throw new Error('Token is missing from header')
    }
    const userToken = req.headers.authorization.split('Bearer')[1].trim()
    const decodedToken = jsonWebToken.verify(
      userToken,
      process.env.SECRET_KEY || 'default-secret-key'
    )
    return next()
  } catch (error) {
    console.error('Error', error)
    response.status = 401
    response.message = error.message
  }

  return res.status(response.status).send(response)
}
*/
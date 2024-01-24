const { checkJwt}  = require('./jwtMiddleware');

module.exports = app => {
    const utilisateur = require("../controllers/utilisateur.controllers.js");
  
    var router = require("express").Router();
  
    router.post("/login", utilisateur.login);
    router.post("/createuser", utilisateur.createUser)
    router.get("/getuserinfo", checkJwt, utilisateur.getUserInfo);
  
    app.use('/api/utilisateur', router);
  };

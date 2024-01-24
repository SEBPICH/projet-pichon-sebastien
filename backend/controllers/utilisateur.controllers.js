const { v4: uuidv4 } = require("uuid");
const { ACCESS_TOKEN_SECRET } = require("../config.js");
const jwt = require("jsonwebtoken");
const { utilisateur: Utilisateur } = require("../models/index.js");
const { Sequelize } = require('../models/index.js');

const pattern = /^[A-Za-z0-9]{1,20}$/;

function generateAccessToken(user) {
  const payload = {
    id: user.id,
    name: user.nom,
    email: user.email,
  };

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: '30m',
  });

  return accessToken;
}


exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (pattern.test(login) && pattern.test(password)) {
      const user = await Utilisateur.findOne({
        where: { login: login, password: password },
        attributes: ['id', 'nom', 'email'], // Add all fields you want to retrieve
      });

      if (user) {
        const { id, nom, email } = user;

        const userData = {
          id: id,
          name: nom,
          email: email,
        };

        const accessToken = generateAccessToken(userData);

        res.setHeader("Authorization", `Bearer ${accessToken}`);
        res.status(200).json(userData);
      } else {
        res.status(404).send({
          message: `User with login ${login} not found or incorrect password.`,
        });
      }
    } else {
      res.status(400).send({
        message: "Bad login or password",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
};
  

exports.createUser = async (req, res) => {
  const newUser = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    adresse: req.body.adresse,
    codepostal: req.body.codepostal,
    ville: req.body.ville,
    telephone: req.body.telephone,
    email: req.body.email,
    login: req.body.login,
    password: req.body.password,
  };

  try {
    const user = await Utilisateur.create(newUser);
    const accessToken = generateAccessToken(user);

    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
};

function getUserIdFromToken(token) {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    return decoded.id; 
  } catch (error) {
    console.error('Error extracting user ID from token:', error);
    return null;
  }
}

exports.getUserInfo = async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    const token = req.headers.authorization.split(' ')[1];
    const userId = getUserIdFromToken(token);

    if (!userId) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const user = await Utilisateur.findByPk(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


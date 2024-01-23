const express = require('express');
const Authrouter = express.Router();
const {signup, login} = require('../controllers/authController');

Authrouter.post('/signup', signup);
Authrouter.post('/login', login);

module.exports = {Authrouter};
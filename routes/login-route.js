const express = require('express');
const LoginControler = require('../src/controllers/LoginController');

const router = express.Router();

router.get('/', LoginControler.login);

module.exports = router;
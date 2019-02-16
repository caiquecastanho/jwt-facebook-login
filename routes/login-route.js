const express = require('express');
const LoginControler = require('../src/controllers/LoginController');

const router = express.Router();

/**
 * @route GET /login
 * @group Login - Authenticates through Facebook
 * @param {string} facebookToken.header.required - User's access token from Facebook
 * @returns {Token.model} 200 - JWT to authenticate on REST API's
 * @returns {Error.model} 400 - facebookToken is required
 * @returns {Error.model} 401 - Unauthorized
 * @returns {Error.model} 500 - Unexpected error
 */
router.get('/', LoginControler.login);

/**
 * @route GET /verify
 * @group Verify - Checks JWT and extracts authenticated user information
 * @param {string} jwtToken.header.required - Token acquired on /login
 * @returns {User.model} 200 - authenticated user information
 * @returns 400 - JWT is required
 * @returns 401 - Unauthorized
 */
router.get('/verify', LoginControler.verify);

/**
 * @typedef Error
 * @property {string} message.required
 */

 /**
 * @typedef Token
 * @property {string} token.required
 */

  /**
 * @typedef User
 * @property {string} name.required
 * @property {string} id.required
 * @property {integer} iat
 * @property {integer} exp
 */

module.exports = router;
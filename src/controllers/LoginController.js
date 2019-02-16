const axios = require('axios');
const jsonWebToken = require('jsonwebtoken');

//TO DO: include the jwtSecret in env variable
const jwtSecret = process.env.JWT_SECRET;

class LoginController{
    // Verifys the facebook token
    static async login(req, res){
        let facebookToken = req.get('facebookToken');
        if(!facebookToken){
            res.status(400).json({
                message: 'Facebook token is required'
            });
        }
        //TO DO: include the Facebook's path in env variable
        var path = 'https://graph.facebook.com/me?access_token=' + facebookToken;
        try{
            var facebookResponse = await axios.get(path);
            if(facebookResponse.status == 200 && facebookResponse.data.id){
                var accessToken = jsonWebToken.sign(facebookResponse.data, jwtSecret, {
                    expiresIn: 86400
                });

                res.status(200).json({
                    token: accessToken
                });
            }else{
                res.status(401).json({
                    message: 'Invalid Facebook token'
                });
            }
        }catch(error){
            if(error.response && error.response.status && error.response.data.error){
                res.status(error.response.status).send(error.response.data.error);
            }else{
                res.status(500).json({
                    message: 'It was not possible to validate the Facebook token'
                });
            }
        }
    }

    static verify(req, res){
        let jwtToken = req.get('jwtToken');
        if(!jwtToken){
            res.status(400).json({
                message: 'JWT is required'
            });
        }else{
            try {
                var decoded = jsonWebToken.verify(jwtToken, jwtSecret);
                res.status(200).json(decoded);
            } catch(err) {
                res.status(401).send();
            }
        }
    }
}

module.exports = LoginController;
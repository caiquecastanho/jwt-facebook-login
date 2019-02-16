const axios = require('axios');
var jsonWebToken = require('jsonwebtoken');

class LoginController{
    // Verifys the facebook token
    static async login(req, res){
        //TO DO: include the jwtSecret in env variable
        var jwtSecret = 'mysecretkey';

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
                    //Set the expiration
                    expiresIn: 86400 //we are setting the expiration time of 1 day.
                });

                res.status(200).send(accessToken);
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
}

module.exports = LoginController;
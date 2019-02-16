# jwt-facebook-login

Provides authentication layer for REST APIs through Facebook

## How does it works ?
1. Login to Facebook and acquire a valid user access token
2. Make a request to "/login" passing the previous acces token and receive a json web token
3. In your REST API, get the token from all over requests and verify it through a request on "/verify", if the token is valid the authenticated user's information will be returned
   
## Usage
```
docker build -t jwt-login:1.0.0 .
```
```
docker run -p 3000:3000 jwt-login:1.0.0
```
Go to http://localhost:3000/api-docs
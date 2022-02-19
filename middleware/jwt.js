const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('../config/config.json');// get our config file
var atob = require('atob');

//Verify jwt token
function verifyToken(token) {

  // check header or url parameters or post parameters for token
  if (!token)
    return false;

  var verifyOptions = {
    issuer: config.jwt.issuer,
    subject: config.jwt.subject,
    audience: config.jwt.audience,
    expiresIn: config.jwt.expiresIn
  };

  // verifies secret and checks exp
  try {
    var legit = jwt.verify(token, config.jwt.publicKey ,verifyOptions);
    return true;
  } catch (err) {
    return false;
  }
}

//generate jwt token
function generateToken(paramData) {

  var signOptions = {
    issuer: config.jwt.issuer,
    subject: config.jwt.subject,
    audience: config.jwt.audience,
    expiresIn: config.jwt.expiresIn
  };

  return jwt.sign({ id: paramData.id }, config.jwt.publicKey, signOptions);
}
//generate jwt token
function generateTokenData(paramData) {

  var signOptions = {
    issuer: config.jwt.issuer,
    subject: config.jwt.subject,
    audience: config.jwt.audience,
    expiresIn: config.jwt.expiresIn
  };

  return jwt.sign(paramData, config.jwt.publicKey, signOptions);
}
//generate refresh token
function generaterefreshToken(paramData) {

  var signOptions = {
    issuer: config.jwt.issuer,
    subject: config.jwt.subject,
    audience: config.jwt.audience,
    expiresIn: config.jwt.expiresIn
  };
  return jwt.sign({ id: paramData.id }, config.jwt.publicKey, signOptions);
}

//decode jwt token 
function decodeJwtToken(token) {
  if (!token)
    return false;

  try {
    const tokenParts = token.split('.');
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    const user = JSON.parse(rawPayload);
    return user;
  } catch (err) {
    return false;
  }
}


module.exports = {
  verifyToken,
  generateToken,
  generateTokenData,
  decodeJwtToken,
  generaterefreshToken
};


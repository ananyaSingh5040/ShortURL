// Stateless authentication
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
function setUser(user)
{
    const payload={
        __id: user._id,
        email: user.email,
        role: user.role,
    };
    return jwt.sign(payload,process.env.JWT_SECRET_KEY);
    // user - payload
    // secret - private key used to sign the token (The stamp)
}
function getUser(token)
{
    if(!token) return null;
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
    // verifying ke gaadi uski ki nai.
}
module.exports = {getUser, setUser};
 
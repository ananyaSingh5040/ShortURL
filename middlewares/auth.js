const { getUser } = require("../service/auth");
require("dotenv").config();
const jwt = require("jsonwebtoken");

function checkForAuthentication(req, res, next) {
  // If user does not exist, call next function
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();
  const user = getUser(tokenCookie);
  req.user = user;
  return next();
}
// roles =[]
function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role)) return res.end("UnAuthorized");
    return next();
  };
}

function smartAuth(req, res, next) {
  const hasAuthHeader = req.headers["authorization"]?.startsWith("Bearer ");
  const hasCookie = req.cookies?.token;

  if (hasAuthHeader) {
    // BOT access
    const botToken = req.headers["authorization"].split("Bearer ")[1];
    
    try {
      const user = jwt.verify(botToken, process.env.BOT_SECRET_KEY);
      req.user = user;
    } catch (err) {
      return res.status(401).json({ error: "Invalid bot token" });
    }
    return next();
  }

  if (hasCookie) {
    // USER access
    const token = req.cookies.token;
    try {
      const user = getUser(token);
      req.user = user;
    } catch (err) {
      req.user = null;
    }
  } else {
    req.user = null;
  }

  return next();
}

module.exports = { checkForAuthentication, restrictTo, smartAuth };

const express = require("express");
const URL = require("./models/url");
const { restrictTo } = require("./middlewares/auth");
const router = express.Router();

router.get("/admin/urls", restrictTo(['ADMIN']), async (req, res) => {
  
  const allUrls = await URL.find({});
  const creator= await URL.find({createdBy: req.user.name});
  return res.render("home", { urls: allUrls ,creator: creator });
});

// Inline Middleware karke call maara hai
router.get("/", restrictTo(['NORMAL','ADMIN']), async (req, res) => {
  
  const allUrls = await URL.find({createdBy: req.user._id});
  return res.render("home", { urls: allUrls });
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;

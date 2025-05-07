const express = require("express");
const{handleShortURL, handleAnalytics} = require("../controllers/url");
const{smartAuth} = require("../middlewares/auth");
const router = express.Router();
router.post("/",smartAuth,handleShortURL);
router.get("/analytics/:shortId",handleAnalytics);
module.exports= router;
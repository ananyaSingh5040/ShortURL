const express = require("express");
const{handleShortURL, handleRedirect} = require("../controllers/url");
const router = express.Router();
router.post("/",handleShortURL);
router.get("/:shortId",handleRedirect);
module.exports= router;
const express = require("express");
const{handleShortURL} = require("../controllers/url");
const router = express.Router();
router.post("/",handleShortURL);
module.exports= router;
const { nanoid } = require("nanoid");
const URL = require("../models/url");
// const moment = require("moment")

async function handleShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required!" });
  const shortID = nanoid(5);
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory:[],
    createdBy: req.user._id,
  }); 
  if (req.headers['user-agent'] && req.headers['user-agent'].includes('Discordbot')) {
    return res.json({ shortUrl: `http://localhost:8001/${shortID}` });
  } else {
    return res.render('home', { id: shortID });
  }
}
async function handleAnalytics(req, res) {
  const shortID = req.params.shortId;
  const result = await URL.findOne({ shortId: shortID });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
module.exports = { handleShortURL, handleAnalytics };

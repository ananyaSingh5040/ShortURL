const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required!" });
  const shortID = nanoid(8);
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
  });
  return res.json({ id: shortID });
}
async function handleRedirect(req, res) {
  const shortID = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId: shortID,
    },
    {
        // for logging the time.
      $push: {
        visitHistory: {
          timestamps: Date.now(),
        },
      },
    }
  );
  if (!entry) {
    return res.status(404).send("Short URL not found");
  }
  res.redirect(entry.redirectUrl);
}
module.exports = { handleShortURL, handleRedirect };

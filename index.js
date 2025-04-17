const express = require("express");
const router = require("./routes/url.js");
const staticRoute = require("./staticRouter.js");
const path = require("path");
const URL = require("./models/url.js");
const { connectDb } = require("./connect.js");
const app = express();
const PORT = 8001;
//Connection:
connectDb("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDB connected!")
);

// Templating Engine:
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Middleware:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes:
app.use("/url", router);
app.use("/", staticRoute);
app.get("/:shortId", async (req, res) => {
  const shortID = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId: shortID,
    },
    {
      $push: {
        // for logging the time.
        visitHistory: {
          timestamps: new Date(),
        },
      },
    }
  );
  if (!entry) {
    return res.status(404).send("Short URL not found");
  }
  res.redirect(entry.redirectUrl);
});

// app.listen(()=>console.log(`Server running on port: ${PORT}`));
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port: 8001");
});

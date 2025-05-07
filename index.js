const express = require("express");
const router = require("./routes/url.js");
const staticRoute = require("./staticRouter.js");
const userRoute = require("./routes/user.js");
const path = require("path");
const cookieParser = require("cookie-parser");
const URL = require("./models/url.js");
const { connectDb } = require("./connect.js");
const {checkForAuthentication,restrictTo,smartAuth} = require("./middlewares/auth.js");
const app = express();
const PORT = 8001;
const dotenv= require("dotenv");
dotenv.config();
//Connection:
connectDb(process.env.MONGO_URI).then(() =>
  console.log("MongoDB connected!")
);

// Templating Engine:
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Middleware:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); //used to parse cookies.
app.use(checkForAuthentication);

app.use("/", staticRoute);
app.use("/url", router);
app.use("/user", userRoute);

// LOGIC FOR REDIRECTION:
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

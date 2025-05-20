const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");
const User = require("../models/user");
async function handleUserSignUp(req, res) {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).send("User already exists");
  }
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.render("home");
}
async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  const token = setUser(user);
  res.cookie("token", token);
  return res.redirect("/");
}
module.exports = { handleUserSignUp, handleUserLogin };

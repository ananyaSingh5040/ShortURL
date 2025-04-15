const express = require("express");
const router = require("./routes/url.js");
const {connectDb} = require("./connect.js");
const app = express();
const PORT= 8001;
//Connection:
connectDb('mongodb://127.0.0.1:27017/short-url').then(()=> console.log("MongoDB connected!"));

//Middleware:
app.use(express.json());
//Routes:
app.use('/url',router);
  
// app.listen(()=>console.log(`Server running on port: ${PORT}`));
app.listen(PORT, '0.0.0.0', () => {
    console.log("Server running on port: 8001");
  });
  
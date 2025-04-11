const express = require("express");
const userRoute = require("./routes/user");
const { connectToMongoDB } = require("./connect");
require('dotenv').config();
const { restrictToLoggedinUserOnly , restrictToLoggedinUserOnlyMiddleWare} = require("./middlewares/auth");
const staticRouter = require("./routes/static");


const app = express();
const port = process.env.port || 7000;
const db = process.env.db;


connectToMongoDB(db).then(() =>
    console.log("Mongodb connected")
  );
  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/checkauth", restrictToLoggedinUserOnly);

app.use("/user", userRoute);
app.use("/",restrictToLoggedinUserOnlyMiddleWare, staticRouter)

app.listen(port,'0.0.0.0',() => console.log(`Server Started on PORT:${port}`));
 

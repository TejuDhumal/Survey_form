const express = require("express");
const usersRouter=require("./routes/users");
const bodyParser=require('body-parser');
 const dotenv = require("dotenv").config();
const mongoose=require("mongoose");
// mongoose.set('strictQuery', false);
const app = express();
var cors = require('cors');

app.use(bodyParser.json());
app.use(express.json())
app.use("/usersRouter/", usersRouter);

 

app.get("/", (req,res) => {
    res.send("get is working ok")
});

mongoose.connect(process.env.DB_CONNECTION_URL,() => {
    console.log("connect")
})

app.listen(process.env.PORT, (error)=> {
    if(error)
        console.log(error)
    console.log("server is running");

});

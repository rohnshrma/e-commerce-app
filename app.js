const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const dotenv = require("bcrypt")

const authRoutes = require("./routes/authRoutes")


mongoose.connect("mongodb://localhost:27017/e-commerceDB")
.then(()=>{
    console.log("Connected to DB");
    app.listen(PORT,()=>{
        console.log("Server started on port " , PORT);
    })
})
.catch((err)=>{
console.log("Error while connecting to DB =>", err);
})


// middlewares 
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine","ejs")



app.use(authRoutes)